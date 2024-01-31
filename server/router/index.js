const express = require('express')

const router = express.Router({ mergeParams: true })

router.use('/auth', require('./routes/auth'))
router.use('/users', require('./routes/users'))


module.exports = router
