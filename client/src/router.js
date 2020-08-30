import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Register from './views/Register.vue'
import Notfound from './views/404.vue'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import MapHome from './views/MapHome.vue'

import ol_ClusterMap from './components/OpenLayers/ol_ClusterMap'
import ol_ClipMap from './components/OpenLayers/ol_ClipMap'
import ol_SuperClusterMap from './components/OpenLayers/ol_SuperClusterMap'
import ol_FeatureEdit from './components/OpenLayers/ol_FeatureEdit'

import Ags_Home from './views/ArcGIS/Ags_Home'
import Ags_BaseMap from './components/ArcGIS/Ags_BaseMap'
import Ags_DrawMap from './components/ArcGIS/Ags_DrawMap'

import mapboxGL_3Dbuilding from './components/MapBox/mapboxGL_3Dbuilding'
import mapboxGL_TDT3Dbuilding from './components/MapBox/mapboxGL_TDT3Dbuilding'
import mapboxGL_InitMap from './components/MapBox/mapboxGL_InitMap'
import mapboxGL_DrawMap from './components/MapBox/mapboxGL_DrawMap'
import mapboxGL_GridLayerSence from './components/MapBox/mapboxGL_GridLayerSence'
import mapboxGL_HexagonLayer from './components/MapBox/mapboxGL_HexagonLayer'

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
        {path: '', component: Home},
        {path: '/home', name:'home', component: Home},
        {path: '/map', name: 'map', component: MapHome},
        {path: '/ol_superclustermap', name: 'ol_superclustermap', component: ol_SuperClusterMap},
        {path: '/ol_clipmap', name: 'ol_clipmap', component: ol_ClipMap},
        {path: '/ol_clustermap', name: 'ol_clustermap', component: ol_ClusterMap},
        {path: '/ol_FeatureEdit', name: 'ol_FeatureEdit', component: ol_FeatureEdit},
        {path: '/arcgismap', name: 'arcgismap', component: Ags_Home},
        {path: '/ags_basemap', name: 'ags_basemap', component: Ags_BaseMap},
        {path: '/ags_drawmap', name: 'ags_drawmap', component: Ags_DrawMap},
        {path: '/mapboxgl_3dbuilding', name: 'mapboxgl_3dbuilding', component: mapboxGL_3Dbuilding},
        {path: '/mapboxgl_tdtbuilding', name: 'mapboxgl_tdtbuilding', component: mapboxGL_TDT3Dbuilding},
        {path: '/mapboxgl_initmap', name: 'mapboxgl_initmap', component: mapboxGL_InitMap},
        {path: '/mapboxgl_drawmap', name: 'mapboxgl_drawmap', component: mapboxGL_DrawMap},
        {path: '/mapboxgl_gridmap', name: 'mapboxgl_gridmap', component: mapboxGL_GridLayerSence},
        {path: '/mapboxgl_hexagonmap', name: 'mapboxgl_gridmap', component: mapboxGL_HexagonLayer}
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