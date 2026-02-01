import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    // ====== Client Data (From Pop-up) ======
    clientName: { type: String, required: true },
    clientMobile: { type: String, required: true },
    clientLocation: { type: String },
    bookingTime: { type: Date, required: true },

    // ====== Linked Property Data ======
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "BuyingProperty" },
    propertyType: String,
    propertyStatus: String,
    propertyPrice: String,
    propertyLocation: String,
    
    // ====== System Status ======
    status: { 
      type: String, 
      enum: ["pending", "confirmed", "completed", "cancelled"], 
      default: "pending" 
    },
    notes: String
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;