const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant') // 載入 todo model
const restaurantList = require('../../restaurant.json').results

const User = require('../user')
const userList = require('../../userList.json').users
const db = require('../../config/mongoose')


for (let i = 0; i < userList.length; i++) {
  const SEED_USER = userList[i]

  db.once('open', () => {
    console.log('mongodb connected!')

    // Promise.all([func1, func2, func3, ...])
    //   .then(results => {
    //     console.log(results)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
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
        const userId = user._id
        const restaurantId = SEED_USER.restaurantId
  
        restaurantId.map(id => {
          const restaurant = restaurantList[id]
          restaurant.userId = userId
          return Restaurant.create(restaurant)
        })
      })
      
    ]).then(() => {
      console.log('done.')
      process.exit()
    })
  })
  
}


