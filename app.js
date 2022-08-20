// require express packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')
const methodOverride = require('method-override') 

const app = express()

// require mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // setting connect to mongoDB

// get mongoDB connect state
const db = mongoose.connection
// connect error
db.on('error', () => {
  console.log('mongodb error!')
})
// connect success
db.once('open', () => {
  console.log('mongodb connected!')
})

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// routes setting
app.get('/', (req, res) => {
  Restaurant.find() // get Restaurant model all data
    .lean() //  Mongoose Model object send clear JavaScript data array
    .sort({ _id : 'asc' }) // 升冪'asc', 降冪'desc'
    .then(restaurants => res.render('index', { restaurants })) // mongoDB send data to index template
    .catch(error => console.error(error)) // handle error
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  // 
  return Restaurant.create(req.body) // 從 req.body 拿出表單裡的資料,儲存資料到 mongoDB
    .then(() => res.redirect('/')) // 新增完成後導回首頁 
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById( id )
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(err => console.error(err))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.error(err))
})

// 更新資料 edit 路由，更新完資料後將資料送給資料庫
app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  
  Restaurant.findByIdAndUpdate(id, req.body) //找到對應的資料後整個一起更新
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

// 刪除資料 delete 路由
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById( id )
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// start and listen on the Express server
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})