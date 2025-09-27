import User from "../models/User.js";
import verifyOtp from "../services/verify-otp.js";
import fileUpload from "../services/file-upload.js";
import { tokenGen } from "../services/jwt-handling.js";
import bcrypt from "bcrypt";

const register = async (req,res)=>{
    const {email,phone,password,name,role,isTAndCAgree} = req.body;
    const image = req.file;

    try{
        // const newotp = otp.toString();
        const user = await User.findOne({email:email});
        if(user.email==email && user.role==role ){
            return res.status(409).json({success:false,message : "User Already Exists..."});
        }
        // if(await verifyOtp(email,newotp)){
            const img = await fileUpload(image);
            const newUser = new User({email,name,phone,password,role,isTAndCAgree,avatar:{image:img.url,publicId:img.publicId}});
            const token = await tokenGen(newUser._id);
            await newUser.save();
            res.status(201).json({success:true,message:"user created successfully",token});
        // }
        // else{
        //     res.status(400).json({success:false,message:"otp does not matched"});
        // }
    }
    catch(e){
        res.status(500).json({success:false,message:`error ${e}`});
    }
}

const login = async (req,res)=>{
    const {email,password,role} = req.body;
    try{
    const user = await User.findOne({email:email,role});
    if(!user){
        return res.status(404).json({success:false,message:"Invaild credentials"});
    }
    if(user.role!=role){
        return res.status(403).json({success:false,message:"Login through correct portal"});
    }
    const isPassVaild = await bcrypt.compare(password,user.password);
    console.log(isPassVaild)
    if(isPassVaild){
        const token = await tokenGen(user._id);
        return res.status(200).json({success:true,message:"login successfull",token});
    }
    else{
        return res.status(400).json({success:false,message:"invaild credentials"});
    }
    }
    catch(e){
        res.status(500).json({success:false,message:`Internal server error`});
    }
    
}

export {register,login};