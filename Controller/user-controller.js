import User from "../models/User.js";
import verifyOtp from "../services/verify-otp.js";
import fileUpload from "../services/file-upload.js";
import { tokenGen } from "../services/jwt-handling.js";
import bcrypt from "bcrypt";
import Address from "../models/Address.js";
import Worker from "../models/worker.js";

const register = async (req,res)=>{
    const {email,phone,password,name,role,isTAndCAgree} = req.body;
    const image = req.file;

    try{
        // const newotp = otp.toString();
        const user = await User.findOne({email:email,role});
        if(user){
            return res.status(409).json({success:false,message : "User Already Exists..."});
        }
        // if(await verifyOtp(email,newotp)){
            const img = await fileUpload(image);
            const newUser = new User({email,name,phone,password,role,isTAndCAgree,avatar:{image:img.url,publicId:img.publicId}});
            const token = await tokenGen(newUser._id,role);
            await newUser.save();
            res.status(201).json({success:true,message:"user created successfully",token});
        // }
        // else{
        //     res.status(400).json({success:false,message:"otp does not matched"});
        // }
    }
    catch(e){
        console.log(e);
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
        const token = await tokenGen(user._id,role);
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

const workerAddInfo = async (req,res)=>{
    const {fName,dob,gender,workCategory,workingHr,weekends,skills, experience,reference,emergencyContact,rate,bio,street,city,state,zipCode} =req.body;
    const workerId = req._id;
    const role = req.role;
    if(role =="customer"){
        return res.status(400).json({success:false,message:"you are not a worker"});
    }
    try {
        const isAddress = await Address.findOne({user:workerId,role:"worker"});
        if(isAddress) return res.status(409).json({success:false,message : "address already present"});
            const address = new Address({
            user:workerId,
            role:"worker",
            street,
            city,
            state,
            zipCode
            });
        await address.save();

        const worker = await Worker.create({workerId,fName,dob,gender,workCategory,workingHr,weekends,skills, experience,
            emergencyInfo: { 
                contact: emergencyContact, 
                name: reference
            },

            rate,bio,address:address._id});

        res.status(201).json({success:true,message:"details saved successfully",worker})

    } catch (error) {
        console.log(error.message);
         res.status(500).json({success:false,message:`error ${error.message}`});
    }
}

export {register,login,workerAddInfo};