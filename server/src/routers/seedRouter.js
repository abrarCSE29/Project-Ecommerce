const express = require('express');
const seedRouter = express.Router();
const {seedUser} = require('../controllers/seedController');

seedRouter.get("/users",seedUser);
seedRouter.get("/", function(req, res){
    res.status(200).send({message: "Welcome to the seed route"});
});
module.exports = {seedRouter};