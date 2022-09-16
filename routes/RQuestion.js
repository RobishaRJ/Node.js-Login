const express = require('express');
const router= express.Router();
const bodyparser= require('body-parser');
const Question = require('../modules/Question');
const User = require('../modules/User');
var jsonparser=bodyparser.json();
var http = require("http");
var {io}= require("socket.io-client")
var socket =io("http://127.0.0.1:4000");        function sendMessage(data,message) {
            socket.emit("messageSocket", {
        data,message
    });}
//Selecting all
router.get('/',async(req,res)=>{
    try{
        const user = await Question.find();
        res.json(user)
    }catch(err){
        res.json(err)
    }
});
//Saving Question and answer
router.post('/',jsonparser,(req,res)=>{
   
      const question= new Question({
        Question:req.body.Question,
        Answer:req.body.Answer,
        
    
    });
    question.save()
      .then(data=>{res.json(data),sendMessage(data,'New Data added')}
      )
      .catch(err=>{res.json(err)})
 });
//update Question and Answer
 router.patch('/Update/:Id',jsonparser,async(req,res)=>{
    try {
         const up= await Question.updateOne({_id: req.params.Id} ,{$set:{Question: req.body.Question,Answer:req.body.Answer}})
         sendMessage(up,"Data Updated")
         res.json(up);  
    } catch (err) {
        res.json(err)
    }
 
})

//delete any post by ID
router.delete('/delete/:Id',async(req,res)=>{
    console.log(req.params);
    try {
        const del = await Question.deleteOne({_id: req.params.Id})
        sendMessage(req.params.Id,"Data Deleted")
        res.json(Question.find())
    } catch (err) {
        res.json(err)
    }
   
})
 module.exports= router;