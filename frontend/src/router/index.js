import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import MenuListView from '../views/MenuListView.vue'
import EntireChat from '../views/EntireChat.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/meals',
        name: 'meals',
        component: MenuListView
    },
    {
        path: '/chat',
        name: 'chat',
        component: EntireChat
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
