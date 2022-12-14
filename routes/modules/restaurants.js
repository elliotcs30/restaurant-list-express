// 引入 restaurants 模組程式碼
const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const name = req.body.name

  // 從 req.body 拿出表單裡的資料,儲存資料到 mongoDB
  return Restaurant.create({ ...req.body, userId }) 
    .then(() => res.redirect('/')) // 新增完成後導回首頁 
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(err => console.error(err))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.error(err))
})

// 更新資料 edit 路由，更新完資料後將資料送給資料庫
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  
  return Restaurant.findByIdAndUpdate({ _id, userId }, req.body) //找到對應的資料後整個一起更新
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => console.log(err))
})

// 刪除資料 delete 路由
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router