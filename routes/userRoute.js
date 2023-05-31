const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const express=require("express");
const {Usermodel}=require("../models/userModel")
require("dotenv").config();

const userRoute=express.Router();

userRoute.post("/register",async(req,res)=>{
    let {name,email,password}=req.body;
    try {
        const reqUser= await Usermodel.find({email});
        if(reqUser.length!=0){
            return res.json({"msg":"Email already registered"});
        }
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                console.log("error while hashing the password",err);
                res.json({"msg":"error while registering"})
            }else{
                const savingData=new Usermodel({name,email,password:hash});
                await savingData.save();
                res.status(200).json({"msg":"Registeration Successfull"})
            }
        })
    } catch (error) {
        console.log("error while registering the user",error);
        res.json({"msg":"error while registering user"})
    }
})

userRoute.post("/login",async(req,res)=>{
    let {email,password}=req.body;

    try {
        let reqUser=await Usermodel.find({email});
        if(reqUser.length==0){
            return res.json({"msg":"Registeration first"})
        }
        bcrypt.compare(password,reqUser[0].password,async(err,result)=>{
            if(result){
                const token=jwt.sign({userId:reqUser[0]._id,name:reqUser[0].name},'secret');
                res.json({"msg":"Login Successfully","token":token})
            }else{
                res.json({"mag":"Wrong Credentials"})
            }
        })
    } catch (error) {
        console.log("error while login",error);
        res.json({"msg":"error while login"})
    }
})

module.exports={
    userRoute
}