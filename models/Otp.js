import mongoose, { mongo } from "mongoose";
import bcrypt from 'bcrypt';

const otpSchema = new mongoose.Schema({
    email :{
        type:String,
        required:true,
        trim:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type : Date,
        default:Date.now,
        expires:300
    }
});

otpSchema.pre("save",async function(next){
    try{
    this.otp = await bcrypt.hash(this.otp,10);
    next();
    }
    catch(e){
        console.log(`error in presaving otp ${e}`);
        next(e);
    }
});

const Otp = mongoose.model("Otp",otpSchema);

export default Otp;