<template>
  <el-select
    class="mapselect"
    v-model="value"
    placeholder="切换地图底图"
    @change="changeBaseMap(value)"
  >
    <el-option-group
      v-for="group in options"
      :key="group.label"
      :label="group.label"
    >
      <el-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-option-group>
  </el-select>
</template>

<script>
import mapSources from './modules/mapstyles'
export default {
    props: {
        map: Object
    },
    data() {
		return {
            options: mapSources.mapLabel,
            value: '',
		}
    },

    methods:{
        changeBaseMap(value){
            console.log(value)
            let style
			switch (value) {
				case 'mapboxwx':
                    style = 'mapbox://styles/mapbox/satellite-v9'
                    this.map.setStyle(style);
                    break;
                case 'mapboxvec':
                    style = 'mapbox://styles/snailgis/ckarq4x7c25rs1io2bdg7iv6t',
                    this.map.setStyle(style);
                    break;
                case 'tdtdz':
                    style = {
                        version: 8,
                        glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
                        sources: {
                            source_tdtvec_tiles: mapSources.baseMapUrl.source_tdtvec_tiles,
                            source_tdtcva_tiles: mapSources.baseMapUrl.source_tdtcva_tiles
                        },
                        layers: [
                            mapSources.baseLayerConfig.tdtvec_tiles,
                            mapSources.baseLayerConfig.tdtcva_tiles
                        ]
                    }
                    this.map.setStyle(style);
                    break;
                case 'tdtwx':
                    style = {
                        version: 8,
                        glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
                        sources: {
                            source_tdtimg_tiles: mapSources.baseMapUrl.source_tdtimg_tiles,
                            source_tdtcia_tiles: mapSources.baseMapUrl.source_tdtcia_tiles
                        },
                        layers: [
                            mapSources.baseLayerConfig.tdtimg_tiles,
                            mapSources.baseLayerConfig.tdtcia_tiles
                        ]
                    }
                    this.map.setStyle(style);
                    break;
            }
        }
    }
}
</script>

<style scoped>
.mapselect {
  position: absolute;
  top: 3%;
  right: 2%;
  z-index: 2;
}
</style>