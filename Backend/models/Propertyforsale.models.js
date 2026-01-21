import mongoose from 'mongoose';

const PropertyforsaleSchema = new mongoose.Schema({
  // Property Status (Ready or Off-plan)
  propertyStatus: { type: String, required: true },
  
  // Property Type (Villa, Apartment, etc.)
  propertyType: { type: String, required: true },
  
  // Personal Data (The New Fields)
  ownerName: { type: String, required: true },
  nationality: { type: String },
  gender: { type: String },

  // Location & Developer
  location: { type: String, required: true },
  developer: { type: String },

  // Specs
  area: { type: String },
  rooms: { type: String },
  bathrooms: { type: String },
  propertyAge: { type: String },

  // Pricing
  priceLimit: { type: String },
  priceOffer: { type: String },
  isNegotiable: { type: String },

  // Contact Channels
  contactChannels: {
    chat: { type: Boolean, default: false },
    whatsapp: { type: Boolean, default: false },
    call: { type: Boolean, default: false }
  },

  // Client Details (The person filling the form)
  clientName: { type: String },
  clientMobile: { type: String },

  // Notes
  notes: { type: String },

  // File Uploads
  files: [{
    fileName: String,
    filePath: String,
    fileType: String
  }],

  createdAt: { type: Date, default: Date.now }
});

const Propertyforsale = mongoose.model('Propertyforsale', PropertyforsaleSchema);

export default Propertyforsale;