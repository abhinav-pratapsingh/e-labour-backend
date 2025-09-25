import Address from "../models/Address.js";


const addAddress = async (req,res)=>{
    try {
        const {name,phone,street,state,zipCode,city} = req.body;
        const userID = req._id;
        const userAddresses = await Address.find({user:userID});
        if(userAddresses.length<3){
            const newaddress = await Address.create({user:userID,name,phone,street,state,city,zipCode});
            return res.status(201).json({success:true,message:"Address saved successfully",newaddress});
        }
        else{
             return res.status(409).json({success:false,message:"You can save upto 3 addresses only"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:`error - ${error}`});
    }
}

const getAddress = async (req,res)=>{

}

const updateAddress = async(req,res)=>{

}

const deleteAddress = async(req,res)=>{

}


export {addAddress,getAddress,updateAddress,deleteAddress};