const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const {isLoggedin, isLoggedOut} = require('../middlewares/auth')

router.get('/', Controller.homePage) //homepage if login clear

router.get('/register', isLoggedOut, Controller.register) //register jika sudah register diarahkan ke login
router.post('/register', Controller.registerPost) //register jika sudah register diarahkan ke login

router.get('/login', isLoggedOut ,Controller.login) //login. jika belum memiliki akun diarahkan ke register
router.post('/login', Controller.loginPost) //login. jika belum memiliki akun diarahkan ke register

// ===================================== //need login


router.use(isLoggedin)

router.get('/categories', Controller.getCategory) //clear
router.get('/vegetables', Controller.getVegetables) //clear

router.get('/vegetables/buy/:id', Controller.buy) //clear

router.get('/vegetables/add', Controller.addVegetable) //admin only
router.post('/vegetables/add', Controller.addVegPost)

router.post('/add/tag/:id', Controller.addtag)

router.get('/empty', Controller.emptyList) //admin only
router.get('/vegetables/restock/:id', Controller.restock) //admin only
router.post('/vegetables/restock/:id', Controller.restockPost) //admin only
router.get('/vegetables/delete/:id', Controller.delete) //admin only

router.get('/addimage/:id', Controller.addImage)
router.post('/addimage/:id', Controller.addImagePost)


router.get('/logout' ,Controller.logout)


module.exports = router