const express = require("express")
const router = express.Router()
const {profile, update, destroy} = require('../../controllers/usersController')

router.route('/profile').get(profile)
router.route('/editProfile').put(update)
router.route('/deleteAccount').delete(destroy)

module.exports = router;


