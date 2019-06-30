<template>
  <div id="chartMap" ref="chartMap" style="width: 100%;height: 100%;"></div>
</template>

<script>
import * as esriLoader from 'esri-loader'
export default {
  components: {
  },
  data: () => ({
  }),
  created () {
    this.createMap()
  },
  methods: {
    createMap (init) {
      this.loading = false
      esriLoader.loadModules([
        'esri/Map',
        'esri/views/SceneView'
      ]).then(([Map, SceneView]) => {
        this.loading = true
        let map = new Map({
          basemap: 'hybrid',
          ground: 'world-elevation'
        })
        let view = new SceneView({
          map: map,
          container: 'chartMap',
          camera: {
            position: [7.654, 45.919, 9184],
            tilt: 80
          }
        })
        console.log(view)
      }).catch(err => {
        console.log('err', err)
      })
    }
  }
}
</script>

<style scoped>
</style>
