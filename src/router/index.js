import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Main',
        component: () => import('../views/Main.vue'), //按需引入
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/Home')
            },
            {
                path: '/mall',
                name: 'mall',
                component: () => import('../views/Mall')
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('../views/User')
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router