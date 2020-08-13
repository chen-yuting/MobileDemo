const Koa = require('koa')
const { connect, initSchemas } = require('./database/init.js')
const app = new Koa()
const mongoose = require('mongoose')
require('./schema/User.js')
const Router = require('koa-router')

let user = require('./appApi/user.js')
let home = require('./appApi/home.js')

//装载所有子路由
let router = new Router();
router.use('/user',user)
router.use('/home',home)

//加载路由中间件

app.use(router.routes())
app.use(router.allowedMethods())



// //立即执行函数
// ; (async () => {
//   await connect()

//   const User = mongoose.model('User')
//   //插入
//   let oneUser = new User({ userName: 'cyt0', password: '123456' })
//   oneUser.save().then(() => {
//     console.log('插入成功')
//   })
//   //查询
//   let users = await User.find({}).exec()
//   console.log('-------------')
//   console.log(users)
//   console.log('-------------')

// })()

app.use(async (ctx) => {
  ctx.body = `<h1>Hello Koa2</h1>`
})

app.listen(3000, () => {
  console.log("[Server] starting at port 3000")
})
