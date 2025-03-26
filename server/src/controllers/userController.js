const createError = require('http-errors');
const User = require('../models/userModel');

const getUsers= async (req, res, next) => {
    try{
        const users = await User.find();
        res.status(200).json({
            message: "User list is returned from models",
            users : users
        });
    }
    catch(err){
        next(err);
    }
}; 


module.exports = { getUsers };