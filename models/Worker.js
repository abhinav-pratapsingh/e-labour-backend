import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
    workerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fName: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    workCategory: { type: String, required: true },
    workingHr: { type: String, required: true },
    weekends: { type: Boolean, default: false },
    skills: [{ type: String }],
    experience: { type: String },
    emergencyInfo: { contact: String, name: String },
    rate: { type: Number },
    bio: { type: String },
    address : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"Address",
        required:true
    }
});

const Worker = mongoose.model("Worker", workerSchema);

export default Worker;