import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/layout/Layout.vue'
import Home from '../views/home/Home.vue'
import Person from '../views/person/Person.vue'
import Edit from '../views/edit/Edit.vue'
import Login from '../views/login/Login.vue'
import Admin from '../views/admin/Admin.vue'
import Register from '../views/register/Register.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: '/person/:id',
          name: 'person',
          component: Person
        },
        {
          path: '/edit',
          name: 'edit',
          component: Edit
        },
        {
          path: '/login',
          name: 'login',
          component: Login
        },
        {
          path: '/admin',
          name: 'admin',
          component: Admin
        },
        {
          path: '/register',
          name: 'register',
          component: Register
        }
      ]
    },
  ]
})



export default router
