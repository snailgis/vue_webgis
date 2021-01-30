<template>
	<div id="map" ref="rootmap">
	</div>
</template>

<script>
import 'ol/ol.css'
import { Map, View } from 'ol'
import mapconfig from '../../config/olmapConfig'
import superClusterMap from './modules/superclustermap'

export default {
	data() {
		return {
			map: null,
            view: null,
            superclusterLayer: null
		}
	},
	created() {},
	mounted() {

        
        this.initMap() // 初始化地图，加载图层

		this.map.on('singleclick', function(e) {
			let map = this
			let zoom = map.getView().getZoom()
			let hasFeature = map.hasFeatureAtPixel(e.pixel)

			if (hasFeature) {
                let count = map.getFeaturesAtPixel(e.pixel)[0].values_.features.length
                if(count === 1){
                    console.log(map.getFeaturesAtPixel(e.pixel)[0].values_.features)
                    console.log('机构ID', map.getFeaturesAtPixel(e.pixel)[0].values_.features[0].values_.id)
                } else {
                    map.getView().animate({
                    center: e.coordinate,
                    duration: 600,
                    zoom: zoom + 2
                  });
                }
			}
		})
	},
	methods: {
		initMap: function() {
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
            this.superclusterLayer = superClusterMap.clusterLayer()
            this.map.addLayer(this.superclusterLayer)
		}
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
</style>