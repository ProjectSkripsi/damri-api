const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hash = require('../helpers/hash')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please input your name']
    },
    username: {
        type: String,
        required: [true, 'Please input your username']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, `Password Minimum`]
    },
    address: {
        type: String,
        required: [true, 'Please input your address']
    },
    contact: {
        type: String,
        required: [true, 'Please input your contact']
    },
    role: {
        type: String,
        default: 'member'
    },
    deleteAt: {
        type: Date,
        default: null
    },
}, {
    timestamps: true
});

userSchema.post('validate', function () {
    this.password = hash.encode(this.password)
});

const User = mongoose.model('User', userSchema);
module.exports = User