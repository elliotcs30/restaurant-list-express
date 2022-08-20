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

module.exports = db