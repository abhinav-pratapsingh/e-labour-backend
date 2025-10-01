import Address from "../models/Address.js";
import Worker from "../models/Worker.js";
import Reviews from "../models/Reviews.js";


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

        if(!worker) return res.status(404).res.json({success:false, message:"worker details not found "});

        res.status(201).json({success:true,message:"details saved successfully",worker});

    } catch (error) {
        console.log(error.message);
         res.status(500).json({success:false,message:`error ${error.message}`});
    }
};

const getWorkerInfo = async (req,res)=>{
    const workerId = req._id;
    const role = req.role;
    if(role!="worker") return res.status(400).json({success:false,message:"you are not a worker"});
    try {
        const worker = await Worker.findOne({workerId}).populate("workerId","name email phone avatar.image").populate("address");
        res.status(200).json({success:true,message:"profile fetched successfully",worker});
    } catch (error) {
         console.log(error.message);
         res.status(500).json({success:false,message:`error ${error.message}`});
    }
}

const updateWorkerInfo = async (req,res)=>{
    const {name,phone,avatar,email,fName,dob,gender,workCategory,workingHr,weekends,skills, experience,reference,emergencyContact,rate,bio,street,city,state,zipCode} = req.body;
    const workerId = req._id;
    const role = req.role;
    if(role!=="worker") return res.status(400).json({success:false,message:"you are not a worker"});
    //continue later
}

const listWorkers = async(req,res)=>{
    const {workCategory} = req.query;
    try {
        const workers = await Worker.find({workCategory}).populate("address").populate("workerId","name avatar.image");
        if(!workers) return res.status(404).json({success:false,message:"worker not found for this category"});
        res.status(200).json({success:true,message:"workers fetched successfully",workers});
    } catch (error) {
        console.log(error.message);
         res.status(500).json({success:false,message:`error ${error.message}`});
    }

}

const fetchworkerProfile = async(req,res)=>{
    const {workerId} = req.params;
    try {
        const worker = await Worker.findOne({workerId}).populate("workerId","name email avatar").populate("address");
        if(!worker){
            return res.status(404).json({success:false,message:"worker doesn't exists"});
        }
        const reviews = await Reviews.find({ worker : workerId });
        res.status(200).json({success:true,message:"profile fetched successfully",data:{worker,reviews}});
    } catch (error) {
        console.log(error.message);
         res.status(500).json({success:false,message:`error ${error.message}`});
    }
}

export {workerAddInfo,getWorkerInfo,listWorkers,fetchworkerProfile};