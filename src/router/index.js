import { createRouter, createWebHistory } from 'vue-router'
import MyHome from '../views/MyHome.vue'

const router = createRouter ({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: MyHome
        },
    ]
})
export default router