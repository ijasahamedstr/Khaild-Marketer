import mongoose from 'mongoose';

const BuyingpropertySchema = new mongoose.Schema({
  propertyStatus: String,
  propertyType: String,
  location: String,
  developer: String,
  area: String,
  priceLimit: String,
  priceOffer: String,
  notes: String,
  name: String,
  mobile: String,
  channels: Object,
  createdAt: { type: Date, default: Date.now }
});

// Changed from module.exports to export default
const Buyingproperty = mongoose.model('Buyingproperty', BuyingpropertySchema);
export default Buyingproperty;