<template>

</template>
<script>
export default{
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
    methods: {
        async editAsset(id){
            try{
                const response = await toast.promise(
                    fetch(`${this.base_url}/assets/edit/:${id}`,{
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.newAssets),

                    })
                )
            }catch(error){
                
            }
        },
        async fetchAssetbyID(id){

        }
    },  
}
</script>

<style scoped>


</style>