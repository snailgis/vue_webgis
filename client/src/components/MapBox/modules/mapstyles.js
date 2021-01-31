// 地图底图资源数据
let baseMapUrl = {
    source_tdtimg_tiles: {
        "type": "raster",
        "tiles": [`http://t${Math.floor(Math.random()*7 + 1)}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=5730f1a9e7de7c8f39c7e45725b863da`],
        "tileSize": 256,
    },
    source_tdtcia_tiles: {
        "type": "raster",
        "tiles": [`http://t${Math.floor(Math.random()*7 + 1)}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=5730f1a9e7de7c8f39c7e45725b863da`],
        "tileSize": 256,
    },
    source_tdtvec_tiles: {
        "type": "raster",
        "tiles": [`http://t${Math.floor(Math.random()*7 + 1)}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=5730f1a9e7de7c8f39c7e45725b863da`],
        "tileSize": 256,
    },
    source_tdtcva_tiles: {
        "type": "raster",
        "tiles": [`http://t${Math.floor(Math.random()*7 + 1)}.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=5730f1a9e7de7c8f39c7e45725b863da`],
        "tileSize": 256,
    },
    source_tdtter_tiles: {
        "type": "raster",
        "tiles": [`http://t${Math.floor(Math.random()*7 + 1)}.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=5730f1a9e7de7c8f39c7e45725b863da`],
        "tileSize": 256,
    },
    source_tdtcta_tiles: {
        "type": "raster",
        "tiles": [`http://t${Math.floor(Math.random()*7 + 1)}.tianditu.com/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=5730f1a9e7de7c8f39c7e45725b863da`],
        "tileSize": 256,
    },
    source_googleimg_tiles: {
        "type": "raster",
        "tiles": ['https://mt1.google.cn/maps/vt?lyrs=s,m&hl=zh-CN&gl=CN&x={x}&y={y}&z={z}'],
        "tileSize": 256,
    }
}

let baseLayerConfig = {
    tdtimg_tiles: {
        "id": "tdtimg_tiles",
        "type": "raster",
        "source": "source_tdtimg_tiles",
        'layout': {
            'visibility': 'visible'
        },
        "minzoom": 0,
        "maxzoom": 19
    },
    tdtcia_tiles: {
        "id": "tdtcia_tiles",
        "type": "raster",
        "source": "source_tdtcia_tiles",
        'layout': {
            'visibility': 'visible'
        },
        "minzoom": 0,
        "maxzoom": 19
    },
    tdtvec_tiles: {
        "id": "tdtvec_tiles",
        "type": "raster",
        "source": "source_tdtvec_tiles",
        'layout': {
            'visibility': 'visible'
        },
        "minzoom": 0,
        "maxzoom": 19
    },
    tdtcva_tiles: {
        "id": "tdtcva_tiles",
        "type": "raster",
        "source": "source_tdtcva_tiles",
        'layout': {
            'visibility': 'visible'
        },
        "minzoom": 0,
        "maxzoom": 19
    },
    tdtter_tiles: {
        "id": "tdtter_tiles",
        "type": "raster",
        "source": "source_tdtter_tiles",
        'layout': {
            'visibility': 'none'
        },
        "minzoom": 0,
        "maxzoom": 19
    },
    tdtcta_tiles: {
        "id": "tdtcta_tiles",
        "type": "raster",
        "source": "source_tdtcta_tiles",
        'layout': {
            'visibility': 'none'
        },
        "minzoom": 0,
        "maxzoom": 19
    }
}

let mapLabel = [
    {
        label: '在线天地图',
        options: [
            {
                value: 'tdtdz',
                label: '天地图电子地图'
            },
            {
                value: 'tdtwx',
                label: '天地图卫星图'
            }
        ]
    },
    {
        label: 'MapBox地图',
        options:[
            {
                value: 'mapboxwx',
                label: 'MapBox卫星图'
            },
            {
                value: 'mapboxvec',
                label: 'MapBox自定义地图'
            }
        ]
    },
    // {
    //     label: '智图在线地图（ArcGIS REST）',
    //     options: [
    //         {
    //             value: 'geoqcs',
    //             label: '彩色地图'
    //         },
    //         {
    //             value: 'geoqns',
    //             label: '暖色地图'
    //         },
    //         {
    //             value: 'geoqhs',
    //             label: '灰色地图'
    //         },
    //         {
    //             value: 'geoqlh',
    //             label: '蓝黑地图'
    //         }
    //     ]
    // },
    // {
    //     label: '在线高德地图',
    //     options: [
    //         {
    //             value: 'gaodedz',
    //             label: '高德电子地图'
    //         },
    //         {
    //             value: 'gaodewx',
    //             label: '高德卫星图'
    //         }
    //     ]
    // },
    // {
    //     label: '在线腾讯地图',
    //     options: [
    //         {
    //             value: 'qqmapdz',
    //             label: '腾讯电子地图'
    //         },
    //         {
    //             value: 'qqmapdx',
    //             label: '腾讯地形图'
    //         },
    //         {
    //             value: 'qqmapwx',
    //             label: '腾讯卫星图'
    //         }
    //     ]
    // },
    // {
    //     label: '在线Google地图',
    //     options: [
    //         {
    //             value: 'googledz',
    //             label: '谷歌电子地图'
    //         },
    //         {
    //             value: 'googledx',
    //             label: '谷歌地形图'
    //         },
    //         {
    //             value: 'googlewx',
    //             label: '谷歌卫星图'
    //         }
    //     ]
    // },
    // {
    //     label: '在线百度地图',
    //     options: [
    //         {
    //             value: 'baidudz',
    //             label: '百度电子地图'
    //         },
    //         {
    //             value: 'baiduwx',
    //             label: '百度卫星图'
    //         }
    //     ]
    // },
    // {
    //     label: '智图在线地图（ArcGIS REST）',
    //     options: [
    //         {
    //             value: 'geoqcs',
    //             label: '彩色地图'
    //         },
    //         {
    //             value: 'geoqns',
    //             label: '暖色地图'
    //         },
    //         {
    //             value: 'geoqhs',
    //             label: '灰色地图'
    //         },
    //         {
    //             value: 'geoqlh',
    //             label: '蓝黑地图'
    //         }
    //     ]
    // },
    // {
    //     label: '离线地图'
    // }
]

let maplist = {
    mapLabel,
    baseMapUrl: baseMapUrl,
    baseLayerConfig: baseLayerConfig
}

export default maplist
