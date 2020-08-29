<template>
	<div id="map" ref="rootmap"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
// import '../../assets/css/mapbox-gl.css'
import builddata from '../../assets/data/3dbuilding.json'
import 'mapbox-gl/dist/mapbox-gl.css'

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
	},
	methods: {
		init() {
			mapboxgl.accessToken =
				'pk.eyJ1IjoibWFwYm94bWF4IiwiYSI6ImNqbnY4MHM3azA2ZmkzdnBnMThvNzRoZ28ifQ.IffqPZGkhcdPjnZ2dmSO6w'
			this.map = new mapboxgl.Map({
				style: 'mapbox://styles/mapbox/light-v10',
				center: [112.88, 28.19], //中心点配置28.1906733000,112.8814513600
				zoom: 15, //当前缩放等级
				pitch: 65, //默认倾斜角度-三维效果
				bearing: 30, //默认偏移角度
				container: 'map'
			})
		},
		add3dbuilding() {
            this.map.on('load', function() {
                let map = this
				if (map.getLayer('entity_layer')) {
					map.removeLayer('entity_layer')
				}
				if (map.getLayer('entity_borders')) {
					map.removeLayer('entity_borders')
				}
				builddata.features.forEach(item => {
					let he = '' //默认建筑物高度
					if (item.properties.height == '') {
						he = '5'
					} else {
						he = item.properties.height
					}
					//模拟数据
					item.properties.pkid = parseInt(item.properties.xh)
					item.properties.height = parseInt(he)
					item.properties.base_height = parseInt(0)
				})
				if (map.getSource('states')) {
					map.getSource('states').setData(builddata)
				} else {
					map.addSource('states', {
						type: 'geojson',
						data: builddata
					})
				}
				map.addLayer({
					id: 'entity_layer',
					type: 'fill',
					source: 'states',
					type: 'fill-extrusion',
					layout: {},
					minzoom: 14,
					paint: {
						'fill-extrusion-color': '#aaa',
						'fill-extrusion-height': [
							'interpolate',
							['linear'],
							['zoom'],
							14,
							0,
							14.05,
							['get', 'height']
						],
						'fill-extrusion-base': [
							'interpolate',
							['linear'],
							['zoom'],
							14,
							0,
							14.05,
							['get', 'base_height']
						],
						'fill-extrusion-opacity': 0.6
					}
				})
				map.addLayer({
					id: 'entity_borders',
					type: 'fill',
					source: 'states',
					type: 'fill-extrusion',
					layout: {},
					minzoom: 14,
					paint: {
						'fill-extrusion-color': '#b8c9dd',
						'fill-extrusion-height': ['get', 'height'],
						'fill-extrusion-base': ['get', 'base_height'],
						'fill-extrusion-opacity': 1
					},
					filter: ['in', 'pkid', '']
                })
                let popups = new mapboxgl.Popup({
                    closeButton: false,
                    closeOnClick: false
                })
                map.on("mousemove", "entity_layer", function (e) {
                    map.getCanvas().style.cursor = 'pointer';
                    let feature = e.features[0];

                    let relatedFeatures = map.querySourceFeatures('states', {
                        filter: ['in', 'pkid', feature.properties.pkid]
                    });

                    let filter = relatedFeatures.reduce(function (memo, feature) {
                        memo.push(feature.properties.pkid);
                        return memo;
                    }, ['in', 'pkid']);

                    map.setFilter("entity_borders", filter);

                    //建筑物弹窗信息
                    let xmmc = "";
                    if (feature.properties.XMMC.length > 35) {
                        let a1 = feature.properties.XMMC.substring(0, 35);
                        let a2 = feature.properties.XMMC.substring(35, feature.properties.XMMC.length);
                        xmmc = "<h1 style='color: white'><a style='color: orange'>" + a1 + "<br>" + a2 + " (" + feature.properties.JZWMC + ")</a></h1>";
                    } else {
                        xmmc = "<h1 style='color: white'><a style='color: orange'>" + feature.properties.XMMC + " (" + feature.properties.JZWMC + ")</a></h1>";
                    }
                    //建筑物弹窗信息
                    let html = xmmc +
                        "<h2 style='color: white'> 建筑物用途：<a style='color: orange'>" + feature.properties.JZWJBYT + "</a> </h2>" +
                        "<h2 style='color: white'> 建筑物高度：<a style='color: orange'>" + feature.properties.JZWGD + " 米</a></h2>" +
                        "<h2 style='color: white'> 维修单位：<a style='color: orange'>" + feature.properties.WXDW + "</a> </h2>" +
                        "<h2 style='color: white'> 物业公司：<a style='color: orange'>" + feature.properties.WYGSMC + "</a></h2>" +
                        "<h2 style='color: white'> 坐落：<a style='color: orange'>" + feature.properties.ZL + "</a> </h2>";
                    popups.setLngLat([feature.properties.X, feature.properties.Y])
                        .setHTML(html)
                        .addTo(map);
                });
                // map.on("mouseleave", "entity_layer", function () {
                //     map.getCanvas().style.cursor = '';
                //     map.setFilter('entity_borders', ['in', 'pkid', '']);
                //     popups.remove();
                // });
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
