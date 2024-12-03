<template> 
    <!--Quantity MODAL-->
    <div class="modal fade" id="quantityModal" tabindex="-1" aria-labelledby="quantityModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="quantityModalLabel">Add Stock</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form @submit.prevent="addStocks(selectedId)">
            <div class="modal-body">
              <div class="col">
                <label for="quantity" class="form-label">Quantity</label>
                <input
                  type="number"
                  class="form-control"
                  id="quantity"
                  v-model="purchase.quantity"
                  min="1"
                  required
                  disabled
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
    
    <div class="modal fade" id="statusModal" tabindex="-1" aria-labelledby="statusModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="statusModalLabel">Set status</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form @submit.prevent="setStatus(this.selectedId,this.status)">
            <div class="modal-body">
              <div class="col">
                <label for="status" class="form-label">Status</label>
                <select
                class="form-select"
                v-model="status"
                
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
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Set status</button>
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
          selectedId:{
            required: true
          }      
        },
        data(){
            return{
                status: '',
                quantity: null,
                assetId: null,
                purchase :{
                    asset_id : this.assetId,
                    quantity : this.quantity,
                },
                base_url:process.env.VUE_APP_BASE_URL,
                
            }
        },
        watch:{
            selectedId(newSelectedId){
                if(newSelectedId){
                    this.fetchPurchaseById(newSelectedId);
                }
            }
        },
        methods: {
            async setStatus(id,status){
                const body = {status};
                try{
                    const response = await toast.promise(
                        fetch(`${this.base_url}/purchases/set-status/${id}`,{
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(body),
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
            async fetchPurchaseById(id){
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
                this.status = data.status;
                this.purchase.quantity = data.quantity;
                this.purchase.asset_id = data.asset_id;

            }).catch(error =>{
                console.error('Error fetching assets: ', error)
            })
        },
        async addStocks(id){
            try{
                const response = await toast.promise(
                    fetch(`${this.base_url}/purchases/add-quantity/${id}`,{
                        method: 'PUT',
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        credentials : 'include',
                        body: JSON.stringify(this.purchase)
                    }),{
                        peding: 'Adding stocks...',
                        error: 'Error'
                    }
                );
                if(!response.ok){
                    const errorData = await response.json();
                    throw new Error(errorData.message)
                }
                console.log(this.purchase)
                await response.json();
                toast.success('Stock/s added',{
                    autoClose:2000
                })
                this.closeModal()
            }catch(error){
                console.error('Error adding stocks');
                toast.error('Error: ' + error.message,{
                    autoClose:2000
                })
            }finally{
                setTimeout(() => {
                    toast.clearAll();
                }, 3000)
            }

        },
            debug(id){
                console.log(id);
            },  
            closeModal() {
            this.$emit('close');
            }
        },  
    }
    </script>
    
    <style scoped>
    
    
    </style>