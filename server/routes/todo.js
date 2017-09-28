const express = require('express')
const router = express.Router()
const todoController = require('../controller/todoController')
const auth = require('../helper/jwt')

router.get('/', auth.islogIn, todoController.findAllTodo)
router.post('/', auth.islogIn, todoController.createTodo)
router.get('/:id', auth.islogIn, auth.authByid, todoController.findByIdTodo)
router.put('/:id', auth.islogIn, auth.authByid, todoController.updateTodo)
router.delete('/:id', auth.islogIn, auth.authByid, todoController.removeTodo)

module.exports = router
