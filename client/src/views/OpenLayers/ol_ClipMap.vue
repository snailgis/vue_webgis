<template>
	<div id="map" ref="rootmap">
	</div>
</template>

<script>
import 'ol/ol.css'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import GeoJSON from 'ol/format/GeoJSON';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import mapconfig from '../../config/olmapConfig'
import superClusterMap from './modules/superclustermap'
import { transform } from 'ol/proj'

import sxgeojson from '../../assets/data/xianyang.json'

export default {
	data() {
		return {
			map: null,
            view: null,
            superclusterLayer: null,
            proj: 'EPSG:4326', //定义wgs84地图坐标系
			proj_m: 'EPSG:3857', //定义墨卡托地图坐标系
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
        this.clipMap()
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
                layers: [mapconfig.tilemap],
                view: this.view
            })
            // this.superclusterLayer = superClusterMap.clusterLayer()
            // this.map.addLayer(this.superclusterLayer)
        },
        clipMap: function(){
            let view = this.view
            let tileMap = mapconfig.tilemap
            let formatGeoJSON = new GeoJSON({
                featureProjection: "EPSG:4326"
            });
            let features = formatGeoJSON.readFeatures(sxgeojson);
            let xyGeometry = features[0].getGeometry();
            let fExtent = xyGeometry.getExtent();
            view.fit(fExtent)
            let fillStyle = new Fill({
                color: [0,0,0,0]
            })
            let styleVC = new Style({
                fill: fillStyle
            })
            tileMap.on('precompose', function(event){
                let ctx = event.context
                let pixelRatio = event.frameState.pixelRatio
                let vecCtx = event.vectorContext;
                ctx.save()
                vecCtx.setStyle(styleVC)
                vecCtx.drawGeometry(xyGeometry)
                ctx.lineWidth = 5 * pixelRatio
                ctx.strokeStyle = 'rgba(0,0,0,0.1)'
                ctx.stroke()
                ctx.clip()
            })
            tileMap.on('postcompose', function(event){
                let ctx = event.context
                ctx.restore()
            })
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