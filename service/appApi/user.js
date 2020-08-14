const Router = require('koa-router')
const mongoose = require('mongoose')
require('../schema/User.js')  //要用mongoose.model就得引入

let router = new Router
router.get('/', async (ctx) => {
    ctx.body = "这是用户操作首页"
})

//得到用户注册post的提交内容，并操作数据库
router.post('/register', async (ctx) => {
    //引入User的model
    const User = mongoose.model('User')
    let newUser = new User(ctx.request.body)

    await newUser.save().then(() => {
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    }).catch(error => {
        ctx.body = {
            code: 500,
            message: error
        }
    })
})

router.post('/login', async (ctx) => {
    let loginUser = ctx.request.body
    console.log(loginUser)
    let userName = loginUser.userName
    let password = loginUser.password

    const User = mongoose.model('User')

    //比对用户名
    await User.findOne({ userName: userName }).exec().then(async (result) => {
        console.log(result)
        //若用户名存在，比对密码
        if (result) {
            let newUser = new User()
            await newUser.comparePassword(password, result.password)
                .then(isMatch => {
                    ctx.body = { code: 200, message: isMatch }
                })
                .catch(error => {
                    console.log(error)
                    ctx.body = { code: 500, message: error }
                })
        } else {
            ctx.body = { code: 200, message: '用户名不存在' }
        }
    }).catch(error => {
        console.log(error)
        ctx.body = { code: 500, message: error }
    })
})
module.exports = router