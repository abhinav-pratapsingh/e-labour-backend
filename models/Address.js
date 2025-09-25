import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        validate:{
            validator : async (value)=>{
                const userexists = await mongoose.model('User').exists({_id:value});
                return userexists;
            },
            message:"invaild User id"
        }
    },
    name:String,
    phone:String,
    street:String,
    city:{type:String,
        uppercase:true,
        required:true
    },
    state:{type:String,
        uppercase:true,
        required:true
    },
    zipCode:Number 

});

const Address = mongoose.model("Address",addressSchema);

export default Address;