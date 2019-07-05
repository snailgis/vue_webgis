## 运行代码
1. cd client
2. npm install (客户端代码中安装依赖)
3. cd ../
4. npm run dev (前后端连载，同时启动前后端)

## 效果展示
**1.登陆**
![](https://github.com/snailgis/vue_webgis/blob/master/client/src/assets/readmeImg/loginPage.png)
**2.首页**
![](https://github.com/snailgis/vue_webgis/blob/master/client/src/assets/readmeImg/homePage.png)
**3.地图门户**
![](https://github.com/snailgis/vue_webgis/blob/master/client/src/assets/readmeImg/mapHomePage.png)
**4.ArcGIS地图门户**
![](https://github.com/snailgis/vue_webgis/blob/master/client/src/assets/readmeImg/arcgisHomePage.png)

！！！后续地图功能正在逐步完善，将尝试使用多种 map api 和集成 gis 相关库
##  vue + node + WebGIS项目说明：

### 实践意义：

### 实践目的：基于VUE框架使用模块化编程方式实现WebGIS的开发

### 主要功能
1. 前后端项目搭建
2. 登录注册（token验证功能）
3. 丰富的地图开发api DEMO集成，地图可视化实现

### 主要技术

> 地图框架：openlayers 5.x / arcgis api / mapbox

> 构建接口文档：Node + express + jwt;

> 构建前端页面：VueCli 3.0 + ElementUI

> 数据请求及拦截：Axios + MongoDB Compass

### 项目的搭建细节

#### 1. 准备工作
1.1 搭建服务器（基于express）

1.2 连接本地的MongoDB数据库

1.3 搭建路由和数据模型

#### 2. 登录注册接口
> express的body-parser中间件

> bcrypt加密模块

> jsonwebtoken

获取token(获取数据的令牌/jsonwebtoken)-----验证token（passport/passport-jwt）


#### 3. Passport验证



#### 4. 前后端连载

<<<<<<< HEAD
![](https://github.com/snailgis/vue_webgis/blob/master/client/src/assets/demo1.png)
=======
>>>>>>> dev
