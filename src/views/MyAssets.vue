<template>
  <mian>
    <div class="app">
      <MySidebar />
      <div class="content" style="padding: 1rem;">
        <div class="button-container mb-1">
          <!-- Search Input and Button -->
           
            <form @submit.prevent="handleSearch">
            <div class="input-group">
              <input 
                type="text" 
                class="form-control" 
                placeholder="Search..." 
                v-model="searchParam"
              />
              <button class="btn btn-secondary" type="submit">Search</button>
            </div>
          </form>
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
              <td>{{$moment(asset.purchase_date).tz('Asia/Manila').format('YYYY-MM-DD')}}</td>
              <td>{{asset.supplier}}</td>
              <td>{{asset.price}}</td>
              <td>{{asset.status}}</td>
              <td>
                <div class="button-container">
                  <button class="btn btn-secondary btn-sm" @click="selectedAssetID = asset.id"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  >Edit</button>
                  <button class="btn btn-warning btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#pullModal"
                  @click="selectedAssetID = asset.id"
                  >Pull-out</button>
                  <button class="btn btn-success btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#quantityModal"
                  @click="selectedAssetID = asset.id"
                  >Add</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!--BUTTON CONTAINER SA ILALIM-->
        <div class="button-container">
          <button class="btn btn-secondary" @click="prevPage" :disabled="page===1">Prev</button>
          <button class="btn btn-secondary" @click="nextPage" :disabled="page===total || total === 0">Next</button>
          <!-- Add Data Button -->
          <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addModal">Add asset</button>
        </div>
        <!--END-->
      </div>
      <editModal
      :assetId="selectedAssetID"
      @close="handleSearch()"
      />
    </div>
    

    <!-- Modal -->
  <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="addModalLabel">ADD ASSET</h1>
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
              <select
                class="form-select"
                id="category"
                v-model="newAssets.category"
                placeholder="Enter category"
                required
              >
                <option value="" disabled selected>Select category</option>
                <option value="Furniture">Furnitures</option>
                <option value="Fixture">Fixtures</option>
                <option value="Appliance">Appliances</option>
                <option value="Tools">Tools</option>
              </select>
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
              <select
              class="form-select"
              id="company"
              v-model="newAssets.company"
              placeholder="Enter company"
              required
              >
              <option value="">Select company</option>
              <option value="81PM">81PM</option>
              <option value="OSI">OSI</option>
              <option value="MHI">MHI</option>
            </select>
          </div>
          <div class="col-md-4 mb-3">
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
          <div class="col-md-12 mb-3">
            <label for="specs" class="form-label">Specifications</label>
            <textarea
              type="text"
              class="form-control"
              id="specs"
              v-model="newAssets.specs"
              placeholder="Enter specifications"
              required
            ></textarea>
          </div>
            <div class="col-md-3 mb-3">
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
              <label for="quantity" class="form-label">Quantity</label>
              <input
              type="number"
              class="form-control"
              id="quantity"
              v-model="newAssets.quantity"
              placeholder=""
              min="1"
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
</mian>
</template>
  
  <script setup>

import MySidebar from "../components/base/MySidebar.vue";
  import editModal from "./assetsModals/editModal.vue";
  </script>
<script>
import { toast } from 'vue3-toastify';
export default {
  components:{editModal},
  data(){
    return{
      page:1,
      total:0,
      searchParam:'',
      selectedAssetID: null,
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
        purchase_date: this.$moment().tz('Asia/Manila').format('YYYY-MM-DD'),
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
        purchase_date:this.$moment().tz('Asia/Manila').format('YYYY-MM-DD'),
        supplier:'',
        price:0,
        status:'In stock'
    }
  },
  nextPage(){
    this.page++;
    this.handleSearch();
  },
  prevPage(){
    this.page--;
    this.handleSearch();
  },
  handleSearch(){
    this.searchParam.trim() === '' ? this.fetchAssets() : this.search(this.searchParam.trim());
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
      this.handleSearch()
      this.clear()
    }catch(error){
      console.error('Error adding asset')
      toast.error('Error adding asset' + error.message,{
        autoClose:2000
      });
    }finally{
      setTimeout(() => {
        toast.clearAll();
      }, 5000);
    }
  },

  async search(){
    fetch(`${this.base_url}/assets/search?page=${this.page}&searchTerm=${this.searchParam}`,{
      method: 'GET',
      headers: {'Content-Type' : 'application/json'},
      credentials:'include'
    }).then(response => {
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
      this.assets = data.data;
      this.total = data.pagination.totalPages
    }).catch(error =>{
      console.error('Error fetching assets', error)
    })
  },//-----------------------------------------------
  async fetchAssets(){
      fetch(`${this.base_url}/assets/?page=${this.page}`,{
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
        this.assets = data.data;
        this.total = data.pagination.totalPages
      }).catch(error => {
        toast.error('Login muna',{autoClose: false, position: toast.POSITION.TOP_CENTER,
        style: {
        position: 'fixed',
        top: '50%',  // 50% from the top
        left: '50%', // 50% from the left
        transform: 'translate(-50%, -50%)', // Center it exactly
      },

        })
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
/* Modal content styling */
.modal-content {
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  border: none;
  background-color: #fff;
}

/* Modal Header Styling */
.modal-header {
  background-color: var(--dark);
  color: var(--light);
  padding: 20px;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.btn-close {
  background-color: transparent;
  border: none;
  font-size: 1.2rem;
  color: #fff;
}

/* Modal Body Styling */
.modal-body {
  padding: 30px;
  background-color: var(--light);
  border-radius: 12px;
}

/* Form Elements Styling */
.form-control, .form-select, textarea {
  border-radius: 8px;
  border: 1px solid #ced4da;
  box-shadow: none;
  transition: all 0.3s ease;
}

.form-control:focus, .form-select:focus, textarea:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

textarea.form-control {
  resize: vertical;
}

/* Row and Column Layout */
.row.g-3 {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}


label.form-label {
  font-size: 1rem;
  font-weight: 500;
  color: #495057;
  margin-bottom: 10px;
}

/* Modal Footer Styling */
.modal-footer {
  background-color: var(--light);;
  border-top: 2px solid var(--dark-alt);
  text-align: right;
}

.btn-primary {
  background-color: var(--primary);;
  border-color: var(--primary);
}

.btn-primary:hover {
  border-color: var(--light);
}

.btn-secondary {
  background-color: var(--light);
  border-color: var(--dark);
  color: var(--primary);
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}

/* Responsive Design for Small Screens */
@media (max-width: 768px) {
  .col-md-4, .col-md-3, .col-md-12 {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
  
  /* Table Layout */
  
  .table {
    width: 100%;
    margin-bottom: 1rem;
    font-size: .7rem;
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
  .button-container {
  display: flex;
  justify-content: flex-end; 
  gap: 10px; 

}
</style>
  