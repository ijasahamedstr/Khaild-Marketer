import mongoose from 'mongoose';

const PropertyforsaleSchema = new mongoose.Schema({
propertyStatus: String,
  propertyType: String,
  location: String,
  developer: String,
  area: String,
  rooms: String,
  bathrooms: String, // Added
  propertyAge: String, // Value from logic
  priceLimit: String,
  priceOffer: String,
  isNegotiable: String,
  notes: String,
  clientName: String,
  clientMobile: String,
  contactChannels: {
    chat: Boolean,
    whatsapp: Boolean,
    call: Boolean
  },
  files: [{
    fileName: String,
    path: String,
    mimetype: String
  }],
  createdAt: { type: Date, default: Date.now }
});

const Propertyforsale = mongoose.model('Propertyforsale', PropertyforsaleSchema);
export default Propertyforsale;
