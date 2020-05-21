const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 创建schema\
const user = new Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('users', user)

module.exports = User