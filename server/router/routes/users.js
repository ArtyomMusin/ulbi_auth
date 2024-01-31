const express = require('express')
const userController = require('../../controllers/users')
const authMiddleware = require('../../middleware/auth.middleware')

const router = express.Router({ mergeParams: true })

router.get('/allusers', authMiddleware, userController.getUsers)
router.get('/user/:id', authMiddleware, userController.getUserById)

module.exports = router