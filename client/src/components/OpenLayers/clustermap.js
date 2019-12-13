import $ from 'jquery'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Icon, Text, Fill, Stroke, Circle, Style } from 'ol/style'

function getDataByAPI(level, minlon, maxlon, minlat, maxlat, callback) {
    let dataArray = []
    let baseUrl = ``
    $.ajax({
        async: false,
        url: baseUrl,
        dataType: 'json',
        type: 'get',
        success: function(data) {
            if (data) {
                callback(data)
            }
        },
        error: function(err) {
            console.log(err)
        }
    })
    return dataArray
}

function getDataByExtent(extent, zoom) {
    let minlon = extent[0]
    let minlat = extent[1]
    let maxlon = extent[2]
    let maxlat = extent[3]
    let markers = []
    if (zoom < 9) {
        getDataByAPI(2, minlon, maxlon, minlat, maxlat, function(res) {
            let data = res.data
            for (let i = 0; i < data.length; i++) {
                markers[i] = {
                    lon: data[i].wgsLng,
                    lat: data[i].wgsLat,
                    count: data[i].total,
                    value: data[i].areaName,
                    level: 0
                }
            }
        })
    } else if (zoom >= 9 && zoom < 11) {
        getDataByAPI(3, minlon, maxlon, minlat, maxlat, function(res) {
            let data = res.data
            for (let i = 0; i < data.length; i++) {
                markers[i] = {
                    lon: data[i].wgsLng,
                    lat: data[i].wgsLat,
                    count: data[i].total,
                    value: data[i].areaName,
                    level: 1
                }
            }
        })
    } else if (zoom >= 11 && zoom < 13) {
        getDataByAPI(4, minlon, maxlon, minlat, maxlat, function(res) {
            let data = res.data
            for (let i = 0; i < data.length; i++) {
                markers[i] = {
                    lon: data[i].wgsLng,
                    lat: data[i].wgsLat,
                    count: data[i].total,
                    value: data[i].areaName,
                    level: 2
                }
            }
        })
    } else if (zoom >= 13 && zoom < 15) {
        getDataByAPI(5, minlon, maxlon, minlat, maxlat, function(res) {
            let data = res.data
            for (let i = 0; i < data.length; i++) {
                markers[i] = {
                    lon: data[i].wgsLng,
                    lat: data[i].wgsLat,
                    count: data[i].total,
                    value: data[i].areaName,
                    level: 3
                }
            }
        })
    } else if (zoom >= 15) {
        getDataByAPI(6, minlon, maxlon, minlat, maxlat, function(res) {
            let data = res.data
            for (let i = 0; i < data.length; i++) {
                markers[i] = {
                    lon: data[i].wgsLng,
                    lat: data[i].wgsLat,
                    key: data[i].id,
                    value: data[i].houseName,
                    poorOffFlag: data[i].mark,
                    level: 4
                }
            }
        })
    }
    return markers
}

function addMarkers(markers) {
    let features = []
    for (let i in markers) {
        let _markers = markers[i]
        let pointX = parseFloat(_markers.lon)
        let pointY = parseFloat(_markers.lat)
        let _feature = new Feature({
            geometry: new Point([pointX, pointY]),
            value: _markers
        })
        let styles = []
        if (_markers.level == 4) {
            let poorOffFlag = _markers.poorOffFlag
            if (poorOffFlag == 0) {
                styles.push(
                    new Style({
                        image: new Icon({
                            // src: '../assets/img/locationRed.png',
                            src: '',
                            anchor: [0.5, 1.0]
                        }),
                        text: new Text({
                            textAlign: 'center', //位置
                            textBaseline: 'middle', //基准线
                            font: 'normal 14px 微软雅黑', //文字样式
                            text: _markers.value, //文本内容
                            fill: new Fill({
                                //文本填充样式（即文字颜色)
                                color: '#F4F4F4'
                            }),
                            stroke: new Stroke({
                                color: '#696969',
                                width: 1
                            }),
                            offsetY: -36
                        })
                    })
                )
            } else {
                styles.push(
                    new Style({
                        image: new Icon({
                            // src: '../assets/img/locationGreen.png',
                            src: '',
                            anchor: [0.5, 1.0]
                        }),
                        text: new Text({
                            textAlign: 'center', //位置
                            textBaseline: 'middle', //基准线
                            font: 'normal 14px 微软雅黑', //文字样式
                            text: _markers.value, //文本内容
                            fill: new Fill({
                                //文本填充样式（即文字颜色)
                                color: '#F4F4F4'
                            }),
                            stroke: new Stroke({
                                color: '#696969',
                                width: 1
                            }),
                            offsetY: -36
                        })
                    })
                )
            }
            _feature.setStyle(styles)
            features.push(_feature)
        } else {
            styles.push(
                new Style({
                    image: new Circle({
                        radius: 36,
                        fill: new Fill({
                            color: '#1C8FFC'
                        }),
                        stroke: new Stroke({
                            color: '#E4F4F4',
                            width: 1.5
                        })
                    }),
                    text: new Text({
                        text: _markers.value,
                        fill: new Fill({
                            color: '#E4F4F4'
                        }),
                        textAlign: 'center',
                        textBaseline: 'middle',
                        font: '12px sans-serif',
                        offsetY: -8
                    })
                })
            )
            styles.push(
                new Style({
                    geometry: _feature.geometry,
                    text: new Text({
                        text: '共' + _markers.count.toString() + '人',
                        textAlign: 'center',
                        textBaseline: 'middle',
                        font: '12px sans-serif',
                        offsetY: 10,
                        fill: new Fill({
                            color: '#fff'
                        })
                    })
                })
            )
            //feature setStyle()可以添加单个样式，样式组Array和FeatureStyleFunction
            _feature.setStyle(styles)
            features.push(_feature)
        }
    }
    let vectorSource = new VectorSource({
        features: features
    })
    return new VectorLayer({
        source: vectorSource
    })
}

let mapcluster = {
    getDataByExtent: getDataByExtent,
    creatLayer: addMarkers
}
  
export default mapcluster

