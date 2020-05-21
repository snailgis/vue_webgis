const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 创建schema
const profile = new Schema({
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

const Profile = mongoose.model('profiles', profile)

module.exports = Profile