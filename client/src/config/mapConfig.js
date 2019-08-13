/*
arcgis初始化配置
*/
export function arcgisConfig () {
    window.arcgis = {
      config: {
        proxyUrl: 'http://fp1.xys.gov.cn/arcgis_js_api/library/4.11/init.js',
        baseUrl: 'http://fp1.xys.gov.cn/arcgis_js_api/library/4.11/init.js',
        dojoUrl: 'http://fp1.xys.gov.cn/arcgis_js_api/library/4.11/dojo',
        offlineMapWkid: 26911,
        getBaseUrl: function () {
          return this.baseUrl
        },
        getDojoUrl: function () {
          return this.dojoUrl
        },
        getWkid: function () {
          return this.offlineMapWkid
        }
      }
    }
  }