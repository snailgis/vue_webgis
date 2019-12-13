<template>
	<div id="map" ref="rootmap">
		<!-- <div class="homebtn">
			<img src="../assets/img/home_button.png" id="homeBtn" @click="homeLocated" />
		</div>
		<div class="menubtn">
			<img src="../assets/img/menu_button.png" id="menuBtn" @click="menuLocated" />
		</div>
		<div class="locationbtn">
			<img src="../assets/img/location_button.png" id="locationBtn" @click="gpsLocated" />
		</div> -->
	</div>
</template>

<script>
import 'ol/ol.css'
import { Map, View } from 'ol'
import mapconfig from '../../config/olmapConfig'
// import clustermap from './clustermap'

export default {
	data() {
		return {
			map: null,
			view: null,
// 			clustermapLayer: null
		}
	},
	created() {},
	mounted() {
		let mapcontainer = this.$refs.rootmap
		this.view = new View({
			projection: 'EPSG:4326',
			center: [mapconfig.x, mapconfig.y], 
			zoom: mapconfig.zoom
		})
		this.map = new Map({
			target: mapcontainer,
			layers: mapconfig.streetmap(),
			view: this.view
		})

		let _self = this

		this.map.on('moveend', function() {
			let map = this
			let zoom = map.getView().getZoom()
			let mapExtent = map.getView().calculateExtent()
			//let zoom = e.frameState.viewState.zoom //获取当前地图的缩放级别
			//let mapExtent = e.frameState.extent //获取当前地图的可视区域
			if(_self.clustermapLayer){
				map.removeLayer(_self.clustermapLayer)
			}
			let markers = clustermap.getDataByExtent(mapExtent, zoom)
			_self.clustermapLayer = clustermap.creatLayer(markers)
			map.addLayer(_self.clustermapLayer)
		})

		this.map.on('singleclick', function(e) {
			let map = this
			let zoom = map.getView().getZoom()
			let hasFeature = map.hasFeatureAtPixel(e.pixel)
			let _feature = map.getFeaturesAtPixel(e.pixel)[0]
			// let _attr = _feature.get('value')

			// console.log(_attr)
			if (hasFeature) {
				if (zoom < 15) {
					map.getView().animate({
						center: e.coordinate,
						duration: 600,
						zoom: zoom + 2
					})
				}
				if (zoom >= 15) {
					map.getView().animate(
						{ zoom: zoom },
						{ center: e.coordinate },
						{ duration: 1 }
					)
					// // 向RN传递参数，展示详情页面
					// if (window.postMessage) {
					// 	window.postMessage(JSON.stringify({ id: _attr.key }))
					// }
					// console.log('name:' + _attr.value, 'id: ' + _attr.key)
				}
			}
		})
	},
	methods: {
		// homeLocated: function() {
		// 	let view = this.map.getView()
		// 	view.animate({
		// 		center: [108.4, 34.75],
		// 		duration: 600,
		// 		zoom: 8
		// 	})
		// },
		// menuLocated: function() {
		// 	alert('定位到指定区域')
		// },
		// gpsLocated: function() {
		// 	alert('GPS定位')
		// }
	}
}
</script>

<style>
#map {
	height: 100%;
}
/*隐藏ol的一些自带元素*/
.ol-attribution,
.ol-zoom {
	display: none;
}

.homebtn {
	width: 30px;
	height: 30px;
	position: fixed;
	left: 4%;
	top: 5%;
	z-index: 99;
}

.homebtn img {
	width: 100%;
	height: 100%;
}
.menubtn {
	width: 30px;
	height: 30px;
	position: fixed;
	right: 4%;
	top: 5%;
	z-index: 99;
}

.menubtn img {
	width: 100%;
	height: 100%;
}

.locationbtn {
	width: 30px;
	height: 30px;
	position: fixed;
	left: 4%;
	top: 12%;
	z-index: 99;
}

.locationbtn img {
	width: 100%;
	height: 100%;
}
</style>