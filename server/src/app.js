const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routers/userRouter');

const app = express();

//middleware
const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later."
})


app.use(xssClean());
app.use(rateLimiter);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.use('/api/user',userRouter)

app.get('/test', rateLimiter,function(req, res){
    res.status(200).send({message : 'Welcome to the server'})
})

// app.get("/api/user",(req,res)=>{
//     res.status(200).send({message:"User profile is returned"})
// })
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