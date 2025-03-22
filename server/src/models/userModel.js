const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt');  

const {defaultUserImagePath} = require('../../public/images/users/defaultUser.png');
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "user name is required"],
        trim: true,
        maxLength: [32, "maximum 31 characters"],
        minLength: [5, "minimum 5 characters"],

    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: "Invalid email format"
        }
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "minimum 8 characters"],
        set: (v)=> bcrypt.hashSync(v,bcrypt.genSaltSync(10))
    },
    image :{
        type: String,
        default: defaultUserImagePath,
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    },
    phone: {
        type: String,
        default: [true, "Please enter a valid phone number"],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBanned : {
        type: Boolean,
        default: false
    },
},
{timestamps:true});

const User = model('Users',userSchema)
module.exports = User;