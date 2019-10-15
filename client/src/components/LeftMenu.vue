<template>
    <el-row class="menu_page">
         <el-col>
             <el-menu mode="vertical" background-color="#324057" text-color="#fff" active-text-color="#409eff" class="el-menu-vertical-demo">
                <router-link to="/home">
                    <el-menu-item index="0">
                        <i class="fa fa-margin fa-server"></i>
                        <i class="el-icon-platform-eleme"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/map">
                    <el-menu-item index='1'>
                        <i class="fa fa-margin fa-server"></i>
                        <i class="el-icon-map-location"></i>
                        <span slot="title">地图门户</span>
                    </el-menu-item>
                </router-link>
                <template  v-for="item in items" >
                    <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                        <template slot="title">
                            <i :class="'fa fa-margin '+item.icon"></i>
                            <i class="el-icon-map-location"></i>
                            <span slot="title">{{item.name}}</span>
                        </template>
                        <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
                            <el-menu-item :index='citem.path'>
                              <i class="el-icon-map-location"></i>
                                <span slot="title">{{citem.name}}</span>
                            </el-menu-item> 
                        </router-link>
                    </el-submenu>
                </template>
             </el-menu>
         </el-col>
    </el-row>
</template>
<script>
export default {
  name: "leftmenu",
  data() {
    return {
      items: [
        {
          icon: "fa-mapbox",
          name: "MapBox",
          path: "mapbox",
          children: [{ path: "Demo 1", name: "Demo 1" }]
        },
        {
          icon: "fa-openlayers",
          name: "Openlayers",
          path: "openlayers",
          children: [
            { path: "ol_superclustermap", name: "聚类" },
            { path: "ol_clustermap", name: "统计聚类" }
          ]
        },
        {
          icon: "fa-arcgis",
          name: "ArcGIS",
          path: "ArcGIS",
          children: [
            { path: "arcgismap", name: "ArcGIS门户地图" },
            { path: "ags_basemap", name: "基础地图"},
            { path: "ags_tilemap", name: "切片地图"},
            { path: "ags_drawmap", name: "绘制要素"}
          ]
        }
      ]
    };
  }
};
</script>
<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>
