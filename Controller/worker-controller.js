import Address from "../models/Address.js";
import Worker from "../models/Worker.js";


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


export {workerAddInfo,getWorkerInfo};