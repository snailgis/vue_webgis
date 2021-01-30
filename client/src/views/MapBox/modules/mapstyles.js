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
            'visibility': 'none'
        },
        "minzoom": 0,
        "maxzoom": 18
    },
    tdtcia_tiles: {
        "id": "tdtcia_tiles",
        "type": "raster",
        "source": "source_tdtcia_tiles",
        'layout': {
            'visibility': 'none'
        },
        "minzoom": 0,
        "maxzoom": 18
    },
    tdtvec_tiles: {
        "id": "tdtvec_tiles",
        "type": "raster",
        "source": "source_tdtvec_tiles",
        'layout': {
            'visibility': 'visible'
        },
        "minzoom": 0,
        "maxzoom": 18
    },
    tdtcva_tiles: {
        "id": "tdtcva_tiles",
        "type": "raster",
        "source": "source_tdtcva_tiles",
        'layout': {
            'visibility': 'visible'
        },
        "minzoom": 0,
        "maxzoom": 18
    },
    tdtter_tiles: {
        "id": "tdtter_tiles",
        "type": "raster",
        "source": "source_tdtter_tiles",
        'layout': {
            'visibility': 'none'
        },
        "minzoom": 0,
        "maxzoom": 18
    },
    tdtcta_tiles: {
        "id": "tdtcta_tiles",
        "type": "raster",
        "source": "source_tdtcta_tiles",
        'layout': {
            'visibility': 'none'
        },
        "minzoom": 0,
        "maxzoom": 18
    }
}


let maplist = {
    baseMapUrl: baseMapUrl,
    baseLayerConfig: baseLayerConfig
}

export default maplist
