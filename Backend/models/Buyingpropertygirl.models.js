import mongoose from "mongoose";

const BuyingPropertygirlSchema = new mongoose.Schema(
  {
    // ====== Personal Data ======
    ownerName: { type: String, default: "" },
    nationality: { type: String, default: "" },
    gender: { type: String, default: "" },

    // ====== Filter Data ======
    propertyStatus: String, // جاهز | على الخارطة
    propertyType: String,
    location: String,
    rooms: String,
    bathrooms: String,
    area: String,
    propertyAge: String,    // Maps to 'age' from frontend
    priceLimit: String,
    paymentMethod: String,
    
    // ====== Contact Data ======
    contactName: String,
    contactMobile: String,
    
    // ====== System Data ======
    status: { type: String, default: "active" }, // active, closed
  },
  { timestamps: true }
);

const BuyingPropertygirl = mongoose.model("BuyingPropertygirl", BuyingPropertygirlSchema);

export default BuyingPropertygirl;