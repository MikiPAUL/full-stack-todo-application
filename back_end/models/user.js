const mongoose = require("mongoose")
const validator = require("validator")

const validateEmail = {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
        return validator.isEmail(value)
    }
}

const userSchema = new mongoose.Schema({
    name: String,
    email: validateEmail,
    password: String,
    todoList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo'
    }],

}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);