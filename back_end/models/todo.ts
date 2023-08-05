const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: String,

    body: String,

    completedStatus: {
        type: Boolean,
        default: false
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{timestamps: true});

module.exports = mongoose.model('Todo', todoSchema);