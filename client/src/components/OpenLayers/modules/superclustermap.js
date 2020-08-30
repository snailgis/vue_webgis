import $ from 'jquery'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Cluster from 'ol/source/Cluster'
import { Circle as CircleStyle, Fill, Icon, Stroke, Style, Text } from 'ol/style'

import jsondata from '../../../assets/data/town.json'

let features = []

// $.ajax({
//     async: false,
//     url: jsondata,
//     type: 'get',
//     dataType: 'json',
//     success: function (geodata) {
//         for (let i = 0; i < geodata.length; i++) {
//             features[i] = new Feature(new Point([parseFloat(geodata[i].lng), parseFloat(geodata[i].lat)]))
//             features[i].set('id', geodata[i].area_code)
//             features[i].set('name', geodata[i].short_name)
//         }
//     },
//     error: function (err) {
//         console.log(err)
//     }
// })

for (let i = 0; i < jsondata.length; i++) {
    features[i] = new Feature(new Point([parseFloat(jsondata[i].lng), parseFloat(jsondata[i].lat)]))
    features[i].set('id', jsondata[i].area_code)
    features[i].set('name', jsondata[i].short_name)
}

let source = new VectorSource({
    features: features
})

let clusterSource = new Cluster({
    distance: 60,
    source: source
})

function creatClusterLayer() {
    return new VectorLayer({
        source: clusterSource,
        style: createClusterIcon
    })
}

const iconStyle = new Style({
    image: new Icon(({
        anchor: [0.5, 40],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'http://cdn.leafletjs.com/leaflet/v1.0.0-beta.2/images/marker-icon.png'
    }))
})

// const textStroke = new Stroke({
//   color: '#fff',
//   width: 1
// })

const textFill = new Fill({
    color: '#000'
})

const clusterStylesConfig = {
    'small': {
        rgba_bg: [181, 226, 140, 0.7],
        rgba_fg: [110, 204, 57, 0.7]
    },
    'medium': {
        rgba_bg: [241, 211, 87, 0.7],
        rgba_fg: [240, 194, 12, 0.7]
    },
    'large': {
        rgba_bg: [253, 156, 115, 0.7],
        rgba_fg: [241, 128, 23, 0.7]
    }
}

function createClusterIcon(feature) {
    if (feature.get('features').length === 1) {
        return iconStyle
    } else {
        let count = feature.get('features').length
        let size = count < 50 ? 'small' : count < 200 ? 'medium' : 'large'
        return [
            new Style({
                image: new CircleStyle({
                    radius: 20,
                    fill: new Fill({
                        color: `rgba(${clusterStylesConfig[size].rgba_bg.join(',')})`
                    })
                })
            }),
            new Style({
                image: new CircleStyle({
                    radius: 15,
                    fill: new Fill({
                        color: `rgba(${clusterStylesConfig[size].rgba_fg.join(',')})`
                    })
                }),
                text: new Text({
                    font: '12px "Helvetica Neue", Arial, Helvetica, sans-serif',
                    text: `${feature.get('features').length}`,
                    fill: textFill
                })
            })
        ]
    }
}

let mapsupercluster = {
    clusterLayer: creatClusterLayer
}

export default mapsupercluster
