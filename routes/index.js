const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/register') //register jika sudah register diarahkan ke login
router.get('/login') //login. jika belum memiliki akun diarahkan ke register

// ===================================== //need login

router.get('/', Controller.homePage) //homepage if login
router.get('/vegetables', Controller.getVegetables)
router.get('/vegetables/add/:id') //admin only
router.post('/vegetables/add/:id')
router.get('/vegetables/edit/:id') //admin only
router.post('/vegetables/edit/:id')
router.get('/vegetables/delete/:id') //admin only

module.exports = router