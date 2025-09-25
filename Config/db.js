import mongoose from "mongoose";

const  dbConnect = async (uri)=>{
await mongoose.connect(uri).then(()=> console.log("successfully connected to db")).catch((e)=> console.log(`error ${e}`));
};

export default dbConnect;