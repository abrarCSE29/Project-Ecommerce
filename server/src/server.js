const express = require('express')
const morgan = require('morgan')
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
const isLoggedIn = (req,res,next) => {
    const login = true;
    if(login){
        next();
    }
    else{
        res.status(401).send({message: 'Unauthorized'});
    }
    next();
}
app.get('/test', function(req, res){
    res.status(200).send({message : 'Welcome to the server'})
})

app.get("/api/user", isLoggedIn,(req,res)=>{
    res.status(200).send({message:"User profile is returned"})
})
app.get("/products",(req,res) => {
    res.status(200).send({message:"Products are returned"})
})
app.listen(3001, () => {
    console.log('Server is running on port 3001');
})