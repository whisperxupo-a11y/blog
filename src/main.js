import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/styles/main.css'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./views/HomePage.vue')
  },
  {
    path: '/posts/:slug',
    name: 'post',
    component: () => import('./views/PostPage.vue')
  },
  {
    path: '/archive',
    name: 'archive',
    component: () => import('./views/ArchivePage.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./views/AboutPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
