const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { validatePostBody } = require('../lib/utils')
const { User } = require('../models')

module.exports.all = async (req, res, next) => {
  const users = await User.findAll()
  res.send(users)
}


module.exports.create = async (req, res, next) => {
  const requiredFields = ['first_name', 'email', 'username', 'password']
  const body = validatePostBody(req, requiredFields)

  const salt = await bcrypt.genSalt(10)
  body.password = await bcrypt.hash(body.password, salt)
  const user = await User.create(body)

  res.status(201).send(user)
}


module.exports.update = async (req, res, next) => {}



module.exports.login = async (req, res, next) => {
  const requiredFields = ['username', 'password']
  const body = validatePostBody(req, requiredFields)
  const user = await User.findOne({ where: { username: body.username }, raw: true })

  if(user) {
    const validPassword = await bcrypt.compare(body.password, user.password)
    if(!validPassword){
      return res.status(401).send({ message: 'Invalid Password' })
    }

    delete user.password
    const token = jwt.sign(
      { user }, 
      'secret', {
      expiresIn: 86400, // 24 hours
    })

    return res.status(200).send({ token: token })

  } else {
    return res.status(404).send({ message: 'No User Found' })
  }
}