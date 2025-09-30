import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    Worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bookingId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true
    },
    review: String,

    rating: {
        type: Number,
        enum : [1,2,3,4,5],
        required: true
    }

}, { timestamps: true });

const Reviews = mongoose.model("Reviews",reviewSchema);

export default Reviews;