import {ElMessage} from "element-plus";
import {createRouter, createWebHistory} from 'vue-router'
import {useUserStore} from "../stores/userStore.js";
import Layout from '../views/layout/Layout.vue'
import Home from '../views/home/Home.vue'
import Person from '../views/person/Person.vue'
import Edit from '../views/edit/Edit.vue'
import Login from '../views/login/Login.vue'
import Admin from '../views/admin/Admin.vue'
import Register from '../views/register/Register.vue'
import UserHome from '../views/user/UserHome.vue'
import Account from '../views/account/Account.vue'
import DailyDetail from '../components/DailyDetail.vue'
import Forget from '../views/forget/Forget.vue'


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
          path: '/userHome',
          name: 'userHome',
          component: UserHome,
          meta: {
            isAuth: true
          }
        },
        {
          path: '/edit',
          name: 'edit',
          component: Edit,
          meta: {
            isAuth: true
          }
        },
        {
          path: '/login',
          name: 'login',
          component: Login
        },
        {
          path: '/account',
          name: 'account',
          component: Account,
          meta: {
            isAuth: true
          }
        },
        {
          path: '/admin',
          name: 'admin',
          component: Admin// todo 管理端
        },
        {
          path: '/detail/:id',
          name: 'detail',
          component: DailyDetail// todo 管理端
        },
        {
          path: '/register',
          name: 'register',
          component: Register
        },
        {
          path: '/forget',
          name: 'forget',
          component: Forget
        }
      ]
    },
  ],
  scrollBehavior() {
    return {
      top: 0
    }
  }
})


// 配置路由导航
router.beforeEach((to, from, next) => {
    // 判断资源是否要拦截
    if (to.matched.some(route => route.meta.isAuth)) {
      // 如果资源要拦截, 判断是否有token
      const token = useUserStore().token
      // 如果token存在, 直接放行
      if (token) {
        next()
      } else {
        // 没有token 跳转登录页
        ElMessage.warning("请先登录")
        next({
          path: "/login"
        })
      }
    } else {
      // 请求的资源不需要拦截 直接放行
      next()
    }

  }
)


export default router
