import mongoose from 'mongoose';

const PropertyrentalSchema = new mongoose.Schema({
  propertyType: { type: String, required: true },
  status: { type: String, enum: ['مؤجر', 'مستأجر', 'غير محدد'], default: 'غير محدد' },
  location: { type: String },
  developer: { type: String },
  area: { type: String },
  priceLimit: { type: String },
  priceOffer: { type: String },
  notes: { type: String },
  contactChannels: {
    chat: { type: Boolean, default: false },
    whatsapp: { type: Boolean, default: false },
    call: { type: Boolean, default: false }
  },
  clientName: { type: String },
  clientMobile: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Propertyrental = mongoose.model('Propertyrental', PropertyrentalSchema);
export default Propertyrental;