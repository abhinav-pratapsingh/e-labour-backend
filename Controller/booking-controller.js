import Booking from "../models/Booking.js";
import User from "../models/User.js";

const addBooking = async (req, res) => {
    const { workerId, amount, method, workDetails, serviceType, scheduledDate, street, city, state, zipCode } = req.body;
    const customerId = req._id;
    const bookingCode = `BKG-${Date.now()}-${Math.floor(Math.random() * 90000 + 10000)}`;
    const status = method==="online"?"completed":"pending";
    const scheduled = new Date(scheduledDate);
    scheduled.setUTCHours(0,0,0,0);
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

        const newBooking = await Booking.create({
            workerId, customerId,
            payment: {
                method,
                amount,
                status
            },
            workDetails, serviceType, scheduledDate:scheduled,
            location: {
                street,
                city,
                state,
                zipCode
            },
            bookingCode
        });

        res.status(201).json({ success: true, message: "booking created successfully", booking: newBooking });
    } catch (error) {
        console.error("Booking creation error:", error);
        res.status(500).json({success: false,message: "Failed to create booking",error: error.message,});
    }
};

const cancelBooking = async (rerq,res)=>{
    const {cancelReason} = req.body;
    const userId  = req._id;
    const role = req.role;
    const {bookingId} = req.params;
    try {
        const booking = await Booking.findById(bookingId);
        if(!booking) return res.status(404).json({ success: false, message: "Booking not found" });
        if((role === "customer" && booking.customerId.toString() != userId.toString() )|| (role==="worker" && booking.workerId.toString() != userId.toString() )){
            return res.status(403).json({ success: false, message: "you are not authorized to perform this action" });
        }
        booking.status = "cancelled";
        booking.cancelReason = cancelReason;
        booking.cancelledBy = role;
        await booking.save();
        res.status(200).json({success:true,message:"booking successfully cancelled",booking});
    } catch (error) {
        console.error("Booking creation error:", error);
        res.status(500).json({success: false,message: "Failed to cancel booking",error: error.message,});
    }
}

export {addBooking,cancelBooking};