const express = require('express')
const app = express()
const currency = require('./helpers/currency')
const port = process.env.PORT || 3000
const router = require('./routes/index.js')
const session = require('express-session')
const multer = require('multer')
const path = require('path')

// set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

// init upload
const upload = multer({
  storage: storage
}).single('image')

app.use(express.static('./public'))

app.use(session({
  secret: 'sayurtukang',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.locals.formatCurrency = currency

app.use('/', router)

app.listen(port, () => {
  console.log('this app running on port', port)
})
