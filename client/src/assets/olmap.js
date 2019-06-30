import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import {OSM, TileArcGISRest} from 'ol/source.js';

var url = 'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/' +
    'Specialty/ESRI_StateCityHighway_USA/MapServer';

var layers = [
  new TileLayer({
    source: new OSM()
  }),
  new TileLayer({
    extent: [-13884991, 2870341, -7455066, 6338219],
    source: new TileArcGISRest({
      url: url
    })
  })
];
var map = new Map({
  layers: layers,
  target: 'map',
  view: new View({
    center: [-10997148, 4569099],
    zoom: 4
  })
});