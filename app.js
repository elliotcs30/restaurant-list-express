// require express packages used in the project
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// 引用路由器
const routes = require('./routes')
// 載入設定檔
const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

// setting static files
app.use(express.static('public'))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 呼叫 Passport 函式並傳入 app
usePassport(app)

// 將 request 導入路由器
app.use(routes)

// start and listen on the Express server
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})