const express = require('express');
const mongoose= require('mongoose');
const jwt = require('jsonwebtoken');
const bodyparser= require('body-parser')
var jsonparser=bodyparser.json();
const userroute= require('./routes/RUser');
const User = require('./Modules/User');


//DataBase connection 
const app= express();
const dbcon=mongoose.connect('mongodb://127.0.0.1:27017/',{
 dbName:'Login',  
useNewUrlParser: true,
useUnifiedTopology:true
})//Port
 .then((result)=> app.listen(5000, console.log('listening')))
 .catch((err)=>console.log(err));

//User adding route
 app.use('/user', userroute)
//Login route
 app.post('/login',jsonparser ,async(req, res) => {
    console.log(req.body.Name)
    var d= await User.find({Name:req.body.Name,Password:req.body.Password})
    console.log(d)
   if(d.length>0){
  //Passing user from request 
  const user = {
    Phone_Number:req.body.Phone_Number,
    Password:req.body.Password,
  }
  
  jwt.sign({user}, 'RJ', { expiresIn: '30s' }, (err, token) => {
    res.json({
      token
      
    });console.log(token)
  });
  }else{
    console.log('err')
  }
})
  