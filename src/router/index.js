import {
    createRouter,
    createWebHashHistory,
    createMemoryHistory
} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
        },
        {
            path: '/detail/:id',
            component: () =>import(/* webpackChunkName: "Detail" */ '../views/Detail.vue.vue')
        },
    ]
})


// router.beforeEach

export default router