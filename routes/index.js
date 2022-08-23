// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const home = require('./modules/home') // 引入 home 模組程式碼
const restaurants = require('./modules/restaurants') // 引入 restaurant 模組程式碼
const users = require('./modules/users') // 引入 users 模組程式碼
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

// 將網址結構符合 /restaurants 字串開頭的 request 導向 restaurants 模組 
router.use('/restaurants', authenticator, restaurants) // 加入驗證程序
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home) // 加入驗證程序

// 匯出路由器
module.exports = router


