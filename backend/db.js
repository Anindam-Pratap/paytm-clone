const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        unique: true,
        minLength:3,
        maxLength:30
    },
    firstName:{
        type:String,
        required:true,
        minLength:50
    },
    lastName:{
        type:String,
        required:true,
        minLength:50
    },
    password:{
        type:String,
        required:true,
        minLength:6
    }
})

const User = mongoose.model("User", userSchema)

module.exports = {
    User
}