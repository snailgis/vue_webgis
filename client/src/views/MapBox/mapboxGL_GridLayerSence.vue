<template>
	<div id="map" ref="rootmap"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import jsonData from './data/uber-pickup-locations.json'

import { ScreenGridLayer } from '@deck.gl/aggregation-layers';
import { MapboxLayer } from "@deck.gl/mapbox";

/**
 * mapboxGL与deck.gl融合实现网格可视化
 * deck.gl是由uber开发出来的基于WebGL的开源大数据量可视化框架，具有提供不同类型可视化图层，能够和mapbox-gl集成。
 * deck.gl项目地址：https://github.com/visgl/deck.gl
 * deck.gl和mapbox-gl集成有两种方式：(案例主要以第一种实现方式为主)
 * 1、以扩展图层的形式，将deck.gl作为mapbox-gl的一个图层加载进去，这里是mapbox-gl作为主体；
 * 2 以deck.gl为主体，设置deck.gl中使用的地图是mapbox-gl；
 */
export default {
	name: 'mapboxgl_3dbuilding',
	data() {
		return {
            map: null,
            DATA_URL: jsonData,
            OPTIONS: ['radius', 'coverage', 'upperPercentile'],
            COLOR_RANGE: [
                [255, 255, 178, 25],
                [254, 217, 118, 85],
                [254, 178, 76, 127],
                [253, 141, 60, 170],
                [240, 59, 32, 212],
                [189, 0, 38, 255]
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
		this.addScreenGridlayer()
	},
	methods: {
		init() {
			mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94bWF4IiwiYSI6ImNqbnY4MHM3azA2ZmkzdnBnMThvNzRoZ28ifQ.IffqPZGkhcdPjnZ2dmSO6w'

			this.map = new mapboxgl.Map({
				container: 'map', 
                style: 'mapbox://styles/mapbox/dark-v9',
				center: [-73.75, 40.73],
                zoom: 9.6,
                maxZoom: 16,
                pitch: 0,
                bearing: 0
			});
			this.map.addControl(new mapboxgl.NavigationControl(), 'top-right')
			this.map.addControl(new mapboxgl.ScaleControl({ maxWidth: 80, unit: 'metric' }),'bottom-right')
			this.map.addControl(new mapboxgl.FullscreenControl({container: document.querySelector('map')}),'top-right')
		},
		addScreenGridlayer() {
            let that = this
            let screengridlayer;
            that.map.on('load', function() {
                let map = this
                screengridlayer = new MapboxLayer({
                    type: ScreenGridLayer,
                    id: 'grid',
                    data: that.DATA_URL,
                    colorRange: that.COLOR_RANGE,
                    cellSizePixels: 10,
                    gpuAggregation: true,
                    aggregation: 'SUM',
                    getPosition: d => [d[0], d[1]],
                    getWeight: d => d[2],
                    opacity: 0.8
                });

                map.addLayer(screengridlayer);

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
