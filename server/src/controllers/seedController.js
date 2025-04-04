const User = require('../models/userModel');
const { data } = require('../routers/data');
const seedUser = async (req,res,next)=>{
    try{
        await User.deleteMany({});
        const users = await User.insertMany(data.users);
        return res.status(201).json(users);

    }
    catch(err){
      console.log(err);
      next(err);
    }
} 

module.exports = {seedUser};