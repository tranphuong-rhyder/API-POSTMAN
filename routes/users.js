var express = require('express');
var router = express.Router();

const userController = require('../controllers/UserController');

router.get('/', userController.getAllUser);

router.post('/register', userController.register);

router.post('/login', userController.login);


module.exports = router;