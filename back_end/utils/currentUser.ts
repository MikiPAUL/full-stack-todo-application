const jwt = require("jsonwebtoken")
require("dotenv").config()

const getCurrentUserId = (req) => {
    const tokenHeader = process.env.TOKEN_HEADER_KEY
    try{
        const token = req.headers[tokenHeader]
        const secretKey = process.env.JWT_SECRET_KEY

        const { userId } = jwt.verify(token, secretKey)

        return userId
    }
    catch(err){
        return err
    }
}

module.exports = getCurrentUserId