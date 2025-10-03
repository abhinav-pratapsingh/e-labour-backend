import Address from "../models/Address.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

const addBooking = async (req, res) => {
    const { workerId, amount, method,serviceType, scheduledDate,addressId } = req.body;
    const customerId = req._id;
    scheduledDate.toString();
    console.log(scheduledDate);
    const bookingCode = `BKG-${Date.now()}-${Math.floor(Math.random() * 90000 + 10000)}`;
    const status = method === "online" ? "completed" : "pending";
    const scheduled = new Date(scheduledDate);
    scheduled.setUTCHours(0, 0, 0, 0);
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const maxDate = new Date(today);
    maxDate.setUTCDate(today.getDate() + 2);
    try {
        const workerExists = await User.findById(workerId);
        if (!workerExists || workerExists.role !== "worker") {
            return res.status(404).json({ success: false, message: "Worker not found" });
        }

        const existingBooking = await Booking.findOne({
            workerId,
            scheduledDate: scheduled,
            status: { $in: ["pending", "approved"] }
        });

        if (existingBooking) {
            return res.status(409).json({
                success: false,
                message: "Worker is already booked on this date"
            });
        }

        if (scheduled < today || scheduled > maxDate) {
            return res.status(400).json({
                success: false,
                message: "You can only book a worker for today, tomorrow, or the day after tomorrow."
            });
        }
        const address = await Address.findById(addressId);
        console.log(address);
        if(!address||address.user!=customerId) return res.status(404).json({success:false,message:"address not found"});
        const newBooking = await Booking.create({
            workerId, customerId,
            payment: {
                method,
                amount,
                status
            },
            serviceType, scheduledDate: scheduled,
            location: {
                street:address.street,
                city:address.city,
                state:address.state,
                zipCode:address.zipCode
            },
            bookingCode
        });

        res.status(201).json({ success: true, message: "booking created successfully", booking: newBooking });
    } catch (error) {
        console.log("Booking creation error:", error);
        res.status(500).json({ success: false, message: "Failed to create booking", error: error.message, });
    }
};

const cancelBooking = async (req, res) => {
    const { cancelReason } = req.body;
    const userId = req._id;
    const role = req.role;
    const { bookingId } = req.params;
    try {
        const booking = await Booking.findOne({_id:bookingId,status:{$in:["pending","approved"]}});
        if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
        if ((role === "customer" && booking.customerId.toString() != userId.toString()) || (role === "worker" && booking.workerId.toString() != userId.toString())) {
            return res.status(403).json({ success: false, message: "you are not authorized to perform this action" });
        }
        booking.status = "cancelled";
        booking.cancelReason = cancelReason;
        booking.cancelledBy = role;
        await booking.save();
        res.status(200).json({ success: true, message: "booking successfully cancelled", booking });
    } catch (error) {
        console.error("Booking creation error:", error);
        res.status(500).json({ success: false, message: "Failed to cancel booking", error: error.message, });
    }
}

const showUpcomingBookings = async(req,res)=>{
    const userId = req._id;
    const role = req.role;
    const {q} = req.query;
    try {
        let query = {};
        if(q){
            query.status=q
        }
        if(q==="upcoming"){
            query.status={$in:["pending","approved"]}
        }
        if(role=="customer"){
            query.customerId = userId;
        }else if(role == "worker"){
            query.workerId = userId;
        }
        else{
            return res.status(400).json({success:false,message:"you are not authorized"});
        }
        const bookings = await Booking.find(query).populate("workerId","name email phone avatar").populate("customerId","name email phone avatar").sort({scheduledDate:1});
        res.status(200).json({success:true,message:"bookigs fetched succesfully",bookings});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:`error ${error.message}`});
    }
}

const updateBookingStatus = async (req,res)=>{
    const {bookingId} = req.params;
    const {status} = req.query;
    const userId = req._id; 
    const role = req.role;
    try {
        let query = {};
        if(role==="customer"){
            query.customerId = userId;
        }
        else if(role==="worker"){
            query.workerId = userId;
        }
        else{
            return res.status(403).json({ success: false, message: "you are not authorized to perform this action" });
        }
        const booking = await findById(bookingId)
    } catch (error) {
        
    }
}

export { addBooking, cancelBooking,showUpcomingBookings};