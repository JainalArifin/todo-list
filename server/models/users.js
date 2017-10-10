const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
  fb_id: String,
  name: String,
  username: String,
  password: String,
  todo: [{
    type: Schema.Types.ObjectId,
    ref: 'todo'
  }]
})

const users = mongoose.model('users', userSchema)

module.exports = users
