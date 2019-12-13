/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import XYZ from "ol/source/XYZ";

// let source_google, source_googledx, source_googlesat; //定义Google地图源地址
// var source_baidu, source_baidusat, source_baidusatlabel;  //定义百度地图原地址
// var source_qq, source_qqdx, source_qqdxlabel, source_qqsat, source_qqsatlabel;  //定义腾讯soso地图源地址
// var source_gaode, source_gaodesat, source_gaodesatlabel;  //定义高德地图源地址
// var source_tiandi, source_tiandisat, source_tiandilabel;  //定义天地图源地址
// var source_arcgis_offline, source_argissat_offline;   //加载离线arcgis瓦片格式地图
// var source_sqlite_offline, source_sqlitesat_offline;  //加载离线sqlite数据库地图

//********************加载在线Google电子地图*************************//
let source_google = new XYZ({
    tileUrlFunction: function (tileCoord) {
        if (tileCoord) {
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            var s = "Galileo".substring(0, ((3 * x + y) % 8));
            return "http://mt" + (x % 4) + ".google.cn/vt/lyrs=m&hl=zh-CN&gl=cn&" + "x=" + x + "&" + "y=" + y + "&" + "z=" + z + "&" + "s=" + s;
        } else {
            return '';
        }
    }
});

//********************加载在线Google地形图*************************//
let source_googledx = new XYZ({
    tileUrlFunction: function (tileCoord) {
        if (tileCoord) {
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            var s = "Galileo".substring(0, ((3 * x + y) % 8));
            return "http://mt" + (x % 4) + ".google.cn/vt/lyrs=t,m&hl=zh-CN&gl=cn&" + "x=" + x + "&" + "y=" + y + "&" + "z=" + z + "&" + "s=" + s;
        } else {
            return '';
        }
    }
});

//********************加载在线Google卫星影像地图*************************//
let source_googlesat = new XYZ({
    tileUrlFunction: function (tileCoord) {
        if (tileCoord) {
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            var s = "Galileo".substring(0, ((3 * x + y) % 8));
            return "http://mt" + (x % 4) + ".google.cn/vt/lyrs=s,m&hl=zh-CN&gl=cn&" + "x=" + x + "&" + "y=" + y + "&" + "z=" + z + "&" + "s=" + s;
        } else {
            return '';
        }
    }
});

//********************加载在线腾讯soso电子地图*************************//
let source_qq = new XYZ({
    tileUrlFunction: function (tileCoord) {
        if (tileCoord) {
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            y = parseInt(Math.pow(2, z)) - 1 - y;
            return "http://rt" + (x % 4) + ".map.gtimg.com/realtimerender?z=" + z + "&x=" + x + "&y=" + y + "&type=vector";
        } else {
            return '';
        }
    }
});

//********************加载在线腾讯soso地形图*************************//
let source_qqdx = new XYZ({
    tileUrlFunction: function (tileCoord) {
        if (tileCoord) {
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            y = parseInt(Math.pow(2, z)) - 1 - y;
            return  "http://p" + (x % 4) + ".map.gtimg.com/demTiles/" + z + "/" + Math.floor(x / 16.0) + "/" + Math.floor(y / 16.0) + "/" + x + "_" + y + ".jpg";
        } else {
            return '';
        }
    }
});

let source_qqdxlabel = new XYZ({
    tileUrlFunction: function (tileCoord) {
        if (tileCoord) {
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            y = parseInt(Math.pow(2, z)) - 1 - y;
            return "http://rt" + (x % 4) + ".map.gtimg.com/realtimerender?z=" + z + "&x=" + x + "&y=" + y + "&type=vector&styleid=2";
        } else {
            return '';
        }
    }
});


//********************加载在线腾讯soso卫星影像地图*************************//
let source_qqsat = new XYZ({
    tileUrlFunction: function (tileCoord) {
        if (tileCoord) {
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            y = parseInt(Math.pow(2, z)) - 1 - y;
            return  "http://p" + (x % 4) + ".map.gtimg.com/sateTiles/" + z + "/" + Math.floor(x / 16.0) + "/" + Math.floor(y / 16.0) + "/" + x + "_" + y + ".jpg";
        } else {
            return '';
        }
    }
});

let source_qqsatlabel = new XYZ({
    tileUrlFunction: function (tileCoord) {
        if (tileCoord) {
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            y = parseInt(Math.pow(2, z)) - 1 - y;
            return "http://rt" + (x % 4) + ".map.gtimg.com/realtimerender?z=" + z + "&x=" + x + "&y=" + y + "&type=vector&styleid=1";
        } else {
            return '';
        }
    }
});
//********************加载在线百度地图*************************//
let source_baidu = new XYZ({
    tileUrlFunction: function (tileCoord) {
        if (tileCoord) {
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            var zoom = z - 1;
            var offsetX = parseInt(Math.pow(2, zoom));
            var offsetY = offsetX - 1;
            var numX = x - offsetX, numY = (-y) + offsetY;
            var num = (y + x) % 8 + 1;
            return "http://online" + num + ".map.bdimg.com/tile/?qt=tile&x=" + numX + "&y=" + numY + "&z=" + z + "&styles=pl&scaler=1";
        } else {
            return '';
        }
    }
});

//********************加载在线百度卫星影像地图*************************//
let source_baidusat = new XYZ({
    tileUrlFunction: function (tileCoord) {
        if (tileCoord) {
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            var zoom = z - 1;
            var offsetX = parseInt(Math.pow(2, zoom));
            var offsetY = offsetX - 1;
            var numX = x - offsetX, numY = (-y) + offsetY;
            var num = (y + x) % 8 + 1;
            return "http://shangetu" + num + ".map.bdimg.com/it/u=x=" + numX + ";y=" + numY + ";z=" + z + ";v=009;type=sate&fm=46";
        } else {
            return '';
        }
    }
});

let source_baidusatlabel = new XYZ({
    tileUrlFunction: function (tileCoord) {
        if (tileCoord) {
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            var zoom = z - 1;
            var offsetX = parseInt(Math.pow(2, zoom));
            var offsetY = offsetX - 1;
            var numX = x - offsetX, numY = (-y) + offsetY;
            var num = (y + x) % 8 + 1;
            return "http://online" + num + ".map.bdimg.com/tile/?qt=tile&x=" + numX + "&y=" + numY + "&z=" + z + "&styles=sl";
        } else {
            return '';
        }
    }
});

//********************加载在线高德地图*************************//
let source_gaode = new XYZ({
    url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
});

//********************加载在线高德卫星影像地图*************************//
let source_gaodesat = new XYZ({
    url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x={x}&y={y}&z={z}'
});

let source_gaodesatlabel = new XYZ({
    url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
});

//********************加载在线天地图*************************//
let source_tiandi = new XYZ({
    tileUrlFunction: function (tileCoord) {
        if (tileCoord) {
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            return 'https://t0.tianditu.gov.cn/DataServer?tk=5730f1a9e7de7c8f39c7e45725b863da&T=vec_w&x=' + x + '&y=' + y + '&l=' + z;
        } else {
            return '';
        }
    }
});

//********************加载在线天地卫星影像地图*************************//
let source_tiandisat = new XYZ({
    tileUrlFunction: function (tileCoord) {
        if (tileCoord) {
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            return 'https://t0.tianditu.gov.cn/DataServer?tk=5730f1a9e7de7c8f39c7e45725b863da&T=img_w&x=' + x + '&y=' + y + '&l=' + z;
        } else {
            return '';
        }
    }
});

//天地图labels图层,天地图所有图层都要用
let source_tdtlabeldz = new XYZ({
    tileUrlFunction: function (tileCoord) {
        if (tileCoord) {
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            return 'https://t0.tianditu.gov.cn/DataServer?tk=5730f1a9e7de7c8f39c7e45725b863da&T=cva_w&x=' + x + '&y=' + y + '&l=' + z;
        } else {
            return '';
        }
    }
});
let source_tdtlabelwx = new XYZ({
    tileUrlFunction: function (tileCoord) {
        if (tileCoord) {
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            return 'https://t0.tianditu.gov.cn/DataServer?tk=5730f1a9e7de7c8f39c7e45725b863da&T=cia_w&x=' + x + '&y=' + y + '&l=' + z;
        } else {
            return '';
        }
    }
});

//********************加载离线arcgis瓦片地图*************************//
let baseMapPath = "http://localhost:8080/arcgismaps/";  //基础电子地图路径
let source_arcgis_offline = new XYZ({
    tileUrlFunction: function (tileCoord) {
        if (tileCoord) {
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            var zoom = z.toString();
            var zoomTemp = "00" + zoom.toString();
            zoom = "L" + zoomTemp.substring(zoom.length, zoom.length + 2);
            var picRow = y.toString(16);
            var picCol = x.toString(16);
            var picRowTemp = "00000000" + picRow.toString();
            var picColTemp = "00000000" + picCol.toString();
            picRow = "R" + picRowTemp.substring(picRow.length, picRow.length + 8);
            picCol = "C" + picColTemp.substring(picCol.length, picCol.length + 8);
            return baseMapPath + zoom + "/" + picRow.toUpperCase() + "/" + picCol.toUpperCase() + ".jpg";
        } else {
            return '';
        }
    }
});

//********************加载离线arcgis瓦片卫星影像地图*************************//
let basesatMapPath = "http://localhost:8080/mapsat/";  //基础卫星地图路径
let source_arcgissat_offline = new XYZ({
    tileUrlFunction: function (tileCoord) {
        if (tileCoord) {
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            var zoom = z.toString();
            var zoomTemp = "00" + zoom.toString();
            zoom = "L" + zoomTemp.substring(zoom.length, zoom.length + 2);
            var picRow = y.toString(16);
            var picCol = x.toString(16);
            var picRowTemp = "00000000" + picRow.toString();
            var picColTemp = "00000000" + picCol.toString();
            picRow = "R" + picRowTemp.substring(picRow.length, picRow.length + 8);
            picCol = "C" + picColTemp.substring(picCol.length, picCol.length + 8);
            return basesatMapPath + zoom + "/" + picRow.toUpperCase() + "/" + picCol.toUpperCase() + ".jpg";
        } else {
            return '';
        }
    }
});

//********************加载离线sqlite数据库地图*************************//
let source_sqlite_offline = new XYZ({
    tileUrlFunction: function (tileCoord) {
        if (tileCoord) {
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            y = 2 * (Math.pow(2, (z - 1)) - y) - 1 + y;
            var path = window.location.pathname.substring(0,window.location.pathname.lastIndexOf("/"));
            return "http://" + window.location.host + path + "/MBTilesServlet?T=GMap&L=" + z + "&X=" + x + "&Y=" + y;
        } else {
            return '';
        }
    }
});

//********************加载离线sqlite数据库卫星影像地图*************************//
let source_sqlitesat_offline = new XYZ({
    tileUrlFunction: function (tileCoord) {
        if (tileCoord) {
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            y = 2 * (Math.pow(2, (z - 1)) - y) - 1 + y;
            var path = window.location.pathname.substring(0,window.location.pathname.lastIndexOf("/"));
            return "http://" + window.location.host + path + "/MBTilesServlet?T=GMapSat&L=" + z + "&X=" + x + "&Y=" + y;
        } else {
            return '';
        }
    }
});

let mapLabel = [
    {
        label: '在线Google地图',
        options: [
            {
                value: 'googledz',
                label: '谷歌电子地图'
            },
            {
                value: 'googledx',
                label: '谷歌地形图'
            },
            {
                value: 'googlewx',
                label: '谷歌卫星图'
            }
        ]
    },
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
        label: '在线百度地图',
        options: [
            {
                value: 'baidudz',
                label: '百度电子地图'
            },
            {
                value: 'baiduwx',
                label: '百度卫星图'
            }
        ]
    },
    {
        label: '在线高德地图',
        options: [
            {
                value: 'gaodedz',
                label: '高德电子地图'
            },
            {
                value: 'gaodewx',
                label: '高德卫星图'
            }
        ]
    },
    {
        label: '在线腾讯地图',
        options: [
            {
                value: 'qqmapdz',
                label: '腾讯电子地图'
            },
            {
                value: 'qqmapdx',
                label: '腾讯地形图'
            },
            {
                value: 'qqmapwx',
                label: '腾讯卫星图'
            }
        ]
    },
    {
        label: '离线地图'
    }
]

let maplist ={
    basemapLabel: mapLabel,
    googledz: source_google,
    googledx: source_googledx,
    googlewx: source_googlesat,
    tdtdz: source_tiandi,
    tdtlabeldz: source_tdtlabeldz,
    tdtwx: source_tiandisat,
    tdtlabelwx: source_tdtlabelwx,
    baidudz: source_baidu,
    baiduwx: source_baidusat,
    baidulabelwx: source_baidusatlabel,
    gaodedz: source_gaode,
    gaodewx: source_gaodesat,
    gaodelabelwx: source_gaodesatlabel
}
export default maplist