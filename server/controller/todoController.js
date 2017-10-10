const Todo = require('../models/todo')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const findAllTodo = (req, res) => {
  let user = jwt.verify(req.headers.token, process.env.SECRET, (err, user)=>{
    Todo.find((err, dataTodo) => {
      if(err){
        res.send(err)
      }else {
        res.send(dataTodo)
      }
    })
  })
}

const createTodo = (req, res) => {
  let user = jwt.verify(req.headers.token, process.env.SECRET, (err, user) =>{
    Todo.create({
      title: req.body.title,
      content: req.body.content,
      penulis: user.id,
      done: false
    })
    .then((dataTodo) => {
      res.send({
        message: 'data berhasil di tambahkan',
        dataTodo: dataTodo
      })
    })
    .catch((err) => {
      res.send(err)
    })
  })

}

const findByIdTodo = (req, res) => {
  Todo.findById(req.params.id)
  .then((dataTodo) => {
    res.send(dataTodo)
  })
  .catch((err) => {
    res.send(err)
  })
}

const updateTodo = (req, res) => {
  Todo.findOneAndUpdate({
    _id: ObjectId(req.params.id)
  },{
    title: req.body.title,
    content: req.body.content,
    done: req.body.done
  })
  .then((dataTodo)=>{
    res.send({
      msg: 'berhasil di update',
      dataTodo: dataTodo
    })
  })
  .catch((err) => {
    res.send(err)
  })
}

const removeTodo = (req, res) => {
  // res.send('why')
  Todo.remove({
    _id: req.params.id
  })
  .then((dataTodo) => {
    res.send({
      msg:' user berhasil di hapus',
      dataTodo: dataTodo
    })
  })
  .catch((err) => {res.send(err)})
}

module.exports = {
  findAllTodo,
  createTodo,
  findByIdTodo,
  updateTodo,
  removeTodo
}
