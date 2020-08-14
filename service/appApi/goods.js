const Router = require('koa-router')
const mongoose = require('mongoose')
require('../schema/Goods.js')
const fs = require('fs')
const { data } = require('autoprefixer')

let router = new Router
router.get('/insertAllGoodsInfo', async (ctx) => {
    //路径相对于index.js
    fs.readFile('./data_json/newGoods.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const Goods = mongoose.model('Goods')
        data.map((value, index) => {
            //逐条插入
            console.log(value)
            let newGoods = new Goods(value)
            newGoods.save().then(() => {
                saveCount++
                console.log('成功', saveCount)
            }).catch(error => {
                console.log(MediaStreamErrorEvent)
            })
        })
    })
    ctx.body = "开始导入数据"
})

module.exports = router