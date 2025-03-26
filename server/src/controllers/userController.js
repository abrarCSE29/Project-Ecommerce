const createError = require('http-errors');
const User = require('../models/userModel');

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

        if(!users) throw createError(404, 'No users found');
        res.status(200).json({
            message: "User list is returned from models",
            users : users,
            pagination:{
                totalPages: Math.ceil(totalUsers /limit),
                currentPage : page,
                previousPage : page-1>0? page-1 : null,
                nextPage : page+1<=Math.ceil(totalUsers / limit)? page+1 : null,
            }
        });
    }
    catch(err){
        next(err);
    }
}; 


module.exports = { getUsers };