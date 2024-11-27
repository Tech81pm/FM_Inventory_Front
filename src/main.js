import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/js/bootstrap.js';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'vue3-toastify/dist/index.css'; 

import toast from 'vue3-toastify'
const app = createApp(App);
app.use(router);
app.use(toast, {
    limit: 1 
});


app.mount('#app');
