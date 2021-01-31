<template>
	<div id="map">
		<select-layer class="mapselect" :map="map"></select-layer>
		<layer-menu class="maplayermenu" ref="layerstatus" @LayerStatus="LayerStatus"></layer-menu>
	</div>
</template>
<script>
import mapBoxGl from 'mapbox-gl'
import MapboxCircle from 'mapbox-gl-circle'
import mapSources from './modules/mapstyles'
import 'mapbox-gl/dist/mapbox-gl.css'

import SelectLayer from '../../components/MapBox/SelectLayer'
import LayerMenu from '../../components/commons/LayerMenu'
export default {
	data() {
		return {
			map: null
		}
	},
	components: {
		'select-layer': SelectLayer,
		'layer-menu': LayerMenu
    },
	created() {},
	mounted() {
		this.init()
	},
	methods: {
		init() {
			mapBoxGl.accessToken = 'pk.eyJ1Ijoic25haWxnaXMiLCJhIjoiY2tpb2QxdDhjMDVnYjJ4bjRjMTh6ZjI2diJ9.-TvHO_W66huWGXZiwoxGlA'
			this.map = new mapBoxGl.Map({
				container: 'map',
				style: 'mapbox://styles/snailgis/ckarq4x7c25rs1io2bdg7iv6t',
				center: [108.724823, 34.34343607],
				zoom: 13,
				minZoom: 5,
				maxZoom: 18,
				pitch: 40,
				bearing: 1
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

			// var editableCircleOpts = {
			// 	editable: true,
			// 	minRadius: 100,
			// 	strokeColor: '#0000ff',
			// 	strokeOpacity: 0.25,
			// 	strokeWeight: 2,
			// 	refineStroke: true,
			// 	// fillColor: '#000000',
			// 	fillOpacity: 0.1,
			// 	debugEl: document.getElementById('debug')
			// }

			// var myPosition = {
			// 	position: { lat: 34.34343607, lng: 108.724823 }, // 中心点
			// 	radius: 1000 // 半径（km）
			// }

			// var myCircle = new MapboxCircle(
			// 	myPosition.position,
			// 	myPosition.radius,
			// 	editableCircleOpts
			// ).addTo(this.map)

			// myCircle.on('centerchanged', function(circleObj) {
			// 	console.log('New center:', circleObj.getCenter())
			// })
			// myCircle.once('radiuschanged', function(circleObj) {
			// 	console.log('New radius (once!):', circleObj.getRadius())
			// })
			// myCircle.on('click', function(mapMouseEvent) {
			// 	console.log('Click:', mapMouseEvent.point)
			// })
			// myCircle.on('contextmenu', function(mapMouseEvent) {
			// 	console.log('Right-click:', mapMouseEvent)
			// })
		},
		// 在父组件中子组件引用处添加函数v-on:function="function1"；v-on:可以用@
		// val就是从子组件传过来的值
		LayerStatus(val){
			console.log(val)
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
.mapselect {
	position: absolute;
	top: 3%;
	right: 3%;
	z-index: 2;
}
.maplayermenu{
	position: absolute;
	top: 3%;
	left: 10%;
	z-index: 2;
}
</style>