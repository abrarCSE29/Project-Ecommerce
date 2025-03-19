const express = require('express')
const morgan = require('morgan')
const app = express();
const bodyParser = require('body-parser');
const createError = require('http-errors');

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
    
    next(createError(404, "route not found"));
})

//server error 
app.use((err,req,res,next)=>{
    return res.status(err.status || 500).json({
        success : false,
        message : err.message
    });
 
});

module.exports = app;