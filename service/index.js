const Koa = require('koa')
const { connect } = require('./database/init.js')
const app = new Koa()


//立即执行函数
;(async () => {
  await connect()
})()

app.use(async (ctx) => {
  ctx.body = `<h1>Hello Koa2</h1>`
})

app.listen(3000, () => {
  console.log("[Server] starting at port 3000")
})
