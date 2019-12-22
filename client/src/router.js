import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Register from './views/Register.vue'
import Notfound from './views/404.vue'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import MapHome from './views/MapHome.vue'

import Ol_ClusterMap from './components/OpenLayers/Ol_ClusterMap'
import ol_ClipMap from './components/OpenLayers/ol_ClipMap'
import ol_SuperClusterMap from './components/OpenLayers/ol_SuperClusterMap'

import ArcGIS_Home from './views/ArcGIS/ArcGIS_Home'
import Ags_BaseMap from './components/ArcGIS/Ags_BaseMap'
import Ags_DrawMap from './components/ArcGIS/Ags_DrawMap'

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
        {path: '/ol_superclustermap', name: 'ol_superclustermap', component: ol_SuperClusterMap},
        {path: '/ol_clipmap', name: 'ol_clipmap', component: ol_ClipMap},
        {path: '/ol_clustermap', name: 'ol_clustermap', component: Ol_ClusterMap},
        {path: '/arcgismap', name: 'arcgismap', component: ArcGIS_Home},
        {path: '/ags_basemap', name: 'ags_basemap', component: Ags_BaseMap},
        {path: '/ags_drawmap', name: 'ags_drawmap', component: Ags_DrawMap}
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