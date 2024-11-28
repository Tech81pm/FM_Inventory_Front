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
    }
}
</script>

<style scoped>


</style>