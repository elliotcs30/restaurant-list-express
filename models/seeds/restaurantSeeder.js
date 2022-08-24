const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant') // 載入 todo model
const restaurantList = require('../../restaurant.json').results

const User = require('../user')
const userList = require('../../userList.json').users
const db = require('../../config/mongoose')

userList.map(SEED_USER => {
  db.once('open', () => {
    console.log('mongodb connected!')
    
    Promise.all([
      bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER.password, salt))
      .then(hash => User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash
      }))
      .then(user => {
        // 取得已建立完成的 user id (要做關聯資料表)
        const userId = user._id
        // 取得 user 種子資料編號要建立的餐廳數量
        const restaurantId = SEED_USER.restaurantId

        // 這邊設定 userRestaurants 接收 restaurant 的餐廳資訊
        // 一定要加上 return 把 restaurant 回傳, 不然會無法建立 restaurant 資料
        const userRestaurants = restaurantId.map(id => {
          const restaurant = restaurantList[id]

          // 因為 restaurant 使用 const
          // 所以用以下方式將從資料表取得的 user id 覆值給 restaurant 的 userId
          restaurant.userId = userId
          return restaurant
        })

        // 建立 restaurant 資料
        return Restaurant.create(userRestaurants)
      })
      .then(() => {
        console.log('done.')
        // 關閉 DB 連線
        process.exit()
      })
    ])
  })
})