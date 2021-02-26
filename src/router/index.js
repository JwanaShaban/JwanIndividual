import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

import Graph from '../views/Graph.vue'
import Login from '../views/Login.vue'
import Contact from '../views/Contact.vue'
import Register from '../views/Register.vue'
import Forgot from '../views/Forgot.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },


  {
    path: '/graph',
    name: 'graph',
    component: Graph
  },

  {
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },

  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: Forgot
  },
  
  {
    path:'/:catchAll(.*)',
    redirect:'/',
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
