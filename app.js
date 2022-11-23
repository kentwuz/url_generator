const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const generateUrl = require('./generate_url')
const mongoose = require('mongoose')
const Url = require('./models/url')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//setting template engine
app.engine('hbs', engine({ defaultLayout: 'main', extname: ".hbs" }))
app.set('view engine', 'hbs')

//setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})
//setting routes
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/url', (req, res) => {
  const url = req.body.url
  const newUrl = generateUrl()
  console.log(url, newUrl)
  return Url.create({ url, newUrl })
    .then(() => res.render('index', { newUrl }))
    .catch(error => console.log(error))

})


app.listen(port, () => {
  console.log(`app is running on port ${port}`)
})