<template>
	<div id="map" ref="rootmap"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import jsonData from './data/heatmapdata.json'
import bjData from './data/bj.json'

import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { MapboxLayer } from "@deck.gl/mapbox";

/**
 * mapboxGL与deck.gl融合实现蜂窝图可视化（三维热力）
 * deck.gl是由uber开发出来的基于WebGL的开源大数据量可视化框架，具有提供不同类型可视化图层，能够和mapbox-gl集成。
 * deck.gl项目地址：https://github.com/visgl/deck.gl
 * deck.gl和mapbox-gl集成有两种方式：
 * 1、以扩展图层的形式，将deck.gl作为mapbox-gl的一个图层加载进去，这里是mapbox-gl作为主体；
 * 2 以deck.gl为主体，设置deck.gl中使用的地图是mapbox-gl；
 */
export default {
	name: 'mapboxgl_3dbuilding',
	data() {
		return {
            map: null,
            DATA_URL: bjData,
            OPTIONS: ['radius', 'coverage', 'upperPercentile'],
            COLOR_RANGE: [
                [1, 152, 189],
                [73, 227, 206],
                [216, 254, 181],
                [254, 237, 177],
                [254, 173, 84],
                [209, 55, 78]
            ],
            LIGHT_SETTINGS: {
                lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
                ambientRatio: 0.4,
                diffuseRatio: 0.6,
                specularRatio: 0.2,
                lightsStrength: [0.8, 0.0, 0.8, 0.0],
                numberOfLights: 2
            }
		}
	},
	mounted() {
		this.init()
		this.addHexagonLayer()
	},
	methods: {
		init() {
			mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94bWF4IiwiYSI6ImNqbnY4MHM3azA2ZmkzdnBnMThvNzRoZ28ifQ.IffqPZGkhcdPjnZ2dmSO6w'

			this.map = new mapboxgl.Map({
				container: 'map', 
                style: 'mapbox://styles/mapbox/dark-v9',
				center: [120.162277, 30.178373],
                zoom: 12,
                pitch: 40.5
			});
			this.map.addControl(new mapboxgl.NavigationControl(), 'top-right')
			this.map.addControl(new mapboxgl.ScaleControl({ maxWidth: 80, unit: 'metric' }),'bottom-right')
			this.map.addControl(new mapboxgl.FullscreenControl({container: document.querySelector('map')}),'top-right')
        },
        /**
         * coverage：六棱柱的半径乘法器，值的大小为=coverage*radius. 取值0-1。
         * radius：六棱柱范围大小、半径。
         * upperPwecentile:有颜色的六棱柱大于百分位的被隐藏：取值范围：1-100%
         * lowerPercentile：有颜色的六棱柱低于百分位的被隐藏，取值1-100
         * elevationUpperPercentile：海拔高度的'海拔上百分位'。具有高程值的六边形大于标高的上百分位将被隐藏。
         * elevationLowerPercentile：海拔高度的'海拔上百分位'。具有高程值的六边形小于标高的上百分位将被隐藏。
         */
		addHexagonLayer() {
            let that = this
            let hexagonLayer;
            that.map.on('load', function() {
                let map = this
                hexagonLayer = new MapboxLayer({
                    type: HexagonLayer,
                    id: 'heatmap',
                    data: that.DATA_URL,
                    radius: 26,
                    coverage: 1.0,
                    upperPercentile: 100,
                    colorRange: that.COLOR_RANGE,
                    elevationRange: [2, 100],
                    elevationScale: 6,
                    extruded: true,
                    getPosition: d => [Number(d.lng), Number(d.lat)],
                    lightSettings: that.LIGHT_SETTINGS,
                    opacity: 0.2
                });
                map.addLayer(hexagonLayer);
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
