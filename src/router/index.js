import { createRouter, createWebHistory } from 'vue-router'
import MyHome from '../views/MyHome.vue'

const router = createRouter ({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: MyHome
        },
        {
            path: '/login',
            component: () => import('../views/LoginPage.vue')
        },
        {
            path: '/register',
            component: () => import('../views/MyRegister.vue')
        },
        {
            path: '/assets',
            component: () => import('../views/MyAssets.vue')
        },
        {
            path: '/purchase',
            component: () => import('../views/MyPurchase.vue')
        },
        {
            path: '/reports',
            component: () => import('../views/MyReports.vue')
        },

    ]
})
export default router