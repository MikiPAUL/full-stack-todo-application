const jwt = require("jsonwebtoken")
require("dotenv").config()

const generateToken = (id) => {
    const secretKey = process.env.JWT_SECRET_KEY
    const tokenHeader = process.env.TOKEN_HEADER_KEY

    const data = {
        userId: id,
        time: new Date(),
    }

    const token = jwt.sign(data, secretKey)

    return  {
        [tokenHeader]: token
    }
}


module.exports = generateToken