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
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">Add asset</button>
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
    

    <!-- Modal -->
    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="addModalLabel">Add Asset</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form @submit.prevent="addAsset">
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4 mb-3">
              <label for="assetName" class="form-label">Asset Name</label>
              <input
                type="text"
                class="form-control"
                id="assetName"
                v-model="newAssets.asset_name"
                placeholder="Enter asset name"
                required
              />
            </div>
            <div class="col-md-4 mb-3">
              <label for="category" class="form-label">Category</label>
              <input
                type="text"
                class="form-control"
                id="category"
                v-model="newAssets.category"
                placeholder="Enter category"
                required
              />
            </div>
            <div class="col-md-4 mb-3">
              <label for="brand" class="form-label">Brand</label>
              <input
                type="text"
                class="form-control"
                id="brand"
                v-model="newAssets.brand"
                placeholder="Enter brand"
                required
              />
            </div>
            <div class="col-md-4 mb-3">
              <label for="specs" class="form-label">Specifications</label>
              <input
                type="text"
                class="form-control"
                id="specs"
                v-model="newAssets.specs"
                placeholder="Enter specifications"
                required
              />
            </div>
            <div class="col-md-4 mb-3">
              <label for="location" class="form-label">Location</label>
              <input
                type="text"
                class="form-control"
                id="location"
                v-model="newAssets.location"
                placeholder="Enter location"
                required
              />
            </div>
            <div class="col-md-4 mb-3">
              <label for="company" class="form-label">Company</label>
              <input
                type="text"
                class="form-control"
                id="company"
                v-model="newAssets.company"
                placeholder="Enter company"
                required
              />
            </div>
            <div class="col-md-2 mb-3">
              <label for="purchaseDate" class="form-label">Purchase Date</label>
              <input
                type="date"
                class="form-control"
                id="purchaseDate"
                v-model="newAssets.purchase_date"
                required
              />
            </div>
            <div class="col-md-3 mb-3">
              <label for="supplier" class="form-label">Supplier</label>
              <input
                type="text"
                class="form-control"
                id="supplier"
                v-model="newAssets.supplier"
                placeholder="Enter supplier name"
                required
              />
            </div>
            <div class="col-md-3 mb-3">
              <label for="price" class="form-label">Price</label>
              <input
                type="number"
                class="form-control"
                id="price"
                v-model="newAssets.price"
                placeholder="Enter price"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div class="col-md-3 mb-3">
              <label for="status" class="form-label">Status</label>
              <select
                class="form-select"
                id="status"
                v-model="newAssets.status"
                required
              >
                <option value="In stock">In stock</option>
                <option value="Out of stock">Out of stock</option>
              </select>
            </div>
            <div class="col-md-1 mb-3">
              <label for="quantity" class="form-label">Quantity</label>
              <input
                type="number"
                class="form-control"
                id="quantity"
                v-model="newAssets.quantity"
                placeholder="Enter quantity"
                min="1"
                required
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Save changes</button>
        </div>
      </form>
    </div>
  </div>
</div>



  </template>
  
  <script setup>
  import MySidebar from "../components/base/MySidebar.vue";
  </script>
<script>
import { toast } from 'vue3-toastify';
export default {
  data(){
    return{
      showModal: false,
      base_url:process.env.VUE_APP_BASE_URL,
      assets:[],
      newAssets:{
        asset_name:'',
        category:'',
        brand:'',
        specs:'',
        quantity:1,
        location:'',
        company:'',
        purchase_date:'',
        supplier:'',
        price: '',
        status:'In stock'
      },
    };
  },
methods: {
  clear(){
    this.newAssets ={
      asset_name:'',
        category:'',
        brand:'',
        specs:'',
        quantity:1,
        location:'',
        company:'',
        purchase_date:'',
        supplier:'',
        price:0,
        status:'In stock'
    }
  },
  async addAsset(){
    try{
      const response = await toast.promise(
        fetch(`${this.base_url}/assets/add`,{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.newAssets),
          credentials:'include'
        }),
        {
          pending: 'Adding asset/s...',
          error: 'Login failed',
        }
      );
      if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add asset');
      }
      await response.json();
      toast.success('Asset added succesfully',{
        autoClose:2000
      });
      this.fetchAssets()
      this.clear()
    }catch(error){
      console.error('Error adding asset')
      toast.error('Error adding asset' + error.message,{
        autoClose:2000
      });
    }
  },
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
  