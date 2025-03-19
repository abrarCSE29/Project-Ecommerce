const express = require('express')
const morgan = require('morgan')
const app = express();
const bodyParser = require('body-parser');

app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.get('/test', function(req, res){
    res.status(200).send({message : 'Welcome to the server'})
})

app.get("/api/user",(req,res)=>{
    res.status(200).send({message:"User profile is returned"})
})
app.get("/products",(req,res) => {
    res.status(200).send({message:"Products are returned"})
})
//client error hadling
app.use((req,res,next)=>{
    res.status(404).json({message:"route not found"})
    next()
})

app.use((err,req,res,next)=>{
    res.status(500).json({message:"Internal server error"})
 
})

module.exports = app;