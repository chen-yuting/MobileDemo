const Router = require('koa-router')
const mongoose = require('mongoose')
require('../database/schema/Goods.js')
require('../database/schema/Category.js')
const fs = require('fs')
const { data } = require('autoprefixer')

let router = new Router

//插入所有商品
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
                console.log('插入<商品>成功', saveCount)
            }).catch(error => {
                console.log(MediaStreamErrorEvent)
            })
        })
    })
    ctx.body = "开始导入数据"
})

//插入商品大类
router.get('/insertAllCategory', async (ctx) => {
    fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const Category = mongoose.model('Category')
        data.RECORDS.map((value, index) => {
            //逐条插入
            console.log(value)
            let newCategory = new Category(value)
            newCategory.save().then(() => {
                saveCount++
                console.log('插入<商品大类>成功', saveCount)
            }).catch(error => {
                console.log('插入<商品大类>失败', error)
            })
        })
    })

    ctx.body = "开始导入数据"
})

module.exports = router