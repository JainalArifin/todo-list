const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const login = require('../helper/jwt')
const FB = require('fb')

var dataFB = (req, res, next) => {
  FB.setAccessToken(req.headers.fbaccesstoken)
  next()
}

router.post('/loginFb', dataFB, userController.loginFb)


router.post('/register', userController.userRegister)
router.post('/login', userController.userLogin)

router.get('/', login.islogIn, userController.findAllUsers)
router.post('/', login.islogIn, userController.userRegister)
router.get('/:id', login.islogIn, userController.findByIdUser)
router.put('/:id', login.islogIn, userController.updateUser)
router.delete('/:id', login.islogIn, userController.removeUsers)


module.exports = router;
