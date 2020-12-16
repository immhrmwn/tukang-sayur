const { Vegetable, User, Tag} = require('../models')

class Controller {
  static homePage(req, res){
    res.render('homepage')
  }
  static login(req, res){}
  static register(req, res){}
  static getVegetables(req, res){

    Vegetable.findAll()
    .then(data => {
      res.render('vegetables', {data})
    })
    .catch(err => {
      res.send(err)
    })
  }
  static addVeg(req, res){}
  static addVegPost(req, res){}
  static editVeg(req, res){}
  static editVegPost(req, res){}
  static deleteVeg(req, res){}
}

module.exports = Controller