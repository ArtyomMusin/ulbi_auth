const express = require('express')
const authController = require('../../controllers/auth')
const { body } = require('express-validator')

const router = express.Router({ mergeParams: true })

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    authController.registration
)
router.get('/activate/:link', authController.activate)
router.post('/login', authController.login)
router.get('/refresh', authController.refresh)
router.post('/logout', authController.logout)

module.exports = router
