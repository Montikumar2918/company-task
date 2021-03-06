const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../Config/keys');
const requireLogin = require("../Middleware/requireLogin");
const User = mongoose.model('User')

router.get('/Users',(req,res) => {
    User.find()
        .then(Users => res.json(Users))
        .catch(err => res.status(400).json('Error: ' +err));
});

router.post('/register',(req,res)=>{
    const {name,email,password,bio,profilePic} = req.body
    
    if(!email || !name || !password || !bio || !profilePic){
        return res.status(422).json({error: "please enter valid credentials"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error: "user already exist"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword => {
            const user = new User({
                email,
                password : hashedpassword,
                name,
                bio,  
                profilePic
            })
            user.save()
            .then(user=>{
               
                 res.json({message: "saved successfully"})
                // const token = jwt.sign({_id:user._id},JWT_SECRET)
                // res.send({token}) 
            })
            .catch(err=>{
                console.log(err)
            })
        })
    })
    .catch(err=>{
        console.log(err)
    })
    
})


router.post('/login',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
               // res.json({message:"successfully signed in"})
               const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
               res.json({token}) 
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})


module.exports = router;