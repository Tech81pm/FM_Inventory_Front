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
              
            />
            <button class="btn btn-primary" >Search</button>
          </div>
          <!-- Add Data Button -->
          <button class="btn btn-success" >Add Data</button>
        </div>
  
        <!-- Add Data Form Modal -->
       
  
        <!-- Table -->
        <table class="table table-striped table-hover table-bordered">
          <thead class="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Brand</th>
              <th scope="col">Specs</th>
              <th scope="col">Quantity</th>
              <th scope="col">Location</th>
              <th scope="col">Company</th>
              <th scope="col">Purchase date</th>
              <th scope="col">Supplier</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
              
            </tr>
          </thead>
          <tbody>
          
            <tr v-for="asset in assets" :key="asset.id">
              <td>{{asset.id}}</td>
              <td>{{asset.asset_name}}</td>
              <td>{{asset.category}}</td>
              <td>{{asset.brand}}</td>
              <td>{{asset.specs}}</td>
              <td>{{asset.quantity}}</td>
              <td>{{asset.location}}</td>
              <td>{{asset.company}}</td>
              <td>{{asset.purchase_date}}</td>
              <td>{{asset.supplier}}</td>
              <td>{{asset.price}}</td>
              <td>{{asset.status}}</td>
              <td>
                <button class="btn btn-primary btn-sm">Edit</button>
                <button class="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <!--BUTTON CONTAINER SA ILALIM-->
        <div>
          <button class="btn btn-primary">Prev</button>
          <button class="btn btn-primary">Next</button>
        </div>
        <!--END-->
      </div>
    </div>
  </template>
  
  <script setup>
  import MySidebar from "../components/base/MySidebar.vue";
  </script>
<script>
export default {
  data(){
    return{
      base_url:'http://192.168.100.216:3003',
      assets:[],
    };
  },
methods: {
  async fetchAssets(){
      fetch(`${this.base_url}/assets/`,{
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      })
      .then(response => {
        if(!response.ok){
          if(response.status === 401){
            console.log(response)
            throw new Error('Unauthorized')
          }else{
            throw new Error('Network response was not ok ' + response.status.text);
          }  
        }
        return response.json()
      }).then(data => {
        this.assets = data;
      }).catch(error => {
        console.error('Error fetching assets:', error)
      });
  }
},
mounted() {
  this.fetchAssets();
},
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
    font-size: small;
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
  