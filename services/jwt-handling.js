import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const tokenGen = async (userid)=>{
    const token = await jwt.sign({id:userid},process.env.JWT_SECRET,{expiresIn:"1d"});
    return token;
};

const verifyToken = async(token)=>{
    try{
    const data = jwt.verify(token,process.env.JWT_SECRET);
    return {userid:data.id};
    }
    catch(e){
        throw new Error("TOKEN is invaild or Expired");
    }
}

export {tokenGen,verifyToken};