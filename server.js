const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const passport = require('passport')
const app = express()

// MongoDB数据库连接
mongoose.connect('mongodb://localhost/vue_webgis', {useNewUrlParser: true})
        .then(()=>console.log("MongoBD Connnected"))
        .catch(err=>console.log(err))

// 引入users.js
const users = require('./routers/api/users')

// 使用bodyparser中间件
// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended: false}))
// parse application/json
app.use(bodyparser.json())

// passport初始化
app.use(passport.initialize());

// 代码抽离，将passport对象直接引到其他地方来写
require('./config/passport')(passport)

app.get('/', (req, res)=>{
    res.send('hello world')
})

// 使用routers
app.use('/api/users', users)

const port = process.env.PORT || 5050

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})
