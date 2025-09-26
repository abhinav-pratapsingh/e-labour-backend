import sendMail from "../services/send-email.js"
import Otp from "../models/Otp.js";


const genOtp = ()=>{
    return Math.floor(100000+Math.random()*900000).toString();
}

const sendOtp = async (req,res)=>{
    console.log(req.body.email)
    const email = req.body.email;
    if(!email) return res.status(400).json({success:false,message:"please provide email"})
    const otp = genOtp().toString();
    console.log(otp);
    try{
    await Otp.deleteMany({email});
    await Otp.create({email,otp});
    const sent = await sendMail(email,"User",otp);
    if(sent){
    res.status(200).json({success:true,messaage:"OTP sent successfully"});
    }
    else{
        res.status(500).json({success:false,messaage:"internal server error"})
    }
    }
    catch(e){
        res.status(500).json({success:false,messaage:"internal server error"});
    }
}

export default sendOtp;