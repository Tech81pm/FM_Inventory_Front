<template>
<!--MODALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL-->
<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="editModalLabel">Edit asset</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form @submit.prevent="editAsset(assetId)">
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

<!--ENDD MODALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL-->
</template>
<script>
import { toast } from 'vue3-toastify';
export default{
    props:{
      assetId:{
        required: true
      }      
    },
    data(){
        return{
            base_url:process.env.VUE_APP_BASE_URL,
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
            }
        }
    },
    watch:{
        assetId(newAssetId){
            if(newAssetId){
                this.fetchAssetbyID(newAssetId);
            }
        }
    },
    methods: {
        async editAsset(id){
            try{
                console.log(this.newAssets);
                const response = await toast.promise(
                    fetch(`${this.base_url}/assets/update/${id}`,{
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.newAssets),
                        credentials:'include'
                    }),{
                        pending: 'wait lang',
                        error: 'Error'
                    }
                );
                if(!response.ok){
                    const errorData = await response.json();
                    throw new Error(errorData.message)
                }
                await response.json();
                toast.success('Changes saved', {
                    autoClose:2000
                })
                this.closeModal();

            }catch(error){
                console.error('Error adding asset')
                toast.error('Error: ' + error.message,{
                    autoClose:2000
                })
            }finally{
                setTimeout(() => {
                    toast.clearAll();
                }, 3000)
                
            }
        },
        async fetchAssetbyID(id){
            fetch(`${this.base_url}/assets/${id}`,{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            })
            .then(response =>{
                if(!response.ok){
                    throw new Error('Network response was not ok ')
                }
                return response.json();    
            })
            .then(data => {
                console.log(data)
                this.newAssets ={
                    asset_name: data.asset_name,
                    category: data.category,
                    brand: data.brand,
                    specs: data.specs,
                    quantity: data.quantity,
                    location: data.location,
                    company: data.company,
                    purchase_date: data.purchase_date,
                    supplier: data.supplier,
                    price: data.price,
                    status: data.status
                }
            }).catch(error =>{
                console.error('Error fetching assets: ', error)
            })
        },
        closeModal() {
        this.$emit('close');
        }
    },  
}
</script>

<style scoped>


</style>