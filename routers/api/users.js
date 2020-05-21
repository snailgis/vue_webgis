// login & register
const express = require('express')
const bcrypt = require('bcrypt') // 密码加密
const jwt = require('jsonwebtoken')
const passport = require('passport')

const router = express.Router()
const User = require('../../model/User')


// @ router GET api/users/test
// reture json
// public
router.get('/test', (req, res) => {
    res.json({ msg: "login" })
})

// @router Post api/users/register
// return json
// public

// 需要安装express中间件body-parser
router.post('/register', (req, res) => {
    // console.log(req.body)
    //查询数据库中是否存在邮箱
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ email: '邮箱被注册' })
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, function (err, hash) {
                        // Store hash in your password DB.
                        if (err) {
                            throw err
                        }
                        newUser.password = hash
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    });
                });
            }
        })
})

// @router Post api/users/login
// return token jwt passport
// public
router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    //查询数据库
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ email: "用户不存在！" })
            }
            // bcrypt 密码匹配
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //res.json({msg:'匹配成功'})
                        // 返回token
                        const rules = { id: user.id, name: user.name }
                        //jwt.sign('规则', '加密名字', '过期时间', '箭头函数')
                        jwt.sign(rules, 'secret', { expiresIn: 60 * 60 }, (err, token) => {
                            if (err) throw err
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        })
                    } else {
                        res.status(400).json({ password: '密码错误' })
                    }
                })
        })
})

// @router Get api/users/current
// return corrent user
// private
router.get('/current', passport.authenticate('jwt',{session: false}),(req, res)=>{
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})

module.exports = router