<template>
	<div id="map">
		<el-row class="opebutton">
			<el-button type="primary" @click="drawPolygon()">绘制区域</el-button>
			<el-button type="primary" @click="drawPoint()">绘制中心点</el-button>
			<el-button type="danger" @click="delectDraw()">删除绘制</el-button>
            <el-button type="saveDraw" @click="saveDraw()">保存绘制</el-button>
		</el-row>
	</div>
</template>
<script>
import mapBoxGl from 'mapbox-gl'
import {
	CircleMode,
	DragCircleMode,
	DirectMode,
	SimpleSelectMode
} from 'mapbox-gl-draw-circle'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapSources from './modules/mapstyles'
export default {
	data() {
		return {
            map: null,
            draw: null
		}
	},
	created() {},
	mounted() {
		this.init()
	},
	methods: {
		init() {
			mapBoxGl.accessToken =
				'pk.eyJ1IjoibWFwYm94bWF4IiwiYSI6ImNqbnY4MHM3azA2ZmkzdnBnMThvNzRoZ28ifQ.IffqPZGkhcdPjnZ2dmSO6w'
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

			this.draw = new MapboxDraw({
				displayControlsDefault: false,
				controls: {
					polygon: true,
					point: true,
					trash: true
				}
			})

			this.map.addControl(this.draw)
        },
        // 开始绘制区域
		drawPolygon: function() {
            this.draw.changeMode('draw_polygon');
        },
        // 标记中心点
        drawPoint: function(){
            this.draw.changeMode('draw_point');
        },
        // 删除
        delectDraw: function(){
            this.draw.deleteAll()
        }
	}
}
</script>

<style scoped>
/* @import url('https://api.mapbox.com/mapbox-gl-js/v1.9.1/mapbox-gl.css'); */
@import url('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.0.9/mapbox-gl-draw.css');
#map {
	/* position: absolute; */
	left: 0;
	top: 0;
	text-align: left;
	width: 100%;
	height: 100%;
    cursor: ne-resize
}

.opebutton {
	position: absolute;
	top: 3%;
	right: 20%;
	z-index: 2;
}
</style>