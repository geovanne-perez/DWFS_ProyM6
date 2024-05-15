const express = require('express')
const router = express.Router()

const usersController = require('../controllers/usersController');

// add swagger documentation

router.get('/', usersController.getUsers)
router.get('/:id', usersController.getUserById)
router.post('/',usersController.addUser)
router.put('/',usersController.updateUser)
router.delete('/',usersController.delUser)

