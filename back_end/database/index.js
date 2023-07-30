require('dotenv').config();

const mongoose = require("mongoose")
const SERVER = process.env.DB_SERVER
const DB = process.env.DB_NAME

class Database{
    constructor(){
        this._connect()
    }

    async _connect(){
        
        mongoose.connect(
            `${SERVER}/${DB}`
        )
        .then(() =>{
            console.log("Successfully connected to db")
        })
        .catch((err) => {
            console.log(`Unable to connect to database ${err}`)
        })
    }
}

module.exports = new Database()