<template>
	<div id="olmap" ref="olmap" style="width: 100%; height: 100%;">
		<el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
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
		
        <el-select class="geometryType" v-model="value1" placeholder="选择绘制类型" @change="selectGeometry(value1)">
            <el-option
                v-for="item in geometryType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>

        <el-checkbox class="isedit" v-model="checked">启用WFS编辑</el-checkbox>
	</div>
</template>

<script>
import Map from 'ol/Map'
import View from 'ol/View'
import {Draw, Modify, Snap} from 'ol/interaction'
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer'
import {OSM, TileArcGISRest, Vector as VectorSource} from 'ol/source'
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style'
import XYZ from 'ol/source/XYZ'
import { transform } from 'ol/proj'
import mapSources from './maplist'


export default {
	components: {},
	data() {
		return {
            checked: false,
			geometryType: [
				{
					value: 'Point',
					label: 'Point'
				},
				{
					value: 'LineString',
					label: 'LineString'
				},
				{
					value: 'Polygon',
					label: 'Polygon'
				},
				{
					value: 'Circle',
					label: 'Circle'
				}
			],
			options: mapSources.basemapLabel,
            value: '',
            value1: '',
			googledz: mapSources.googledz,
			googledx: mapSources.googledx,
			googlewx: mapSources.googlewx,
			tdtdz: mapSources.tdtdz,
			tdtlabeldz: mapSources.tdtlabeldz,
			tdtwx: mapSources.tdtwx,
			tdtlabelwx: mapSources.tdtlabelwx,
			baidudz: mapSources.baidudz,
			baiduwx: mapSources.baiduwx,
			baidulabelwx: mapSources.baidulabelwx,
			gaodedz: mapSources.gaodedz,
			gaodewx: mapSources.gaodewx,
			gaodelabelwx: mapSources.gaodelabelwx,
			qqmapdz: mapSources.qqmapdz,
			qqmapdx: mapSources.qqmapdx,
			qqmaplabledx: mapSources.qqmaplabledx,
			qqmapwx: mapSources.qqmapwx,
			qqmaplablewx: mapSources.qqmaplablewx,
			geoqcs: mapSources.geoqcs,
			geoqns: mapSources.geoqns,
			geoqhs: mapSources.geoqhs,
			geoqlh: mapSources.geoqlh,
			proj: 'EPSG:4326', //定义wgs84地图坐标系
			proj_m: 'EPSG:3857', //定义墨卡托地图坐标系
			map: null,
			mapLayer: null,
			mapLayerlabel: null,
			source: null,
			vector: null,
			draw: null,
			snap: null
		}
	},
	created() {
		//this.createMap()
	},
	mounted() {
		this.initMap()
		// this.addInteractions()
	},
	methods: {
		initMap: function() {
			//初始化map对象
			this.map = new Map({
				target: 'olmap',
				projection: this.proj,
				//interactions: ol.interaction.defaults().extend([mapDragInteraction]),
				view: new View({
					center: transform(
						[108.7261669, 34.3347945],
						this.proj,
						this.proj_m
					),
					zoom: 15
				})
			})
			//初始化地图图层
			this.mapLayer = new TileLayer({
				source: this.googledz,
				projection: this.proj
			})
			//初始化标签图层
			this.mapLayerlabel = new TileLayer({
				source: null,
				projection: this.proj
			})
			this.source = new VectorSource()
            this.vector = new VectorLayer({
                source: this.source,
                style: new Style({
                    fill: new Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    stroke: new Stroke({
                        color: '#ffcc33',
                        width: 2
                    }),
                    image: new CircleStyle({
                        radius: 7,
                        fill: new Fill({
                            color: '#ffcc33'
                        })
                    })
                })
            })
			//将图层加载到地图对象
			this.map.addLayer(this.mapLayer)
			this.map.addLayer(this.mapLayerlabel)
			this.map.addLayer(this.vector)
		},
		/******************地图切换方法***************/
		changeBaseMap: function(value) {
			console.log(value)
			this.map.removeLayer(this.mapLayer)
			this.map.removeLayer(this.mapLayerlabel)
			switch (value) {
				case 'googledz':
					this.mapLayer = new TileLayer({
						source: this.googledz,
						projection: this.proj
					})
					this.map.addLayer(this.mapLayer)
					break
				case 'googledx':
					this.mapLayer = new TileLayer({
						source: this.googledx,
						projection: this.proj
					})
					this.map.addLayer(this.mapLayer)
					break
				case 'googlewx':
					this.mapLayer = new TileLayer({
						source: this.googlewx,
						projection: this.proj
					})
					this.map.addLayer(this.mapLayer)
					break
				case 'tdtdz':
					this.mapLayer = new TileLayer({
						source: this.tdtdz,
						projection: this.proj
					})
					this.mapLayerlabel = new TileLayer({
						source: this.tdtlabeldz,
						projection: this.proj
					})
					this.map.addLayer(this.mapLayer)
					this.map.addLayer(this.mapLayerlabel)
					break
				case 'tdtwx':
					this.mapLayer = new TileLayer({
						source: this.tdtwx,
						projection: this.proj
					})
					this.mapLayerlabel = new TileLayer({
						source: this.tdtlabelwx,
						projection: this.proj
					})
					this.map.addLayer(this.mapLayer)
					this.map.addLayer(this.mapLayerlabel)
					break
				case 'gaodedz':
					this.mapLayer = new TileLayer({
						source: this.gaodedz,
						projection: this.proj
					})
					this.map.addLayer(this.mapLayer)
					break
				case 'gaodewx':
					this.mapLayer = new TileLayer({
						source: this.gaodewx,
						projection: this.proj
					})
					this.mapLayerlabel = new TileLayer({
						source: this.gaodelabelwx,
						projection: this.proj
					})
					this.map.addLayer(this.mapLayer)
					this.map.addLayer(this.mapLayerlabel)
					break
				case 'baidudz':
					this.mapLayer = new TileLayer({
						source: this.baidudz,
						projection: this.proj
					})
					this.map.addLayer(this.mapLayer)
					break
				case 'baiduwx':
					this.mapLayer = new TileLayer({
						source: this.baiduwx,
						projection: this.proj
					})
					this.mapLayerlabel = new TileLayer({
						source: this.baidulabelwx,
						projection: this.proj
					})
					this.map.addLayer(this.mapLayer)
					this.map.addLayer(this.mapLayerlabel)
					break
				case 'qqmapdz':
					this.mapLayer = new TileLayer({
						source: this.qqmapdz,
						projection: this.proj
					})
					this.map.addLayer(this.mapLayer)
					break
				case 'qqmapdx':
					this.mapLayer = new TileLayer({
						source: this.qqmapdx,
						projection: this.proj
					})
					this.mapLayerlabel = new TileLayer({
						source: this.qqmaplabledx,
						projection: this.proj
					})
					this.map.addLayer(this.mapLayer)
					this.map.addLayer(this.mapLayerlabel)
					break
				case 'qqmapwx':
					this.mapLayer = new TileLayer({
						source: this.qqmapwx,
						projection: this.proj
					})
					this.mapLayerlabel = new TileLayer({
						source: this.qqmaplablewx,
						projection: this.proj
					})
					this.map.addLayer(this.mapLayer)
					this.map.addLayer(this.mapLayerlabel)
					break
				case 'geoqcs':
					this.mapLayer = new TileLayer({
						source: this.geoqcs,
						projection: this.proj
					})
					this.map.addLayer(this.mapLayer)
					break
				case 'geoqns':
					this.mapLayer = new TileLayer({
						source: this.geoqns,
						projection: this.proj
					})
					this.map.addLayer(this.mapLayer)
					break
				case 'geoqhs':
					this.mapLayer = new TileLayer({
						source: this.geoqhs,
						projection: this.proj
					})
					this.map.addLayer(this.mapLayer)
					break
				case 'geoqlh':
					this.mapLayer = new TileLayer({
						source: this.geoqlh,
						projection: this.proj
					})
					this.map.addLayer(this.mapLayer)
					break
			}
		},
		
		wfsEdit: function(){
			let modify = new Modify({
				source: this.source
			})
			this.map.addInteraction(modify)
		},

		addInteractions: function(value){
			this.draw = new Draw({
				source: this.source,
				type: value
			})
			this.map.addInteraction(this.draw)
			this.snap = new Snap({
				source: this.source
			})
			this.map.addInteraction(this.snap)
		},
        
        selectGeometry: function(value){
			console.log(value)
			if(this.draw){
				this.map.removeInteraction(this.draw);
        		this.map.removeInteraction(this.snap);
			}
			
			if(this.checked){
				this.wfsEdit()
				this.addInteractions(value)
			} else {
				alert('请启动编辑')
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
.geometryType {
	position: absolute;
	top: 3%;
	right: 16%;
	z-index: 2;
}
.isedit{
    position: absolute;
	top: 4%;
	right: 30%;
	z-index: 2;
}
</style>
