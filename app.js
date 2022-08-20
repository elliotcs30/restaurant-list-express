// require express packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
// require Restaurant model
const Restaurant = require('./models/restaurant')

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

// routes setting
app.get('/', (req, res) => {
  Restaurant.find() // get Restaurant model all data
    .lean() //  Mongoose Model object send clear JavaScript data array
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

// start and listen on the Express server
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})