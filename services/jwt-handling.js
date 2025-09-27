import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const tokenGen = async (userid,role)=>{
    const token = await jwt.sign({id:userid,role:role},process.env.JWT_SECRET,{expiresIn:"1d"});
    return token;
};

const verifyToken = async(token)=>{
    try{
    const data = jwt.verify(token,process.env.JWT_SECRET);
    return {userid:data.id,role:data.role};
    }
    catch(e){
        throw new Error("TOKEN is invaild or Expired");
    }
}

export {tokenGen,verifyToken};