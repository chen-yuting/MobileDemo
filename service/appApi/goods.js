const Router = require('koa-router')
const mongoose = require('mongoose')
require('../database/schema/Goods.js')
require('../database/schema/Category.js')
require('../database/schema/CategorySub.js')
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

//插入商品子类
router.get('/insertAllCategorySub', async (ctx) => {
    fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((value, index) => {
            //逐条插入
            console.log(value)
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then(() => {
                saveCount++
                console.log('插入<商品子类>成功', saveCount)
            }).catch(error => {
                console.log('插入<商品子类>失败', error)
            })
        })
    })

    ctx.body = "开始导入数据"
})

//获取某个商品详情信息的接口
//post:需要传回数据
router.post('/getDetailGoodsInfo', async (ctx) => {
    try {
        let goodsId = ctx.request.body.goodsId
        const Goods = mongoose.model('Goods')
        let result = await Goods.findOne({ ID: goodsId }).exec()
        ctx.body = { code: 200, message: result }
    } catch (error) {
        console.log(error)
        ctx.body = { code: 500, message: error }
    }
})

//读取大类详情信息的接口
router.get('/getCategoryList', async (ctx) => {
    try {
        const Category = mongoose.model('Category')
        let result = await Category.find().exec()
        ctx.body = { code: 200, message: result }
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }
})

//根据大类读取子类详情信息的接口
router.get('/getCategorySubList', async (ctx) => {
    try {
        // let categoryId=ctx.request.body.categoryId
        let categoryId = 1
        const CategorySub = mongoose.model('CategorySub')
        let result = await CategorySub.find({ MALL_CATEGORY_ID: categoryId }).exec()
        ctx.body = { code: 200, message: result }
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }
})

//根据子类别获取商品列表
router.get('/getGoodsListByCategorySubID', async (ctx) => {
    try {
        // let categorySubId=ctx.request.body.categorySubId
        let categorySubId = "2c9f6c946016ea9b016016f79c8e0000"
        const Goods = mongoose.model('Goods')
        let result = await Goods.find({ SUB_ID: categorySubId }).exec()
        ctx.body = { code: 200, message: result }
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }
})

module.exports = router