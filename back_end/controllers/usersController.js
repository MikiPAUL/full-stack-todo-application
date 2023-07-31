const User =  require('../models/user')
const getCurrentUserId = require("../utils/currentUser")
require("dotenv").config()

const profile = async (req, res) => {
    try{
        const {name, email, password} = await User.findById(getCurrentUserId(req))

        res.json({
            name, email, password
        }).status(200)
    }
    catch(err){
        res.status(422).json({ error: err})
    }
}

const update = async (req, res) => {
    try{

    }
    catch(err){

    }
}

const destroy = async (req, res) => {
    try{

    }
    catch(err){

    }
}

module.exports = { 
    profile,
    update,
    destroy
}