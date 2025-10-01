import Reviews from "../models/Reviews.js";
import Booking from "../models/Booking.js";

const addReview = async (req,res)=>{
    const {rating,review,bookingId} = req.body;
    const {workerId} = req.params
    console.log(req._id);
    const userId = req._id;
    try {
        const booking = await Booking.findById(bookingId);
        if(!booking) return res.status(404).json({success:false,message:"booking not found"});
        if(booking.status !== "completed") return res.status(403).json({success:false,message:"booking is not completed yet"});
        const Review = await Reviews.findOne({worker:workerId , reviewer:userId,bookingId});
        if(Review){
            return res.status(403).json({success:false,message:"Review is already present for this worker"});
        }
            const newReview = await Reviews.create({rating,reviewer:userId,worker:workerId,review,bookingId});
            res.status(201).json({success:true,message:"review created successfully",review : newReview});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: `error - ${error.message}` });
    }
}

const getReview = async (req,res)=>{
    try {
        const {workerId} = req.params;
        console.log(_id);
        const reviews = await Reviews.find({ worker : workerId });
        res.status(200).json({ success: true, message: "Reviews fecth successfull", reviews });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: `error - ${error}` });
    }
}

const updateReview = async (req,res)=>{
    try {
        const reviewerId = req._id;
        const { reviewId } = req.params;
        const { rating,review } = req.body;
        const reviewerReview = await Reviews.findOne({ _id: reviewId, reviewer: reviewerId });
        if (!reviewerReview) {
            return res.status(400).json({ success: false, message: "Please try again" });
        }

        if (rating) reviewerReview.rating = rating;
        if (review) reviewerReview.review = review;

        const newReview = await reviewerReview.save();

        return res.status(200).json({ success: true, message: "review saved successfully", newReview });

    } catch (error) {
        res.status(500).json({ success: false, message: `error - ${error.message}` });
    }
}

const delReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const reviewerId = req._id; 

        const review = await Reviews.findOne({ _id: reviewId, reviewer: reviewerId });
        
        if (!review) {
            return res.status(404).json({ success: false, message: "Review not found or not authorized" });
        }

        await review.deleteOne();

        res.status(200).json({ success: true, message: "Review deleted successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: `Error - ${error.message}` });
    }
};



export {delReview,updateReview,getReview,addReview};