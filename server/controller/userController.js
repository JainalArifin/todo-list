const Users = require('../models/users')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const FB = require('fb')
require('dotenv').config()


const loginFb = (req, res) => {
  FB.api('/me', {fields: ['id','name','email']}, (response) => {
    console.log('ini response dari fb /me', response)
    Users.find({
      fb_id: response.id
    })
    .then(dataUser => {
      if (dataUser.length == 0) {
        Users.create({
          fb_id: response.id,
          name: response.name,
          email: response.email
        })
        .then(userCreated => {
          console.log('ini hasil user create: ', userCreated);

          let token = jwt.sign({
            id: userCreated._id,
            fb_id: userCreated.fb_id,
            name: userCreated.name,
            email: userCreated.email
          }, process.env.SECRET)

          res.send({
            message: 'login success',
            token: token
          })
        })
        .catch(err => {
          res.send(err)
        })
      } else {
        console.log('ini hasil find user:', dataUser);
        let token = jwt.sign({
          id: dataUser[0]._id,
          fb_id: dataUser[0].fb_id,
          name: dataUser[0].name,
          email: dataUser[0].email
        }, process.env.SECRET)

        res.send({
          message: 'login success',
          token: token
        })
      }
    })
    .catch(err => {
      res.send(err)
    })
  })

}

const findAllUsers = (req, res) => {
  Users.find({})
  .populate('todo')
  .then((dataUser) => {
    res.send(dataUser)
  })
  .catch((err) => {
    res.send({
      msg: 'data error'
    })
  })
}

const userRegister = (req, res) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(`${req.body.password}`, salt);
  Users.create({
    username: req.body.username,
    password: hash
  })
  .then((dataUser) => {
    res.send({
      message: 'data berhasil di tambahkan',
      dataUser: dataUser
    })
  })
  .catch((err) => {
    res.send(err)
  })
}

const userLogin = (req, res) =>{
  Users.findOne({
    username: req.body.username
  })
  .then((dataUser) => {
    if(dataUser == null){
      res.send({
        msg: 'username not found'
      })
    }
    else {
      if( bcrypt.compareSync(req.body.password, dataUser.password)){
        var token = jwt.sign({
          id: dataUser.id,
          username: dataUser.username
        },process.env.SECRET)
        res.send({
          msg: 'login success',
          data:token
        })
      }else {
        res.send({
          msg: 'password tidak di kenali'
        })
      }
    }
  })
  .catch((err) => {
    res.send(err)
  })
}

const findByIdUser = (req, res) =>{
  Users.findById({
    _id: ObjectId(req.params.id)
  })
  .then((dataUser) => {
    res.send(dataUser)
  })
  .catch((err) => {
    res.send(err)
  })
}

const updateUser = (req, res) =>{
  Users.findOneAndUpdate({
    _id: ObjectId(req.params.id)
  },{
    username: req.body.username,
    password: req.body.password
  })
  .then((dataUser) => {
    res.send({
      msg: 'berhasil di update',
      dataUser: dataUser
    })
  })
  .catch((err) => {
    res.send(err)
  })
}

const removeUsers = (req, res) =>{
  Users.findByIdAndRemove({
    _id: ObjectId(req.params.id)
  })
  .then((dataUser) => {
    res.send({
      msg: 'user berhasil di hapus',
      dataUser: dataUser
    })
  })
}


module.exports = {
  loginFb,
  findAllUsers,
  userRegister,
  userLogin,
  findByIdUser,
  updateUser,
  removeUsers
}
