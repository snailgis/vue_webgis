import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Register from './views/Register.vue'
import Notfound from './views/404.vue'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import MapHome from './views/MapHome.vue'

import ArcGIS_Home from './views/ArcGIS/ArcGIS_Home'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [        
        {path:'', component: Home},
        {path:'/home', name:'home', component: Home},
        {path: '/map', name: 'map', component: MapHome},
        {path: '/arcgismap', name: 'arcgismap', component: ArcGIS_Home},
    ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '*',
      name: "/404",
      component: Notfound
    },
    {
      path:'/login',
      name: 'login',
      component: Login
    }
  ]
})

// 路由守卫
//路由守卫
router.beforeEach((to, from ,next) =>  {
  const islogin = localStorage.eletoken ? true : false
  if (to.path == "/login" || to.path == "/register"){
    next()
  } else {
    islogin ? next() : next("/login")
  }
})

export default router