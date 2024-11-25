<template>
    <div class="app">
      <MySidebar />
      <div class="content" style="padding: 2rem;">
        <div class="d-flex justify-content-between mb-3">
          <!-- Search Input and Button -->
          <div class="input-group w-50">
            <input 
              type="text" 
              class="form-control" 
              placeholder="Search..." 
              v-model="searchQuery"
            />
            <button class="btn btn-primary" @click="handleSearch">Search</button>
          </div>
          <!-- Add Data Button -->
          <button class="btn btn-success" @click="showAddForm">Add Data</button>
        </div>
  
        <!-- Add Data Form Modal -->
        <div v-if="isAddFormVisible" class="modal-overlay">
          <div class="modal-container">
            <h3>Add New Item</h3>
            <form @submit.prevent="addData">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input 
                  id="name" 
                  v-model="newData.name" 
                  type="text" 
                  class="form-control" 
                  placeholder="Item Name" 
                  required
                />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <input 
                  id="description" 
                  v-model="newData.description" 
                  type="text" 
                  class="form-control" 
                  placeholder="Item Description" 
                  required
                />
              </div>
              <div class="mb-3">
                <label for="location" class="form-label">Location</label>
                <input 
                  id="location" 
                  v-model="newData.location" 
                  type="text" 
                  class="form-control" 
                  placeholder="Location" 
                  required
                />
              </div>
              <div class="mb-3">
                <label for="itemPrice" class="form-label">Item Price</label>
                <input 
                  id="itemPrice" 
                  v-model="newData.itemPrice" 
                  type="text" 
                  class="form-control" 
                  placeholder="Item Price" 
                  required
                />
              </div>
              <div class="mb-3">
                <label for="quantity" class="form-label">Quantity</label>
                <input 
                  id="quantity" 
                  v-model="newData.quantity" 
                  type="number" 
                  class="form-control" 
                  placeholder="Quantity in Stock" 
                  required
                />
              </div>
              <div class="mb-3">
                <label for="status" class="form-label">Status</label>
                <select 
                  id="status" 
                  v-model="newData.status" 
                  class="form-control" 
                  required
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
              <button type="submit" class="btn btn-success">Add Item</button>
              <button class="btn btn-secondary" @click="closeAddForm">Cancel</button>
            </form>
          </div>
        </div>
  
        <!-- Table -->
        <table class="table table-striped table-hover table-bordered">
          <thead class="table-dark">
            <tr>
              <th scope="col">Inventory ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Location</th>
              <th scope="col">Item Price</th>
              <th scope="col">Quantity in stock</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <!-- Use paginatedData here -->
            <tr v-for="(item, index) in paginatedData" :key="index">
              <th scope="row">{{ (currentPage - 1) * rowsPerPage + index + 1 }}</th>
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.location }}</td>
              <td>{{ item.itemPrice }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.status }}</td>
              <td>
                <button class="btn btn-info btn-sm">Edit</button>
                <button class="btn btn-danger btn-sm" @click="deleteData(item.inventoryId)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
  
        <!-- Pagination Controls -->
        <nav>
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="goToPage(1)">First</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="goToPage(currentPage - 1)">Previous</button>
            </li>
            <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
              <button class="page-link" @click="goToPage(page)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="goToPage(currentPage + 1)">Next</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="goToPage(totalPages)">Last</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import MySidebar from "../components/base/MySidebar.vue";
  
  // Sample data with the correct fields
  const tableData = ref([
    { inventoryId: 1, name: 'Item 1', description: 'Description for Item 1', location: 'Warehouse A', itemPrice: '$10.00', quantity: 100, status: 'In Stock' },
    { inventoryId: 2, name: 'Item 2', description: 'Description for Item 2', location: 'Warehouse B', itemPrice: '$20.00', quantity: 50, status: 'In Stock' },
    { inventoryId: 3, name: 'Item 3', description: 'Description for Item 3', location: 'Warehouse A', itemPrice: '$30.00', quantity: 30, status: 'Out of Stock' },
    { inventoryId: 4, name: 'Item 4', description: 'Description for Item 4', location: 'Warehouse C', itemPrice: '$15.00', quantity: 200, status: 'In Stock' },
    { inventoryId: 4, name: 'Item 4', description: 'Description for Item 4', location: 'Warehouse C', itemPrice: '$15.00', quantity: 200, status: 'In Stock' },
    { inventoryId: 4, name: 'Item 4', description: 'Description for Item 4', location: 'Warehouse C', itemPrice: '$15.00', quantity: 200, status: 'In Stock' },
    { inventoryId: 4, name: 'Item 4', description: 'Description for Item 4', location: 'Warehouse C', itemPrice: '$15.00', quantity: 200, status: 'In Stock' },
    { inventoryId: 4, name: 'Item 4', description: 'Description for Item 4', location: 'Warehouse C', itemPrice: '$15.00', quantity: 200, status: 'In Stock' },
    { inventoryId: 4, name: 'Item 4', description: 'Description for Item 4', location: 'Warehouse C', itemPrice: '$15.00', quantity: 200, status: 'In Stock' },
    { inventoryId: 4, name: 'Item 4', description: 'Description for Item 4', location: 'Warehouse C', itemPrice: '$15.00', quantity: 200, status: 'In Stock' },
    { inventoryId: 4, name: 'Item 4', description: 'Description for Item 4', location: 'Warehouse C', itemPrice: '$15.00', quantity: 200, status: 'In Stock' },
    // More data entries...
  ]);
  
  const searchQuery = ref('');
  const currentPage = ref(1);
  const rowsPerPage = 5;
  
  // Computed property to filter data based on the search query
  const filteredData = computed(() => {
    return tableData.value.filter(item => 
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.itemPrice.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  
  // Total pages based on the filtered data
  const totalPages = computed(() => {
    return Math.ceil(filteredData.value.length / rowsPerPage);
  });
  
  // Paginated data for the current page
  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredData.value.slice(start, end);
  });
  
  function goToPage(page) {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
  }
  
  function handleSearch() {
    currentPage.value = 1; // Reset to the first page when searching
  }
  
  // Add functionality to handle the "Add Data" button and form
  const isAddFormVisible = ref(false);
  const newData = ref({
    inventoryId: null,
    name: '',
    description: '',
    location: '',
    itemPrice: '',
    quantity: 0,
    status: 'In Stock',
  });
  
  function showAddForm() {
    isAddFormVisible.value = true;
  }
  
  function closeAddForm() {
    isAddFormVisible.value = false;
    resetNewData();
  }
  
  function resetNewData() {
    newData.value = { inventoryId: null, name: '', description: '', location: '', itemPrice: '', quantity: 0, status: 'In Stock' };
  }
  
  function addData() {
    if (newData.value.name && newData.value.itemPrice) {
      newData.value.inventoryId = tableData.value.length + 1;
      tableData.value.push({ ...newData.value });
      closeAddForm();
    } else {
      alert('Please fill out all required fields');
    }
  }
  
  function deleteData(inventoryId) {
    tableData.value = tableData.value.filter(item => item.inventoryId !== inventoryId);
  }
  </script>
  
  <style scoped>
  /* Modal Overlay */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050;
  }
  
  /* Modal Container */
  .modal-container {
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
    z-index: 1060;
  }
  
  /* Modal Styling */
  .modal-container h3 {
    margin-bottom: 1rem;
  }
  
  .modal-container button {
    margin-top: 1rem;
  }
  
  /* Table Layout */
  .table {
    width: 100%;
    margin-bottom: 1rem;
  }
  
  .table-bordered th, .table-bordered td {
    border: 1px solid #dee2e6;
  }
  
  .table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  .table-hover tbody tr:hover {
    background-color: rgba(0, 0, 0, 0.075);
  }
  
  /* Pagination style */
  .pagination .page-item .page-link {
    cursor: pointer;
  }
  </style>
  