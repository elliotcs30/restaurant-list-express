// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')

// 定義首頁路由
router.get('/', (req, res) => {
  // get Restaurant model all data
  Restaurant.find() 
    .lean() //  Mongoose Model object send clear JavaScript data array
    .sort({ _id : 'asc' }) // 升冪'asc', 降冪'desc'
    .then(restaurants => res.render('index', { restaurants })) // mongoDB send data to index template
    .catch(error => console.error(error)) // handle error
})

// 匯出路由模組
module.exports = router