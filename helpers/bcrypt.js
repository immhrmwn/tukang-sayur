const bcrypt = require('bcryptjs')

function hashPassword(plainpassword){
  const salt = bcrypt.genSaltSync(5)
  const hash = bcrypt.hashSync(plainpassword, salt)

  return hash
}

function comparePass(plainpass, hash){
  const isValidPassword = bcrypt.compareSync(plainpass, hash)
  return isValidPassword

}

module.exports = { hashPassword, comparePass }