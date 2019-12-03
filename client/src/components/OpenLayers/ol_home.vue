<template>
	<div id="olmap" ref="olmap" style="width: 100%; height: 100%;">
		<el-select class="mapselect" v-model="value" placeholder="切换地图底图" @change="changeBaseMap(value)">
			<el-option-group v-for="group in options" :key="group.label" :label="group.label">
				<el-option
					v-for="item in group.options"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				></el-option>
			</el-option-group>
		</el-select>
	</div>
</template>

<script>
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import { OSM, TileArcGISRest } from 'ol/source'
import XYZ from 'ol/source/XYZ'
import { transform } from 'ol/proj'
import mapSources from './maplist'

export default {
	components: {},
	data() {
		return {
			options: mapSources.basemapLabel,
			value: '',
			googledz: mapSources.googledz,
			googledx: mapSources.googledx,
			googlewx: mapSources.googlewx,
      tdtdz: mapSources.tdtdz,
      tdtwx: mapSources.tdtwx,
			proj: 'EPSG:4326', //定义wgs84地图坐标系
			proj_m: 'EPSG:3857', //定义墨卡托地图坐标系
			map: null,
			mapLayer: null,
			mapLayerlabel: null
		}
	},
	created() {
		//this.createMap()
	},
	mounted() {
    this.initMap()
  },
  methods: {
    initMap: function(){
      //初始化map对象
      this.map = new Map({
        target: 'olmap',
        projection: this.proj,
        //interactions: ol.interaction.defaults().extend([mapDragInteraction]),
        view: new View({
          center: transform(
            [101.46912, 36.24274],
            this.proj,
            this.proj_m
          ),
          zoom: 5
        })
      })
      //初始化地图图层
      this.mapLayer = new TileLayer({
        source: this.googlewx,
        projection: this.proj
      })
      //初始化标签图层
      this.mapLayerlabel = new TileLayer({
        source: null,
        projection: this.proj
      })
      //将图层加载到地图对象
      this.map.addLayer(this.mapLayer)
      this.map.addLayer(this.mapLayerlabel)
    },
		/******************地图切换方法***************/
		changeBaseMap: function(value) {
      console.log(value)
      this.map.removeLayer(this.mapLayer)
			switch (value) {
				case 'googledz':
          	this.mapLayer = new TileLayer({
              source: this.googledz,
              projection: this.proj
            })
            this.map.addLayer(this.mapLayer)
					break;
				case 'googledx':
            this.mapLayer = new TileLayer({
              source: this.googledx,
              projection: this.proj
            })
            this.map.addLayer(this.mapLayer)
          break;
        case 'googlewx':
          this.mapLayer = new TileLayer({
            source: this.googlewx,
            projection: this.proj
          })
          this.map.addLayer(this.mapLayer)
          break;
        case 'tdtdz':
          this.mapLayer = new TileLayer({
            source: this.tdtdz,
            projection: this.proj
          })
          this.map.addLayer(this.mapLayer)
          break;
        case 'tdtwx':
          this.mapLayer = new TileLayer({
            source: this.tdtwx,
            projection: this.proj
          })
          this.map.addLayer(this.mapLayer)
          break;
			}
		}
	}
}
</script>

<style scoped>
#olmap {
	position: relative;
	z-index: 1;
}
.mapselect {
	position: absolute;
	top: 3%;
	right: 2%;
	z-index: 2;
}
</style>
