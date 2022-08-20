const Restaurant = require('../restaurant') // 載入 todo model
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')

  Restaurant.create(restaurantList)
    .then(() => {
      console.log('create seeds done!')
    })
    .catch(err => console.log(err))
})

