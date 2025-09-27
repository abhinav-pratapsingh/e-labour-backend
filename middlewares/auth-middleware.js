import { verifyToken } from "../services/jwt-handling.js";

const authMiddleware = async(req,res,next)=>{
    try{
    const token = req.headers.token;
    if(!token){
        return res.status(401).json({success:false,message:"unauthorized access"});
    }
    const data = await verifyToken(token);
    req._id = data.userid;
    req.role = data.role;
    next();
}catch(e){
    console.log(e);
    res.status(401).json({success:false,message:`${e.message}`});
}
}

export default authMiddleware;
