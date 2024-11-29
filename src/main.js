import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/js/bootstrap.js';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import moment from 'moment';
import 'moment-timezone';
import 'vue3-toastify/dist/index.css'; 

const globalTimezone = 'Asia/Manila';
moment.tz.setDefault(globalTimezone);

import toast from 'vue3-toastify'
const app = createApp(App);
app.use(router);
app.use(toast, {
    limit: 1 
});
app.config.globalProperties.$moment = moment;

app.mount('#app');
