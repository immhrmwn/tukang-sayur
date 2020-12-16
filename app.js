const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes/index.js')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))

app.use('/', router)

app.listen(port, () => {
  console.log('this app running on port', port)
})
