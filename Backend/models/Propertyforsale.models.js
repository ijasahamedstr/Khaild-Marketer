import mongoose from 'mongoose';

const PropertyforsaleSchema = new mongoose.Schema({
propertyStatus: String, // جاهز or على الخارطة
  propertyType: String,
  location: String,
  developer: String,
  area: String,
  rooms: String,
  bathrooms: String,
  propertyAge: String,
  priceLimit: String,
  priceOffer: String,
  isNegotiable: String,
  paymentMethod: String,
  notes: String,
  clientName: String,
  clientMobile: String,
  contactChannels: {
    chat: Boolean,
    whatsapp: Boolean,
    call: Boolean
  },
  files: [{
    filename: String,
    path: String,
    mimetype: String
  }],
  date: { type: Date, default: Date.now }
});

const Propertyforsale = mongoose.model('Propertyforsale', PropertyforsaleSchema);
export default Propertyforsale;
