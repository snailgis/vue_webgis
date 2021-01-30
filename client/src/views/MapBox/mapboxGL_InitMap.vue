<template>
	<div id="map"></div>
</template>
<script>
import mapBoxGl from 'mapbox-gl'
import MapboxCircle from 'mapbox-gl-circle'
import mapSources from './modules/mapstyles'
import 'mapbox-gl/dist/mapbox-gl.css'
export default {
	data() {
		return {
			map: null
		}
	},
	created() {},
	mounted() {
		this.init()
	},
	methods: {
		init() {
			// mapBoxGl.accessToken = 'pk.eyJ1IjoibWFwYm94bWF4IiwiYSI6ImNqbnY4MHM3azA2ZmkzdnBnMThvNzRoZ28ifQ.IffqPZGkhcdPjnZ2dmSO6w'
			this.map = new mapBoxGl.Map({
				container: 'map',
				style: {
					version: 8,
					// "glyphs": "../../static/fonts/{fontstack}/{range}.pbf", // 本地化字体
					glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
					sources: {
						source_tdtvec_tiles:
							mapSources.baseMapUrl.source_tdtvec_tiles,
						source_tdtcva_tiles:
							mapSources.baseMapUrl.source_tdtcva_tiles
					},
					layers: [
						mapSources.baseLayerConfig.tdtvec_tiles,
						mapSources.baseLayerConfig.tdtcva_tiles
					]
				},
				center: [108.724823, 34.34343607],
				zoom: 13,
				minZoom: 5,
				maxZoom: 17
				// pitch: 40,
				// bearing: 1
			})

			// map.addControl(new this.mbgl.GeolocateControl({ positionOptions: { enableHighAccuracy: true }, trackUserLocation: true }), 'top-left');
			this.map.addControl(new mapBoxGl.NavigationControl(), 'top-right')
			this.map.addControl(
				new mapBoxGl.ScaleControl({ maxWidth: 80, unit: 'metric' }),
				'bottom-right'
			)
			this.map.addControl(
				new mapBoxGl.FullscreenControl({
					container: document.querySelector('map')
				}),
				'top-right'
			)

			var editableCircleOpts = {
				editable: true,
				minRadius: 100,
				strokeColor: '#0000ff',
				strokeOpacity: 0.25,
				strokeWeight: 2,
				refineStroke: true,
				// fillColor: '#000000',
				fillOpacity: 0.1,
				debugEl: document.getElementById('debug')
			}

			var myPosition = {
				position: { lat: 34.34343607, lng: 108.724823 }, // 中心点
				radius: 1000 // 半径（km）
			}

			var myCircle = new MapboxCircle(
				myPosition.position,
				myPosition.radius,
				editableCircleOpts
			).addTo(this.map)

			myCircle.on('centerchanged', function(circleObj) {
				console.log('New center:', circleObj.getCenter())
			})
			myCircle.once('radiuschanged', function(circleObj) {
				console.log('New radius (once!):', circleObj.getRadius())
			})
			myCircle.on('click', function(mapMouseEvent) {
				console.log('Click:', mapMouseEvent.point)
			})
			myCircle.on('contextmenu', function(mapMouseEvent) {
				console.log('Right-click:', mapMouseEvent)
			})
		}
	}
}
</script>

<style scoped>
/* @import url('https://api.mapbox.com/mapbox-gl-js/v1.9.1/mapbox-gl.css'); */
#map {
	/* position: absolute; */
	left: 0;
	top: 0;
	text-align: left;
	width: 100%;
	height: 100%;
}
</style>