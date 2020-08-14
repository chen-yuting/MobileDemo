const Koa = require('koa')
const { connect, initSchemas } = require('./database/init.js')
const app = new Koa()
const mongoose = require('mongoose')

const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const Router = require('koa-router')


app.use(bodyParser())
app.use(cors())   //前端与后端的跨域

let user = require('./appApi/user.js')
let home = require('./appApi/home.js')
let goods = require('./appApi/goods.js')

//装载所有子路由
let router = new Router();
router.use('/user', user.routes())
router.use('/home', home.routes())
router.use('/goods', goods.routes())

//加载路由中间件

app.use(router.routes())
app.use(router.allowedMethods())


//立即执行函数
; (async () => {
  await connect()
})()

app.use(async (ctx) => {
  ctx.body = `<h1>Hello Koa2</h1>`
})

app.listen(3000, () => {
  console.log("[Server] starting at port 3000")
})
