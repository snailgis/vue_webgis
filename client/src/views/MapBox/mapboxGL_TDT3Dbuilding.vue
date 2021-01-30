<template>
  <div id="map">
  </div>
</template>
<script>
import mapBoxGl from 'mapbox-gl'
import mapSources from './modules/mapstyles'
import 'mapbox-gl/dist/mapbox-gl.css'

export default {
    data(){
        return {
            map: null,
        }
    },
	created(){
	
	},
	mounted() {
		this.init()
	},
	methods: {
		
		init() {
			// mapBoxGl.accessToken = 'pk.eyJ1IjoibWFwYm94bWF4IiwiYSI6ImNqbnY4MHM3azA2ZmkzdnBnMThvNzRoZ28ifQ.IffqPZGkhcdPjnZ2dmSO6w'
			// this.map = new mapBoxGl.Map({
			// 	container: 'map',
			// 	style: {
			// 		version: 8,
			// 		// "glyphs": "../../static/fonts/{fontstack}/{range}.pbf", // 本地化字体
			// 		glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
			// 		sources: {
			// 			source_tdtimg_tiles: mapSources.baseMapUrl.source_tdtimg_tiles,
			// 			source_tdtcia_tiles: mapSources.baseMapUrl.source_tdtcia_tiles,
			// 			source_tdtvec_tiles: mapSources.baseMapUrl.source_tdtvec_tiles,
			// 			source_tdtcva_tiles: mapSources.baseMapUrl.source_tdtcva_tiles,
			// 			source_tdtter_tiles: mapSources.baseMapUrl.source_tdtter_tiles,
			// 			source_tdtcta_tiles: mapSources.baseMapUrl.source_tdtcta_tiles
			// 		},
			// 		layers: [
			// 			mapSources.baseLayerConfig.tdtimg_tiles,
			// 			mapSources.baseLayerConfig.tdtcia_tiles,
			// 			mapSources.baseLayerConfig.tdtvec_tiles,
			// 			mapSources.baseLayerConfig.tdtcva_tiles,
			// 			mapSources.baseLayerConfig.tdtter_tiles,
			// 			mapSources.baseLayerConfig.tdtcta_tiles
			// 		]
			// 	},
			// 	center: [108.724823, 34.34343607],
			// 	zoom: 13,
			// 	minZoom: 5,
			// 	maxZoom: 17
			// 	// pitch: 40,
			// 	// bearing: 1
			// })

			mapBoxGl.accessToken = 'pk.eyJ1IjoibWFvcmV5IiwiYSI6ImNqNWhrenIwcDFvbXUyd3I2bTJxYzZ4em8ifQ.KHZIehQuWW9AsMaGtATdwA';
    
			this.map = new mapBoxGl.Map({
				style: 'http://124.115.170.134:8080/YouMapServer/rest/service/sxww/VectorTileServer/styles/default.json', // 陕西省天地图测试矢量切片
				center: [108.724823, 34.34343607],
				zoom: 16.5,
				minZoom: 9,
				maxZoom: 17,
				container: 'map',
				pitch: 60,
				bearing: 45
			});

			// map.addControl(new this.mbgl.GeolocateControl({ positionOptions: { enableHighAccuracy: true }, trackUserLocation: true }), 'top-left');
			this.map.addControl(new mapBoxGl.NavigationControl(), 'top-right')
            this.map.addControl(new mapBoxGl.ScaleControl({ maxWidth: 80, unit: 'metric' }), 'bottom-right')
            this.map.addControl(new mapBoxGl.FullscreenControl({ container: document.querySelector('map') }),'top-right')

			let size = 100
			let pulsingDot = {
                map: this.map,
				width: size,
				height: size,
				data: new Uint8Array(size * size * 4),
				onAdd: function() {
					var canvas = document.createElement('canvas')
					canvas.width = this.width
					canvas.height = this.height
					this.context = canvas.getContext('2d')
				},
				render: function() {
					var duration = 1000
					var t = (performance.now() % duration) / duration
					var radius = (size / 2) * 0.3
					var outerRadius = (size / 2) * 0.7 * t + radius
					var context = this.context
					context.clearRect(0, 0, this.width, this.height)
					context.beginPath()
					context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2)
					context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')'
					context.fill()
					context.beginPath()
					context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2)
					context.fillStyle = 'rgba(255, 100, 100, 1)'
					context.strokeStyle = 'white'
					context.lineWidth = 2 + 4 * (1 - t)
					context.fill()
					context.stroke()

                    this.data = context.getImageData(0, 0, this.width, this.height).data
					this.map.triggerRepaint()
					return true
				}
			}
		
		
		
			this.map.on('load', function() {
        		let map = this
				map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 1.4 })
				map.addSource('points', {
					type: 'geojson',
					data: {
						type: 'FeatureCollection',
						features: [
							{
								type: 'Feature',
								geometry: {
									type: 'Point',
									coordinates: [108.724823, 34.34343607]
								}
							}
						]
					}
				})
				map.addLayer({
					id: 'points',
					type: 'symbol',
					source: 'points',
					layout: {
						'icon-image': 'pulsing-dot'
					}
				})
			})
		},
		
		// changeBaseMap: function(value) {
		// 	var baselayers = ['tdtimg_tiles', 'tdtcia_tiles', 'tdtvec_tiles', 'tdtcva_tiles', 'tdtter_tiles', 'tdtcta_tiles']
		// 	for (var i in baselayers) {
		// 		var visibility = this.map.getLayoutProperty(baselayers[i], 'visibility')
		// 		if (visibility === 'visible') {
		// 			this.map.setLayoutProperty(baselayers[i], 'visibility', 'none')
		// 		}
		// 	}
            
		// 	switch (value) {
		// 		case 'img':
		// 			this.map.setLayoutProperty('tdtimg_tiles', 'visibility', 'visible')
		// 			this.map.setLayoutProperty('tdtcia_tiles', 'visibility', 'visible')
		// 			break
		// 		case 'vec':
		// 			this.map.setLayoutProperty('tdtvec_tiles', 'visibility', 'visible')
		// 			this.map.setLayoutProperty('tdtcva_tiles', 'visibility', 'visible')
        //             break
        //         case 'ter':
        //             this.map.setLayoutProperty('tdtter_tiles', 'visibility', 'visible')
        //             this.map.setLayoutProperty('tdtcta_tiles', 'visibility', 'visible')
        //             break
		// 	}
		// }
		
	}
}
</script>

<style scoped>
/* @import url('https://api.mapbox.com/mapbox-gl-js/v1.9.1/mapbox-gl.css'); */
#map {
	position: absolute;
	left: 0;
	top: 0;
	text-align: left;
	width: 100%;
	height: 100%;
}
</style>