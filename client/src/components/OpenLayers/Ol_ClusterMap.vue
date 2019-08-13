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
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Icon, Text, Fill, Stroke, Circle, Style } from 'ol/style'
import mapconfig from '../../config/olmapConfig'
import $ from 'jquery'
export default {
	data() {
		return {
			map: null,
			view: null
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

		this.map.on('moveend', function() {
			let map = this
			let zoom = map.getView().getZoom()
			let mapExtent = map.getView().calculateExtent()
			//let zoom = e.frameState.viewState.zoom //获取当前地图的缩放级别
			//let mapExtent = e.frameState.extent //获取当前地图的可视区域

			let markers = getDataByExtent(mapExtent, zoom)
			addMarkers(map, markers)
		})

		function getDataByAPI(level, minlon, maxlon, minlat, maxlat, callback) {
			let dataArray = []
			let baseUrl = `http://61.185.20.20:2300/product-xczx/api/weChat/listAreaByLevel?flag=2&level=${level}&x1=${minlon}&x2=${maxlon}&y1=${minlat}&y2=${maxlat}`
			$.ajax({
				async: false,
				url: baseUrl,
				dataType: 'json',
				type: 'get',
				success: function(data) {
					if (data) {
						callback(data)
					}
				},
				error: function(data) {
					console.log(data)
				}
			})
			return dataArray
		}

		function getDataByExtent(extent, zoom) {
			let minlon = extent[0]
			let minlat = extent[1]
			let maxlon = extent[2]
			let maxlat = extent[3]
			let markers = []
			if (zoom < 9) {
				getDataByAPI(2, minlon, maxlon, minlat, maxlat, function(res) {
					let data = res.data
					for (let i = 0; i < data.length; i++) {
						markers[i] = {
							lon: data[i].wgsLng,
							lat: data[i].wgsLat,
							count: data[i].total,
							value: data[i].areaName,
							level: 0
						}
					}
				})
			} else if (zoom >= 9 && zoom < 11) {
				getDataByAPI(3, minlon, maxlon, minlat, maxlat, function(res) {
					let data = res.data
					for (let i = 0; i < data.length; i++) {
						markers[i] = {
							lon: data[i].wgsLng,
							lat: data[i].wgsLat,
							count: data[i].total,
							value: data[i].areaName,
							level: 1
						}
					}
				})
			} else if (zoom >= 11 && zoom < 13) {
				getDataByAPI(4, minlon, maxlon, minlat, maxlat, function(res) {
					let data = res.data
					for (let i = 0; i < data.length; i++) {
						markers[i] = {
							lon: data[i].wgsLng,
							lat: data[i].wgsLat,
							count: data[i].total,
							value: data[i].areaName,
							level: 2
						}
					}
				})
			} else if (zoom >= 13 && zoom < 15) {
				getDataByAPI(5, minlon, maxlon, minlat, maxlat, function(res) {
					let data = res.data
					for (let i = 0; i < data.length; i++) {
						markers[i] = {
							lon: data[i].wgsLng,
							lat: data[i].wgsLat,
							count: data[i].total,
							value: data[i].areaName,
							level: 3
						}
					}
				})
			} else if (zoom >= 15) {
				getDataByAPI(6, minlon, maxlon, minlat, maxlat, function(res) {
					let data = res.data
					for (let i = 0; i < data.length; i++) {
						markers[i] = {
							lon: data[i].wgsLng,
							lat: data[i].wgsLat,
							key: data[i].id,
							value: data[i].houseName,
							poorOffFlag: data[i].mark,
							level: 4
						}
					}
				})
			}
			return markers
		}

		let vectorLayer
		function addMarkers(map, markers) {
			if (vectorLayer) {
				map.removeLayer(vectorLayer)
			}
			var features = []
			for (var i in markers) {
				var _markers = markers[i]
				var pointX = parseFloat(_markers.lon)
				var pointY = parseFloat(_markers.lat)
				var _feature = new Feature({
					geometry: new Point([pointX, pointY]),
					value: _markers
				})
				var styles = []
				if (_markers.level == 4) {
					var poorOffFlag = _markers.poorOffFlag
					if (poorOffFlag == 0) {
						styles.push(
							new Style({
								image: new Icon({
									// src: '../assets/img/locationRed.png',
									src: 'http://fp1.xys.gov.cn/jzfp_ol/assets/img/locationRed.png',
									anchor: [0.5, 1.0]
								}),
								text: new Text({
									textAlign: 'center', //位置
									textBaseline: 'middle', //基准线
									font: 'normal 14px 微软雅黑', //文字样式
									text: _markers.value, //文本内容
									fill: new Fill({
										//文本填充样式（即文字颜色)
										color: '#F4F4F4'
									}),
									stroke: new Stroke({
										color: '#696969',
										width: 1
									}),
									offsetY: -36
								})
							})
						)
					} else {
						styles.push(
							new Style({
								image: new Icon({
									// src: '../assets/img/locationGreen.png',
									src: 'http://fp1.xys.gov.cn/jzfp_ol/assets/img/locationGreen.png',
									anchor: [0.5, 1.0]
								}),
								text: new Text({
									textAlign: 'center', //位置
									textBaseline: 'middle', //基准线
									font: 'normal 14px 微软雅黑', //文字样式
									text: _markers.value, //文本内容
									fill: new Fill({
										//文本填充样式（即文字颜色)
										color: '#F4F4F4'
									}),
									stroke: new Stroke({
										color: '#696969',
										width: 1
									}),
									offsetY: -36
								})
							})
						)
					}
					_feature.setStyle(styles)
					features.push(_feature)
				} else {
					styles.push(
						new Style({
							image: new Circle({
								radius: 36,
								fill: new Fill({
									color: '#1C8FFC'
								}),
								stroke: new Stroke({
									color: '#E4F4F4',
									width: 1.5
								})
							}),
							text: new Text({
								text: _markers.value,
								fill: new Fill({
									color: '#E4F4F4'
								}),
								textAlign: 'center',
								textBaseline: 'middle',
								font: '12px sans-serif',
								offsetY: -8
							})
						})
					)
					styles.push(
						new Style({
							geometry: _feature.geometry,
							text: new Text({
								text: '共' + _markers.count.toString() + '人',
								textAlign: 'center',
								textBaseline: 'middle',
								font: '12px sans-serif',
								offsetY: 10,
								fill: new Fill({
									color: '#fff'
								})
							})
						})
					)
					//feature setStyle()可以添加单个样式，样式组Array和FeatureStyleFunction
					_feature.setStyle(styles)
					features.push(_feature)
				}
			}
			var vectorSource = new VectorSource({
				features: features
			})
			vectorLayer = new VectorLayer({
				source: vectorSource
			})
			map.addLayer(vectorLayer)
		}

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