var jwt = require('jsonwebtoken');
require('dotenv').config()

const Todo = require('../models/todo')
const ObjectId = require('mongodb').ObjectId

const islogIn = (req, res, next) => {
  console.log(req.headers.token, '<------ ini headers token---');
  jwt.verify(req.headers.token, process.env.SECRET, (err, decoded)=>{
    console.log(decoded, '<-----ini decode hasil---');

    if(err){
      res.send("anda belum login")
    }else {
      // console.log(decoded, '<---- ini mang coded----');
      req.id = decoded.id
      next()
    }
  })
}

const authByid = (req, res, next) => {
  Todo.findById({
    _id: req.params.id
  })
  .then((dataTodo) => {

    if(dataTodo.penulis == req.id){
      console.log(dataTodo, '<--------data todo---')
      next()
    }else {
      // console.log('anda tidak boleh meng akses ini');
      res.send('anda tidak boleh meng akses ini')
    }

  })
  .catch((err) => {
    console.log(err);
  })
}

module.exports = {
  islogIn,
  authByid
}
