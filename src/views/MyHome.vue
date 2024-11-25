<template>
   <div class="app">
     <MySidebar />
     <div class="content" style="padding: 2rem;">
       <div class="container-fluid">
         <div class="row">
           <!-- Dashboard Cards -->
           <div class="col-md-3">
             <div class="card shadow-sm">
               <div class="card-body">
                 <h5 class="card-title">Total Users</h5>
                 <p class="card-text">{{ totalUsers }}</p>
               </div>
             </div>
           </div>
 
           <div class="col-md-3">
             <div class="card shadow-sm">
               <div class="card-body">
                 <h5 class="card-title">Total Sales</h5>
                 <p class="card-text">{{ totalSales }}</p>
               </div>
             </div>
           </div>
 
           <div class="col-md-3">
             <div class="card shadow-sm">
               <div class="card-body">
                 <h5 class="card-title">Total Revenue</h5>
                 <p class="card-text">{{ totalRevenue }}</p>
               </div>
             </div>
           </div>
 
           <div class="col-md-3">
             <div class="card shadow-sm">
               <div class="card-body">
                 <h5 class="card-title">Active Products</h5>
                 <p class="card-text">{{ activeProducts }}</p>
               </div>
             </div>
           </div>
         </div>
 
         <!-- Recent Activity Section -->
         <div class="row mt-4">
           <div class="col-md-12">
             <div class="card shadow-sm">
               <div class="card-header">
                 <h5>Recent Activity</h5>
               </div>
               <div class="card-body">
                 <ul class="list-group">
                   <li class="list-group-item">User John Doe registered</li>
                   <li class="list-group-item">Product XYZ sold</li>
                   <li class="list-group-item">Revenue from Sales: $500</li>
                   <li class="list-group-item">New order placed by Customer A</li>
                 </ul>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 </template>
 
 <script setup>
 import MySidebar from "../components/base/MySidebar.vue";
 
 // Sample data for dashboard summary
 const totalUsers = 1500;
 const totalSales = 320;
 const totalRevenue = '$45,000';
 const activeProducts = 200;
 </script>
 
 <style scoped>
 .card {
   border-radius: 10px;
 }
 
 .card-body {
   padding: 1.5rem;
 }
 
 .card-title {
   font-size: 1.2rem;
   font-weight: bold;
 }
 
 .card-text {
   font-size: 1.5rem;
 }
 
 .card-header {
   background-color: #f8f9fa;
 }
 
 .list-group-item {
   padding: 1rem;
 }
 </style>
 