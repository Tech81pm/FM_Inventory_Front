<template> 
    <!--Quantity MODAL-->
    <div class="modal fade" id="quantityModal" tabindex="-1" aria-labelledby="quantityModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="quantityModalLabel">Add Stock</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form @submit.prevent="addStocks()">
            <div class="modal-body">
              <div class="col">
                <label for="quantity" class="form-label">Quantity</label>
                <input
                  type="number"
                  class="form-control"
                  id="quantity"
                  v-model="stocks"
                  placeholder="Enter quantity"
                  min="1"
                  required
                />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Add stock/s</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <div class="modal fade" id="pullModal" tabindex="-1" aria-labelledby="pullModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="pullModalLabel">Pull-out</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form @submit.prevent="">
            <div class="modal-body">
              <div class="col">
                <label for="status" class="form-label">Status</label>
                <select
                class="form-select"
                v-model="status"
                :placeholder="newAssets"
                >
                <option value="For delivery">For delivery</option>
                <option value="Inspection">Inspection</option>
                <option value="Passed">Passed</option>
                <option value="In Stock">In Stock</option>
                    
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="clear()">Close</button>
              <button type="submit" class="btn btn-danger" data-bs-dismiss="modal">Set status</button>
            </div>
          </form>
        </div>
      </div>
    </div>
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
                status: '',
                base_url:process.env.VUE_APP_BASE_URL,
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
                    status:''
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
           addStocks(){
            this.newAssets.quantity += this.stocks;
            console.log(this.newAssets.quantity);
            this.editAsset(this.assetId)
            this.clear();
          },
          clear(){
            this.stocks = null;
          },
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
                    this.closeModal()
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
                fetch(`${this.base_url}/purchases/${id}`,{
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
                        purchase_date: this.$moment(data.purchase_date).tz('Asia/Manila').format('YYYY-MM-DD'),
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