import TileLayer from "ol/layer/Tile"
import TileArcGISRest from 'ol/source/TileArcGISRest'
import OSM from "ol/source/OSM"
import XYZ from 'ol/source/XYZ'
import TileGrid from 'ol/tilegrid/TileGrid';

let maptype = 2          //0表示部署的离线瓦片地图，1表示OSM,2表示使用Arcgis在线午夜蓝地图服务

// // 瓦片地址格式：http://localhost:6080/arcgis/rest/services/Test/Beijing/MapServer/tile/{z}/{y}/{x}
// var tileUrl = 'http://1.85.55.27:8080/YouMapServer/rest/service/SxImgMap/bhDH52tgCaAb4gHY/TileServer/tile/{z}/{y}/{x}';
// var labelUrl = 'http://1.85.55.27:8080/YouMapServer/rest/service/SxImgLabelMap/z3WB1K-Q0-mooFCE/TileServer/tile/{z}/{y}/{x}';
// var lineXY = 'http://61.185.20.93:6080/arcgis/rest/services/Tiled/XY_cityline/MapServer';
// // var boundaryYA = 'http://61.185.20.93:6080/arcgis/rest/services/YA/ya_city/MapServer';
// // 原点
// var origin = [-180.0, 90.0];
// // 陕西省天地图切片规则，各级分辨率
// var resolutions = [
//     0.7031250000000002,
//     0.3515625000000001,
//     0.17578125000000006,
//     0.08789062500000003,
//     0.043945312500000014,
//     0.021972656250000007,
//     0.010986328125000003,
//     0.005493164062500002,
//     0.002746582031250001,
//     0.0013732910156250004,
//     6.866455078125002E-4,
//     3.433227539062501E-4,
//     1.7166137695312505E-4,
//     8.583068847656253E-5,
//     4.2915344238281264E-5,
//     2.1457672119140632E-5,
//     1.0728836059570316E-5,
//     5.364418029785158E-6
// ];
// // 地图范围
// var fullExtent = [105.19853885495007, 31.312057507500036, 111.52969936205008, 39.97945971250004];
// var tileGrid = new TileGrid({
//     tileSize: 256,
//     origin: origin,
//     extent: fullExtent,
//     resolutions: resolutions
// });
// // 瓦片数据源
// var tileArcGISXYZ = new XYZ({
//     tileGrid: tileGrid,
//     projection: 'EPSG:4326',
//     url: tileUrl
// });
// var labelArcGISXYZ = new XYZ({
//     tileGrid: tileGrid,
//     projection: 'EPSG:4326',
//     url: labelUrl
// });

// var getMaplayer = function(){
//     let maplayer = []
//     maplayer.push(
//         new TileLayer({
//             source: tileArcGISXYZ
//         }),
//         new TileLayer({
//             source: labelArcGISXYZ
//         })
//     )
//     return maplayer
// }
// ArcGIS图层
// var yaArcGISRest = new ol.source.TileArcGISRest({
//     url: lineXY
// });

var streetmap = function () {
    var maplayer = null;
    switch (maptype) {
        case 0:
            maplayer = new TileLayer({
                source: new XYZ({
                    url: 'http://127.0.0.1:7080/streetmap/shenzhen/{z}/{x}/{y}.jpg'
                })
            })
            break;
        case 1:
            maplayer = new TileLayer({
                source: new OSM()
            })
            break;
        case 2:
            maplayer = new TileLayer({
                source: new TileArcGISRest({
                    url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer'
                })
            })
            break;
    }
    return [maplayer];
}

var tileMap = new TileLayer({
    source: new XYZ({
        url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}'
    })
})

var tdt = new TileLayer({
    source: new XYZ({
        url: 'http://t4.tianditu.gov.cn/DataServer?tk=5730f1a9e7de7c8f39c7e45725b863da&T=vec_c&x={x}&y={y}&l={z}' 
    })
})

var mapconfig = {
    x: 108.40,     //中心点经度和纬度
    y: 35.75,
    zoom: 7,          //地图缩放级别
    streetmap: streetmap,
    tilemap: tileMap
};

export default mapconfig