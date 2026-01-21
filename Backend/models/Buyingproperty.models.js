import mongoose from 'mongoose';

const BuyingpropertySchema = new mongoose.Schema({
  // Property Info
  propertyStatus: String,
  propertyType: String,
  location: String,
  developer: String,
  
  // Personal Profile (The New Fields)
  ownerName: String,     // اسم المشتري أو الوكيل
  nationality: String,   // الجنسية
  gender: String,        // النوع

  // Property Specs
  area: String,
  rooms: String,
  bathrooms: String,
  propertyAge: String,

  // Budget & Payment
  priceLimit: String,
  priceOffer: String,
  paymentMethod: String,

  // Additional Details
  notes: String,

  // Sender Contact Details
  name: String,
  mobile: String,
  channels: {
    chat: Boolean,
    whatsapp: Boolean,
    call: Boolean
  },

  createdAt: { type: Date, default: Date.now }
});

const Buyingproperty = mongoose.model('Buyingproperty', BuyingpropertySchema);

export default Buyingproperty;