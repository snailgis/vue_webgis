<template>
  <div id="olmap" ref="olmap" style="width: 100%; height: 100%;">
    <el-select class="mapselect" v-model="value" placeholder="请选择地图" @change="changeBaseMap(value)">
      <el-option-group v-for="group in options" :key="group.label" :label="group.label">
        <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-option-group>
    </el-select>
  </div>
</template>

<script>
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { OSM, TileArcGISRest } from "ol/source";
import XYZ from "ol/source/XYZ";
import { transform } from "ol/proj";


export default {
  components: {},
  data() {
    return {
      options: [
        {
          label: "在线Google地图",
          options: [
            {
              value: "googledz",
              label: "谷歌电子地图"
            },
            {
              value: "googledx",
              label: "谷歌地形图"
            },
            {
              value: "googlewx",
              label: "谷歌卫星图"
            }
          ]
        },
        {
          label: "在线天地图",
          options: [
            {
              value: "tdtdz",
              label: "天地图电子地图"
            },
            {
              value: "tdtwx",
              label: "天地图卫星图"
            }
          ]
        },
        {
          label: "在线百度地图",
          options: [
            {
              value: "baidudz",
              label: "百度电子地图"
            },
            {
              value: "baiduwx",
              label: "百度卫星图"
            }
          ]
        },
        {
          label: "在线高德地图",
          options: [
            {
              value: "gaodedz",
              label: "高德电子地图"
            },
            {
              value: "gaodewx",
              label: "高德卫星图"
            }
          ]
        },
        {
          label: "在线腾讯地图",
          options: [
            {
              value: "qqmapdz",
              label: "腾讯电子地图"
            },
            {
              value: "qqmapdx",
              label: "腾讯地形图"
            },
            {
              value: "qqmapwx",
              label: "腾讯卫星图"
            }
          ]
        },
        {
            label: '离线地图'
        }
      ],
      value: "",
      googledz: new XYZ({
        tileUrlFunction: function (tileCoord) {
            if (tileCoord) {
                var z = tileCoord[0];
                var x = tileCoord[1];
                var y = -tileCoord[2] - 1;
                var s = "Galileo".substring(0, ((3 * x + y) % 8));
                return "http://mt" + (x % 4) + ".google.cn/vt/lyrs=m&hl=zh-CN&gl=cn&" + "x=" + x + "&" + "y=" + y + "&" + "z=" + z + "&" + "s=" + s;
            } else {
                return '';
            }
        }
      }),
      googledz: new XYZ({
        tileUrlFunction: function (tileCoord) {
            if (tileCoord) {
                var z = tileCoord[0];
                var x = tileCoord[1];
                var y = -tileCoord[2] - 1;
                var s = "Galileo".substring(0, ((3 * x + y) % 8));
                return "http://mt" + (x % 4) + ".google.cn/vt/lyrs=t,m&hl=zh-CN&gl=cn&" + "x=" + x + "&" + "y=" + y + "&" + "z=" + z + "&" + "s=" + s;
            } else {
                return '';
            }
        }
      }),
      proj: "EPSG:4326",//定义wgs84地图坐标系
      proj_m: "EPSG:3857", //定义墨卡托地图坐标系
      map: null,
      mapLayer: null,
      mapLayerlabel: null,
    };
  },
  created() {
    //this.createMap()
  },
  methods: {
    /******************地图切换方法***************/
     changeBaseMap: function(value) {
          console.log(value)
          this.mapLayer.setSource(this.value);
          // var cnt = sourcelist.length;
          // if (1 == cnt) {
          //     mapLayer.setSource(sourcelist[0]);
          //     mapLayerlabel.setSource(null);
          // } else if (2 == cnt) {
          //     mapLayer.setSource(sourcelist[0]);
          //     mapLayerlabel.setSource(sourcelist[1]);
          // }
        }
  },
  mounted() {
      //初始化map对象
      let map = new Map({
        target: "olmap",
        projection: this.proj,
        //interactions: ol.interaction.defaults().extend([mapDragInteraction]),
        view: new View({
          center: transform([101.46912, 36.24274], this.proj, this.proj_m),
          zoom: 5
        })
      });

      //初始化地图图层
      let mapLayer = new TileLayer({
        source: this.googledz,
        projection: this.proj
      });
      //初始化标签图层
      let mapLayerlabel = new TileLayer({
        source: null,
        projection: this.proj
      });
      //将图层加载到地图对象
      map.addLayer(mapLayer);
      map.addLayer(mapLayerlabel);
    }
};
</script>

<style scoped>
#olmap{
    position: relative;
    z-index:1;
}
.mapselect {
    position: absolute;
    top: 3%;
    right: 2%;
    z-index:2;
}
</style>
