const { Vegetable, User, Tag, VegVendor, VegetableTag, Sequelize} = require('../models')
const Op = Sequelize.Op;
const { hashPassword, comparePass } = require('../helpers/bcrypt')
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

// init upload
const upload = multer({
  storage: storage,
  limits: {fieldSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb)
  }
}).single('image')

function checkFileType(file, cb){
  const filetypes = /jpeg|jpg|png|gif/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)
  if(mimetype && extname ){
    return cb(null, true);
  } else {
    cb('Error: Images only! ')
  }
}

// =====================================
class Controller {
  static homePage(req, res){
    res.render('homepage')
  }

  static logout(req, res){
    // req.session = null
    // delete req.session.userId
    req.session.destroy()
    res.redirect('/?msg=anda sudah logout')
  }

  static login(req, res){
    let errorMsg = ''
    if(req.query.error){
      errorMsg = req.query.error
    }
    res.render('login', {errorMsg})
  }

  static loginPost(req, res){
    const user = {
      username: req.body.username,
      password: req.body.password
    }
    const { username, password } = req.body
    User.findOne({
      where: {
        username: username
      }
    })
    .then(user => {
      if(user){
        const isValidPassword = comparePass(password, user.password)

        if(isValidPassword){
          req.session.userId = user.id
          req.session.userRole = user.role

          res.redirect('/vegetables')
        } else {
          res.redirect('/login?error=username dan password invalid!')
        }
      } else {
        res.redirect('/login?error=user tidak ada dalam database')
      }
    })
    .catch(err => {
      res.send(err)
    })
  }

  static register(req, res){
    res.render('register')
  }

  static registerPost(req, res){
    const newUser = {
      username: req.body.username,
      password: req.body.password,
      role: 'admin'
    }
    User.create(newUser)
    .then(data => {
      res.redirect('/login')
    })
    .catch(err => {
      res.send(err)
    })
  }

  // ====================================
  static getVegetables(req, res){
    let dataTag
    Tag.findAll()
    .then(data => {
      dataTag = data
      return Vegetable.findAll({
        include: ['Tags'],
        where: {
          stock: {
            [Op.gt]: 0
          }
        }
      })
    })
    .then(data => {
      res.render('vegetables', {data: data, dataTag: dataTag})
    })
    .catch(err => {
      res.send(err)
    })
  }


  static emptyList(req, res){
    Vegetable.findAll({
      where: {
        stock: 0
      },
      include: ['Tags']
    })
    .then(data => {
      // console.log(data)
      res.render('emptyveg', { data })
    })
    .catch(data => {
      res.send(err)
    })
  }

  static delete(req, res){
    const id = +req.params.id
    Vegetable.destroy({where: { id: id}})
    .then(add => {
      res.redirect('/vegetables/empty')
    })
    .catch(err => {
      res.send(err)
    })
  }


  static getCategory(req, res){
    Tag.findAll()
    .then(data => {
      res.render('category', {data})
    })
    .catch(err => {
      res.send(err)
    })
  }

  static buy(req, res){
    const id = req.params.id
    Vegetable.decrement("stock", {
      where: { id: id }
    })
    .then(data => {
      res.redirect('/vegetables')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static addVegetable(req, res){
    Tag.findAll()
    .then(data => {
      // console.log(data)
      res.render('addveg', {data})
    })
    .catch(err => {
      res.send(err)
    })
  }

  static addtag(req, res){
    const newtag = {
      veg_id: +req.params.id,
      tag_id: +req.body.tag_id
    }
    VegetableTag.create(newtag)
    .then(data => {
      res.redirect('/vegetables')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static addVegPost(req, res){
    const newVeg = {
      name: req.body.name,
      price: +req.body.price,
      stock: +req.body.stock
    }
    const newtag = {
      veg_id: null,
      tag_id: +req.body.id
    }
    Vegetable.create(newVeg)
    .then(data => {
      // console.log(data)
      newtag.veg_id = +data.id
      return VegetableTag.create(newtag)
    })
    .then(data => {
      res.redirect('/vegetables')
    })
    .catch(err => {
      const errMessages = []
      err.errors.forEach(element => {
          errMessages.push(element.message)
      });
      // console.log(errMessages)
      res.send(errMessages)
    })
  }

  static restock(req, res){
    const id = +req.params.id
    Vegetable.findByPk(id, {
      include: ["Tags"]
    })
    .then(data => {
      // console.log(data)
      res.render('restock', { data })
    })
    .catch(err => {
      res.send(err)
    })
  }

  static restockPost(req, res){
    const stock = {
      stock: +req.body.stock
    }
    const id = +req.params.id
    Vegetable.update(stock, {
      where: {id: id}
    })
    .then(data => {
      res.redirect('/vegetables/empty')
    })
    .catch(err => {
      const errMessages = []
      err.errors.forEach(element => {
          errMessages.push(element.message)
      });
      // console.log(errMessages)
      res.send(errMessages)
    })
  }

  static addImage(req, res){
    const id = +req.params.id
    Vegetable.findByPk(id)
    .then(data => {
      res.render('addimage', { data })
    })
    .catch(err => {
      res.send(err)
    })
  }

  static addImagePost(req, res){
    upload(req, res, (err) => {
      if(err){
        res.render('addimage', {
          msg: err
        })
      } else {
        // console.log(req.file)
        if(req.file === undefined){
          res.render('addimage', {
            msg: 'Error: no filed selected!'
          })
        } else {
          const image = {
            image: req.file.path
          }
          const id = +req.params.id
          Vegetable.update(image, {
            where: {id: id}
          })
          .then(data => {
            res.redirect('/vegetables')
          })
          .catch(err => {
            res.send(err)
          })
        }
      }
    })
  }
}

module.exports = Controller