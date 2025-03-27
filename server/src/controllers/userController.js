const createError = require('http-errors');
const User = require('../models/userModel');
const { successResponse, errorResponse } = require('./responseController');

const getUsers= async (req, res, next) => {
    try{
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 1;
        
        const searchRegExp = RegExp('.*'+ search + '.*','i');
        const filter = {
            isAdmin: {$ne: true},
            $or :[
                {name : {$regex : searchRegExp}},
                {email : {$regex : searchRegExp}},
                {phone : {$regex : searchRegExp}},
            ]
        };
        const options = {password : 0} 
        
        const users = await User.find(filter, options)
        .limit(limit)
        .skip((page - 1) * limit);

        const totalUsers = await User.countDocuments(filter);

        if(users.length){
            return successResponse(res,{
                statusCode : 200,
                message: "User list is returned from models",
                payload : {
                    users : users,
                    pagination:{
                        totalPages: Math.ceil(totalUsers / limit),
                        currentPage : page,
                        previousPage : page-1>0? page-1 : null,
                        nextPage : page+1<=Math.ceil(totalUsers / limit)? page+1 : null,
                    }
                }
            })
        }
        else{
            errorResponse(res,{statusCode:404,message:"No users found"});
        }
    }
    catch(err){
        next(err);
    }
};

//get user by id

const getUser= async (req, res, next) => {
    try{
        const id = req.params.id;
        const option = {password:0};
        
        const user = await User.findById(id, option);

        if(!user) {
            throw createError(404,"user  not found with this id");
        }
        return successResponse(res,{
            statusCode : 200,
            message: "User list is returned from models",
            payload : {
                user: user
            }
        })
    }
    catch(err){
        next(err);
    }
};

module.exports = { getUsers, getUser };