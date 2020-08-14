//提纯json，将数据为空的删去
const fs = require('fs')

fs.readFile('./data_json/goods.json', 'utf8', function (err, data) {
    let newData = JSON.parse(data)
    let pushData = []
    let i = 0
    newData.RECORDS.map(function (value, index) {
        if (value.IMAGE1 != null) {
            i++
            console.log(value.NAME)
            pushData.push(value)
        }
    })
    console.log(i)
    fs.writeFile('./data_json/newGoods.json', JSON.stringify(pushData), function (err) {
        if (err) console.log('写文件操作失败')
        else console.log('写文件操作成功')
    })
})
