import { createRouter, createWebHistory } from 'vue-router';
import MyHome from '../views/MyHome.vue';


// Define your routes with the correct type
// const routes = [
//     { path: '/', component: MyHome },
//     { path: '/login', component: LoginPage },
// ];

// Create the router instance
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: MyHome
        },

    ]
});

export default router;
