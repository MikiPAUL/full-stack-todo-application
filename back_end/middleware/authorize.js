const jwt = require('jsonwebtoken')
require('dotenv').config();

const authorize = (req, res , next) => {
    const tokenHeader = process.env.TOKEN_HEADER_KEY
    const secretKey = process.env.JWT_SECRET_KEY

    try {
        const token = req.headers[tokenHeader]

        const verified = jwt.verify(token, secretKey)

        if(verified) next()
        else throw new Error("Not allowed")
    }
    catch(err){
        res.status(401).json({ error: err })
    }
}

module.exports = authorize