import Worker from "../models/Worker.js";

const findWorkers = async(req,res)=>{
    try{
        // const {Category} = req.body;
        if(req.role!= "admin"){
            return res.status(403).json({success:false,message:"you are not a admin"});
        }
        let query;
        // if(!Category){
        //     query = {}
        // }else{
        //     query = Category;
        // }
        const data = await Worker.find({}).populate("workerId","name email phone avatar createdAt adminContacted").sort({"workerID.createdAt":-1}).limit(2);
        res.status(200).json({message:"fetched worker successfully",success:true,data});
    }
    catch(e){
        console.log(e);
        res.status(500).json({success:false,message:"server error"});
    }
};

export {findWorkers};