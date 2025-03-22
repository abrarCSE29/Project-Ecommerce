const createError = require('http-errors');



const getUsers=((req, res, next) => {
    try{
        res.status(200).json({
            message: "User list is returned from models",
            users : users
        });
    }
    catch(err){
        next(err);
    }
}); 


module.exports = { getUsers };