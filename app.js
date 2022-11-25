const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const generateUrl = require('./generate_url')
const mongoose = require('mongoose')
const URL = require('./models/url')
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
  const originalURL = req.body.url
  const alertMessage = '您所輸入的欄位為空'
  //例外1 : 當輸入欄裡沒有輸入任何資料且送出表單
  if (originalURL.length === 0) {
    return res.render('index', { alertMessage })
  }
  URL.findOne({originalURL:originalURL})
  .then(data => 
    data ? data : generator() )
  .then(data => res.render('index', {
    shortURL: data.shortURL}))

  function generator() {
  const shortURL = generateUrl()
  return URL.create({ originalURL, shortURL })
    .then(() => res.render('index', { shortURL }))
    .catch(error => console.log(error))
}
  // const shortURL = generateUrl()
  // return URL.create({ originalURL, shortURL })
  //   .then(() => res.render('index', { shortURL }))
  //   .catch(error => console.log(error))
})


app.listen(port, () => {
  console.log(`app is running on port ${port}`)
})