const express = require('express');
const router= express.Router();
const bodyparser= require('body-parser');
const User = require('../Modules/User');
const  Joi = require('joi');

var jsonparser=bodyparser.json();
//Selecting all
const Uservalidation =Joi.object({
  Name:Joi.string().min(6).max(30).required(),
  Password: Joi.string().min(8).max(30).required()
});
router.get('/',jsonparser,async(req,res)=>{
    try{
        const user = await User.find();
        res.json(user)
    }catch(err){
        console.log(err)
    }
});
//adding user
router.post('/',jsonparser,async(req,res)=>{
try {
  const value = await Uservalidation.validateAsync(req.body)
  const user= new User({
    Name:req.body.Name,
    Password:req.body.Password
});
user.save()
  .then(data=>{res.json(data)})
  .catch(err=>{res.json(err)})

} catch (err) {
  res.json(err)
  console.log(err)
}
});   
 router.get('/Ask/:Question',jsonparser,async(req,res)=>{
   try {
       const Answer= await Question.find({Question:req.params.Question}).select('Answer -_id')
       res.json(Answer);
    } catch (err) {
      res.json(err)
   }
 })

 module.exports= router;