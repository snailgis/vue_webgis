<template>
	<div id="map" ref="rootmap"></div>
</template>

<script>
// import mapboxgl from 'mapbox-gl'
import mapboxgl from '!../MapBox/modules/mapbox-gl-enhance'

import mapSources from './modules/mapstyles'
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
			// mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94bWF4IiwiYSI6ImNqbnY4MHM3azA2ZmkzdnBnMThvNzRoZ28ifQ.IffqPZGkhcdPjnZ2dmSO6w'

			this.map = new mapboxgl.Map({
				container: 'map', 
				style: {
					version: 8,
					glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
					sources: {
                        'tianditu': {
                            type: 'raster',
                            tiles: ['http://t0.tianditu.com/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=5730f1a9e7de7c8f39c7e45725b863da'],
                            tileSize: 256  
                        }
					},
					layers: [
						{
                            "id": "tdtvec_tiles",
                            "type": "raster",
                            "source": "tianditu",
                            'layout': {
                                'visibility': 'visible'
                            },
                            "minzoom": 0,
                            "maxzoom": 18
                        }
					]
				},
				center: [108.94218499573003, 36.95873614427057],
				zoom: 10,
                crs: mapboxgl.CRS.EPSG4326, // 或者 mapboxgl.CRS.EPSG4326  或者 new mapboxgl.CRS('EPSG:4326',[-180,-90,180,90]);
				pitch: 0, //默认倾斜角度-三维效果
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
                // map.addSource('tianditu01', {
                //     type: 'raster',
                //     tiles: ['http://t0.tianditu.com/DataServer?T=cva_c&x={x}&y={y}&l={z}&tk=5730f1a9e7de7c8f39c7e45725b863da'],
                //     tileSize: 256  
                // })
                // map.addLayer({
                //     "id": "tdtcva_tiles",
                //     "type": "raster",
                //     "source": "tianditu01",
                //     'layout': {
                //         'visibility': 'visible'
                //     },
                //     "minzoom": 0,
                //     "maxzoom": 18
                // })
			})
            this.map.on("click",function(e){
                console.log(e)
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
