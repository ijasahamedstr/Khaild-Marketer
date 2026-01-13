import mongoose from 'mongoose';

const ServicerequestsaleSchema = new mongoose.Schema({
  propertyStatus: String,
  propertyType: String,
  location: String,
  developer: String,
  area: String,
  priceLimit: String,
  priceOffer: String,
  notes: String,
  contactChannels: {
    chat: Boolean,
    whatsapp: Boolean,
    call: Boolean
  },
  clientName: String,
  clientMobile: String,
  createdAt: { type: Date, default: Date.now }
});

const servicerequestsale = mongoose.model('servicerequestsale', ServicerequestsaleSchema);
export default servicerequestsale;