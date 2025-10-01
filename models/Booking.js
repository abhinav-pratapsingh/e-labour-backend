import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
  status: {
    type: String,
    enum: ["pending", "approved", "cancelled", "completed"],
    default: "pending",
    required: true
  },
  
  payment: {
    method: { type: String, enum: ["offline", "online"], default: "offline", required: true },
    status: { type: String, enum: ["completed", "pending"],
     required: true },
    amount: { type: Number, min: 0 }
  },
  serviceType: { type: String, trim: true },

  bookingDate: { type: Date, default: Date.now },
  scheduledDate: { type: Date},

  location: {
    street:{type:String,
        required:true
    },
    city:{type:String,
        required:true
    },
    state:{type:String,
        required:true
    },
    zipCode:{type:String,
        required:true
    }
  },

  cancelledBy : { type: String, enum: ["worker", "customer", "system"] },
  cancelReason: { type: String, trim: true },

  bookingCode: { type: String, unique: true }
  
}, { timestamps: true });

const Booking =  mongoose.model("Booking", bookingSchema);

export default Booking;