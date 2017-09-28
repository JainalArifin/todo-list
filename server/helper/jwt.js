var jwt = require('jsonwebtoken');
require('dotenv').config()

const Todo = require('../models/todo')
const ObjectId = require('mongodb').ObjectId

const islogIn = (req, res, next) => {
  var decoded = jwt.verify(req.headers.token, process.env.SECRET, (err, decoded)=>{
    if(err){
      res.send("anda belum login")
    }else {
      req.id = decoded.id
      next()
    }
  })
}

const authByid = (req, res, next)=> {
    Todo.find({})
  .then((data) => {
    // console.log(data);
    for (var i = 0; i < data.length; i++) {
      console.log('ini use yang masuk------>', req.id );

      if(req.id == data[i].penulis ){
        // console.log(req.id, '<-----');
        console.log(data[i].penulis, '<----- ini penulis');
        next()
      }else {
        res.send('Anda tidak punya hak akses ini')
      }
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

// (err, data) => {
//   // console.log(data.penulis);
  // for (var i = 0; i < data.length; i++) {
  //   console.log('------>', data[1].penulis );
  //
  //   if(req.id == data[1].penulis ){
  //     console.log(req.id, '<-----');
  //     console.log(data[1].penulis, '<-----');
  //     next()
  //   }else {
  //     console.log('Anda tidak punya hak akses ini')
  //   }
//
//   }
