const { z } = require("zod")
const User = require('../models/user')
const generateToken = require("../utils/generateToken")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const signUpParams = z.strictObject({
    user: z.strictObject({
        name: z.string().min(1).max(30),
        email: z.string().email(),
        password: z.string().min(8).max(20)
    })
})

const signUp = async (req, res) => {
    try{
        const sanitizeSignUpParams = signUpParams.safeParse(req.body)

        if(!sanitizeSignUpParams.success) return res.json({ error: sanitizeSignUpParams.error }).status(422)

        const user = await User.create({
            ...sanitizeSignUpParams.data.user
        })
        if(!user) throw new Error("Couldn't find the user")

        const token = generateToken(user._id)
        res.json({
            status: "Successfully signUp",
            ...token,

        }).status(201)
    }
    catch(err){
        res.status(422).json({ message: err.message, stack: err.stack })
    }
}

const signInParams = z.strictObject({
    user: z.strictObject({
        email: z.string().email(),
        password: z.string().min(8).max(20)
    })
})


const signIn = async (req, res) => {
    try{
        const sanitizeSignInParams = signInParams.safeParse(req.body)

        if(!sanitizeSignInParams.success) return res.json({ error: sanitizeSignInParams.error }).status(422)

        const user = await User.findOne({ ...sanitizeSignInParams.data.user })

        if(!user) throw new Error("Unable to find the user")

        const token = generateToken(user._id)
        res.json({
            status: "Successfully signIn",
            ...token,

        }).status(201)
    }   
    catch(err){
        res.status(422).json( { message: err.message, stack: err.stack } )
    }
}

const signOut = async (req, res) => {
    const tokenName = process.env.TOKEN_HEADER_KEY
    try{
        const authHeader = req.headers['Authorization']
        jwt.sign({ authHeader }, " ", { expiresIn: 1 })
        res.json({
            status: "Signout successfully"
        }).status(200)
    }
    catch(err){
        res.status(422).json( { message: err.message, stack: err.stack } )
    }
}

module.exports = {
    signUp,
    signIn, 
    signOut
}
