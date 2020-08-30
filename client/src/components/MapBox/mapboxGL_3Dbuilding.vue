<template>
	<div id="map" ref="rootmap"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import mapSources from './modules/mapstyles'
import builddata from '../../assets/data/3dbuilding.json'
import 'mapbox-gl/dist/mapbox-gl.css'

/**
 * 加载GeoServer三维建筑物矢量瓦片G
 */
export default {
	name: 'mapboxgl_3dbuilding',
	data() {
		return {
			map: null,
			builddata: builddata
		}
	},
	mounted() {
		this.init()
		this.add3dbuilding()
		this.click3dbuilding()
	},
	methods: {
		init() {
			// mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94bWF4IiwiYSI6ImNqbnY4MHM3azA2ZmkzdnBnMThvNzRoZ28ifQ.IffqPZGkhcdPjnZ2dmSO6w'

			this.map = new mapboxgl.Map({
				container: 'map', 
				style: {
					version: 8,
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
				center: [116.391490,39.906994], 
				zoom: 14,
				pitch: 65, //默认倾斜角度-三维效果
				bearing: 0, //默认偏移角度
			});
			this.map.addControl(new mapboxgl.NavigationControl(), 'top-right')
			this.map.addControl(
				new mapboxgl.ScaleControl({ maxWidth: 80, unit: 'metric' }),
				'bottom-right'
			)
			this.map.addControl(
				new mapboxgl.FullscreenControl({
					container: document.querySelector('map')
				}),
				'top-right'
			)
		},
		add3dbuilding() {
            this.map.on('load', function() {
				let map = this
				map.addSource('bj_building',{
					'type':'vector',
					'scheme':'tms',
					'tiles':['http://localhost:8088/geoserver/gwc/service/tms/1.0.0/xy_3dbuilding:bj@EPSG:900913@pbf/{z}/{x}/{y}.pbf']
				});

				map.addLayer({
					'id': '3d-buildings',
					'source': 'bj_building', 
					'source-layer': 'bj', // shp图层名
					'minzoom': 14,
					'type': 'fill-extrusion',
					'paint': {
						'fill-extrusion-color': [
							'interpolate',
							['linear'],
							['get', 'height'],
							0, 'rgb(255,255,191)',
							50, 'rgb(253,174,97)',
							100, "rgb(215,25,28)",
						],
						'fill-extrusion-height': ['get', 'height'],
						'fill-extrusion-base': 0,
                    	// "fill-extrusion-pattern": "sion-material-32",
						'fill-extrusion-opacity': .8
					}
				});

				// 地图点击高亮图层相关
				map.addLayer({
					'id': 'highLightLayer',
					'type': 'fill-extrusion',
					'source': 'bj_building',
					'source-layer':'bj',
					'paint': {
						'fill-extrusion-color': '#1E90FF',//'#FFD700',
						'fill-extrusion-height': [
							"interpolate", ["linear"], ["zoom"],
							13, 0,
							15.05, ["get", "height"]
						],
					},
					"filter": ["in", "buildingId", ""]
				});
				map.addLayer({
					'id': 'highLightLayerOne',
					'type': 'fill-extrusion',
					'source': 'bj_building',
					'source-layer':'bj',
					'minzoom': 14,
					'paint': {
						'fill-extrusion-color': '#1E90FF',//'#FFD700',
						'fill-extrusion-height': [
							"interpolate", ["linear"], ["zoom"],
							13, 0,
							15.05, ["get", "height"]
						],
					},
					"filter": ["in", "buildingId", ""]
				});

                // let popups = new mapboxgl.Popup({
                //     closeButton: false,
                //     closeOnClick: false
                // })
                // map.on("mousemove", "entity_layer", function (e) {
                //     map.getCanvas().style.cursor = 'pointer';
                //     let feature = e.features[0];

                //     let relatedFeatures = map.querySourceFeatures('states', {
                //         filter: ['in', 'pkid', feature.properties.pkid]
                //     });

                //     let filter = relatedFeatures.reduce(function (memo, feature) {
                //         memo.push(feature.properties.pkid);
                //         return memo;
                //     }, ['in', 'pkid']);

                //     map.setFilter("entity_borders", filter);

                //     //建筑物弹窗信息
                //     let xmmc = "";
                //     if (feature.properties.XMMC.length > 35) {
                //         let a1 = feature.properties.XMMC.substring(0, 35);
                //         let a2 = feature.properties.XMMC.substring(35, feature.properties.XMMC.length);
                //         xmmc = "<h1 style='color: white'><a style='color: orange'>" + a1 + "<br>" + a2 + " (" + feature.properties.JZWMC + ")</a></h1>";
                //     } else {
                //         xmmc = "<h1 style='color: white'><a style='color: orange'>" + feature.properties.XMMC + " (" + feature.properties.JZWMC + ")</a></h1>";
                //     }
                //     //建筑物弹窗信息
                //     let html = xmmc +
                //         "<h2 style='color: white'> 建筑物用途：<a style='color: orange'>" + feature.properties.JZWJBYT + "</a> </h2>" +
                //         "<h2 style='color: white'> 建筑物高度：<a style='color: orange'>" + feature.properties.JZWGD + " 米</a></h2>" +
                //         "<h2 style='color: white'> 维修单位：<a style='color: orange'>" + feature.properties.WXDW + "</a> </h2>" +
                //         "<h2 style='color: white'> 物业公司：<a style='color: orange'>" + feature.properties.WYGSMC + "</a></h2>" +
                //         "<h2 style='color: white'> 坐落：<a style='color: orange'>" + feature.properties.ZL + "</a> </h2>";
                //     popups.setLngLat([feature.properties.X, feature.properties.Y])
                //         .setHTML(html)
                //         .addTo(map);
                // });
                // // map.on("mouseleave", "entity_layer", function () {
                // //     map.getCanvas().style.cursor = '';
                // //     map.setFilter('entity_borders', ['in', 'pkid', '']);
                // //     popups.remove();
                // // });
			})


		},
		click3dbuilding() {
			let map = this.map
			map.on("mousemove", "3d-buildings", function (e) {
				map.getCanvas().style.cursor = 'pointer';
				
			})

			map.on("mousemove", "3d-buildings", function (e) {
				map.getCanvas().style.cursor = '';
			})

			map.on("click", "3d-buildings", function(e){
				map.setFilter('highLightLayerOne', ['in', 'buildingId', '']);//隐藏上次点击高亮建筑物
				let feature = e.features[0];
				console.log(feature)
				// 建筑物编号
				let buildingId = feature.properties.buildingId;
				if (!buildingId || buildingId === 'null') {
					return;
				}

				// 设置高亮
				map.setFilter('highLightLayerOne', ['in', 'buildingId', buildingId]);
			})
		}

	}
}
</script>

<style scoped>
body {
	margin: 0;
	padding: 0;
}

#map {
	height: 100%;
}
</style>
