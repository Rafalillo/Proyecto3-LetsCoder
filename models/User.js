const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 2
    },
    surname: {
        type: String,
        required: true
    },
    age: {
        type: Number
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        default:[]
    },
    role: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})



module.exports = mongoose.model("User", UserSchema)