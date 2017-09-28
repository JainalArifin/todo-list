const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const login = require('../helper/jwt')

router.post('/signup', userController.createUsers)
router.post('/login', userController.userLogin)

router.get('/', login.islogIn, userController.findAllUsers)
router.post('/', login.islogIn, userController.createUsers)
router.get('/:id', login.islogIn, userController.findByIdUser)
router.put('/:id', login.islogIn, userController.updateUser)
router.delete('/:id', login.islogIn, userController.removeUsers)


module.exports = router;
