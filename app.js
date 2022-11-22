const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
//setting template engine
app.engine('hbs', engine({ defaultLayout: 'main', extname: ".hbs" }))
app.set('view engine', 'hbs')

//setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))
//setting routes
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  console.log('req.body', req.body)
  res.render('index')

})

app.listen(port, () => {
  console.log(`app is running on port ${port}`)
})