import Address from "../models/Address.js";
import Worker from "../models/worker.js";


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


export {workerAddInfo};