const express = require("express")
const router = express.Router()
const authorize = require('../middleware/authorize')

router.use('/auth', require('./auth'))
router.use(authorize)
router.use('/user', require('./user'))
router.use(require('./todo'))

module.exports = router;