const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const passport = require('passport')
const app = express()

// 引入keys.js
const db = require('./config/keys').mongooseURI
// 引入users.js
const users = require('./routers/api/users')

// MongoDB数据库连接
mongoose.connect(db, {useNewUrlParser: true})
        .then(()=>console.log("MongoBD Connnected"))
        .catch(err=>console.log(err))

// express使用bodyparser中间件,用来解析不同数据格式
// parse application/x-www-form-urlencoded
// 经过这个中间件后，就可以在所有路由处理器的req.body中访问请求参数
app.use(bodyparser.urlencoded({extended: false}))
// parse application/json
app.use(bodyparser.json())

// passport初始化
app.use(passport.initialize());

// 代码抽离，将passport对象直接引到其他地方来写
require('./config/passport')(passport)

// 使用routers
app.use('/api/users', users)

const port = process.env.PORT || 5050

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})
