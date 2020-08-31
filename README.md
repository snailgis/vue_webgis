## 0. 代码运行的前置条件

> #### **系统怎么跑起来？</u>**

> 1. 配置mongoDB数据库环境（可本地安装mongodb compass,会默认安装本地数据库，localhost:27017连接数据库，创建vue_webgis/users，运行程序后注册用户即可登录），也可选择线上mongodb数据库，修改config中数据库连接配置即可。
> 2. cd client
> 3. npm install (客户端代码中安装依赖)
> 4. cd ../
> 5. npm install (服务端代码中安装依赖)
> 6. npm run dev (前后端连载，同时启动前后端)

## 1. 效果展示
**系统登陆**
![](https://raw.githubusercontent.com/snailgis/vue_webgis/master/client/src/assets/readmeImg/loginPage.png)
**地图首页，支持Google，天地图，高德，腾讯，Geoq，Arcgis等多源在线网络地图的切换**
![](https://raw.githubusercontent.com/snailgis/vue_webgis/master/client/src/assets/readmeImg/mapHomePage.png)
**3维建筑物地图，基于MapBoxGL加载GeoServer三维建筑物矢量切片**
![](https://raw.githubusercontent.com/snailgis/vue_webgis/master/client/src/assets/readmeImg/3Dbuilding.png)
**MapBoxGL集成deck.gl实现高性能可视化**
![](https://raw.githubusercontent.com/snailgis/vue_webgis/master/client/src/assets/readmeImg/HexgonMap.png)

**openlayers聚合图**
![](https://raw.githubusercontent.com/snailgis/vue_webgis/master/client/src/assets/readmeImg/openlayerCluster.png)

<!--系统中还有好多好玩的功能等你去发现咯-->

<!--后续地图功能正在逐步完善，将尝试使用多种 map api 和集成 gis 相关库-->

##  2. VUE + Node + WebGIS项目说明：

### 2.1 实践目的：基于VUE框架使用模块化编程方式实现WebGIS的开发

### 2.2 主要功能
1. 前后端项目搭建
2. 登录注册（token验证功能）
3. 丰富的地图开发api DEMO集成，地图可视化实现

### 2.3 主要技术

> 地图框架：MapBoxGL/openlayers 5.x / ArcGIS  API 4.x

> 构建接口文档：Node + express + jwt;

> 构建前端页面：VueCli 3.0 + ElementUI

> 数据请求及拦截：Axios + MongoDB

> 其他即将或已经使用的技术：GeoServer, PostGIS, deck.gl, echarts, 

### 2.4 项目的搭建细节

#### （1）准备工作
1.1 搭建服务器（基于express）

1.2 连接本地的MongoDB数据库

1.3 搭建路由和数据模型

#### （2）登录注册接口
> express的body-parser中间件

> bcrypt加密模块

> jsonwebtoken

获取token(获取数据的令牌/jsonwebtoken)-----验证token（passport/passport-jwt）


#### （3）Passport验证



#### （4）前后端连载
