<template>
    <div id="viewDiv" style="width: 100%;height: 100%;">
      <div style="position:absolute;top:160px;left:244px;z-index:100;" title="Draw and measure point">
        <span id="pointButton" class="action-button esri-icon-blank-map-pin esri-widget-button esri-widget esri-interactive" type="button"></span>
        <span id="polygonButton" class="action-button esri-icon-polygon esri-widget-button esri-widget esri-interactive" type="button"></span>
        <span id="rectangleButton" class="action-button esri-icon-checkbox-unchecked esri-widget-button esri-widget esri-interactive"
          type="button"></span>
        <span id="circleButton" class="action-button esri-icon-radio-unchecked esri-widget-button esri-widget esri-interactive" type="button"></span>
        <span id="ellipseButton" class="action-button esri-icon-hollow-eye esri-widget-button esri-widget esri-interactive" type="button"></span>
        <span id="triangleButton" class="action-button esri-icon-up-arrow esri-widget-button esri-widget esri-interactive" type="button"></span>
        <el-button id="savePosition" type="primary" style="padding:10px;" size="mini" icon="el-icon-check"></el-button>
      </div>
    </div>
</template>

<script>
import * as esriLoader from 'esri-loader'
export default {
  name: 'drawModel',
  data () {
    return {
      map: null,
      view: null
    }
  },
  mounted () {
    this.createMap()
  },
  methods: {
    createMap () {
      // 引入依赖
      esriLoader.loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/layers/GraphicsLayer',
        'esri/widgets/Sketch/SketchViewModel',
        'esri/Graphic'
      ]).then(([EsriMap, MapView, GraphicsLayer, SketchViewModel, Graphic]) => {
        this.map = new EsriMap({
          basemap: 'streets'
        })
        let updateGraphic
        let tempGraphicsLayer = new GraphicsLayer()
        this.map.add(tempGraphicsLayer, 1)
        let view = new MapView({
          container: 'viewDiv',
          center: [121.27189573730267, 30.8419595372876],
          zoom: 3,
          map: this.map
        })
        let pointSymbol = { // symbol used for points
          type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
          style: 'square',
          color: '#8A2BE2',
          size: '20px',
          outline: { // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: 3 // points
          }
        }
        // let pointSymbol = {
        //   type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
        //   url:  'static/img/elecMap/alarm.png',
        //   width: '40px',
        //   height: '40px'
        // }
        let polygonSymbol = { // symbol used for polygons
          type: 'simple-fill', // autocasts as new SimpleFillSymbol()
          color: 'rgba(138,43,226, 0.8)',
          style: 'solid',
          outline: {
            color: 'white',
            width: 1
          }
        }
        let rings = [
          [106818.53686366824, 89768.69741585237],
          [114028.44711682208, 89768.69741585237],
          [114028.44711682208, 86626.7640486523],
          [106818.53686366824, 86626.7640486523],
          [106818.53686366824, 89768.69741585237]
        ]
        addGraphic({
          geometry: {
            rings: rings,
            type: 'polygon',
            spatialReference: {
              wkid: 26911
            }
          }
        })
        view.when(function (evt) {
          let sketchViewModel = new SketchViewModel({
            view: view,
            layer: tempGraphicsLayer,
            pointSymbol: pointSymbol,
            polygonSymbol: polygonSymbol
          })
          let savePosition = document.getElementById('savePosition')
          savePosition.addEventListener('click', function () {
            alert('保存')
            console.log('savePosition')
            console.log(tempGraphicsLayer.graphics.items)
          })
          setUpClickHandler()
          sketchViewModel.on('draw-complete', addGraphic)
          sketchViewModel.on('update-complete', addGraphic)
          sketchViewModel.on('update-cancel', addGraphic)
          let drawPointButton = document.getElementById('pointButton')
          let drawPolygonButton = document.getElementById('polygonButton')
          let drawRectangleButton = document.getElementById('rectangleButton')
          let drawCircleButton = document.getElementById('circleButton')
          let drawEllipseButton = document.getElementById('ellipseButton')
          let drawTriangleButton = document.getElementById('triangleButton')
          clickButton(drawPointButton, 'point')
          clickButton(drawPolygonButton, 'polygon')
          clickButton(drawRectangleButton, 'rectangle')
          clickButton(drawCircleButton, 'circle')
          clickButton(drawEllipseButton, 'ellipse')
          clickButton(drawTriangleButton, 'triangle')
          function clickButton (button, type) {
            button.onclick = function () {
              sketchViewModel.reset()
              tempGraphicsLayer.removeAll()
              sketchViewModel.create(type)
              setActiveButton(this)
            }
          }
          function setActiveButton (selectedButton) {
            view.focus()
            let elements = document.getElementsByClassName('active')
            for (let i = 0; i < elements.length; i++) {
              elements[i].classList.remove('active')
            }
            if (selectedButton) {
              selectedButton.classList.add('active')
            }
          }
          function setUpClickHandler () {
            view.on('click', function (evt) {
              view.hitTest(evt).then(function (response) {
                let results = response.results
                if (results.length && results[results.length - 1].graphic) {
                  if (!updateGraphic) {
                    updateGraphic = results[results.length - 1].graphic
                    tempGraphicsLayer.remove(updateGraphic)
                    sketchViewModel.update(updateGraphic.geometry)
                  }
                }
              })
            })
          }
        })
        function addGraphic (evt) {
          let geometry = evt.geometry
          let symbol
          if (geometry.type === 'point') {
            symbol = pointSymbol
          } else {
            symbol = polygonSymbol
          }
          let graphic = new Graphic({
            geometry: geometry,
            symbol: symbol
          })
          tempGraphicsLayer.add(graphic)
          updateGraphic = null
        }
      })
    }
  }
}
</script>

<style scoped>
  @import url('http://fp1.xys.gov.cn/arcgis_js_api/library/4.11/esri/css/main.css');

  #viewDiv {
    height: 900px;
    width: 100%;
    z-index: -1;
  }
  .action-button {
    font-size: 16px;
    background-color: white;
    border: 1px solid #D3D3D3;
    color: #6e6e6e;
    height: 32px;
    width: 32px;
    text-align: center;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
  }

  .action-button:hover,
  .action-button:focus {
    background: #0079c1;
    color: #e4e4e4;
  }
</style>
