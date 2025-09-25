import Otp from "../models/Otp.js";
import bcrypt from "bcrypt";

const verifyOtp = async (email,otp)=>{
    try {
        const sentOtp = await Otp.findOne({email:email});
        
        if(!sentOtp){
            console.log("inside sendotp");
            throw new Error("OTP is not found or expired");
        }
        const isVaild = await bcrypt.compare(otp,sentOtp.otp);
        console.log(isVaild);
        return isVaild;
    }
    catch(e){
        throw new Error(e.message||"issue with the server");
    }
}


export default verifyOtp;