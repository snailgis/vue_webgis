<template>
    <div id="viewDiv" style="width: 100%;height: 100%;"></div>
</template>

<script>
import { arcgisConfig } from '../../config/mapConfig'
import * as esriLoader from 'esri-loader'
export default {
  name: 'basemap',
  data () {
    return {
      map: null,
      view: null
    }
  },
  mounted () {
    this.createMap()
  },
  methods: {
    arcgisConfig: arcgisConfig,
    createMap () {
      this.arcgisConfig()
      // 引入依赖
      esriLoader.loadModules([
        'esri/Map',
        'esri/views/MapView'
      ], {url: window.arcgis.config.baseUrl}).then(([EsriMap, MapView]) => {
        this.map = new EsriMap({
          basemap: 'streets'
        })
        this.view = new MapView({
          container: 'viewDiv',
          center: [121.27189573730267, 30.8419595372876],
          zoom: 3,
          map: this.map
        })
      })
    }
  }
}
</script>

<style scoped>
@import url('http://fp1.xys.gov.cn/arcgis_js_api/library/4.11/esri/css/main.css');
</style>
