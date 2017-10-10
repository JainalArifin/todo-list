const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new mongoose.Schema({
  title: String,
  content: String,
  penulis: {
    type: Schema.Types.ObjectId, ref: 'users'
  },
  done: Boolean
})

const todo = mongoose.model('todo', todoSchema)

module.exports = todo
