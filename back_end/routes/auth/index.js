const express = require('express')
const router = express.Router()
const { signIn, signUp, signOut } = require('../../controllers/authenticationController')
const authorize = require("../../middleware/authorize")


router.route('/signIn').post(signIn)
router.route('/signUp').post(signUp)
router.use(authorize)
router.route('/signOut').put(signOut)

module.exports = router;