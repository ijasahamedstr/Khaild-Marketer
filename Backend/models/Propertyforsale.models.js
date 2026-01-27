import mongoose from 'mongoose';

const PropertyforsaleSchema = new mongoose.Schema({
  // 1. Property Status & Type
  // Example: Ready (جاهز) or Off-plan (على الخارطة)
  propertyStatus: { type: String, required: true },
  propertyType: { type: String, required: true },
  
  // 2. Personal Profile (Owner/Agent Information)
  ownerName: { type: String, required: true },
  nationality: { type: String },
  gender: { type: String },

  // 3. Location & Developer
  location: { type: String, required: true },
  developer: { type: String },

  // 4. Specifications
  area: { type: String },
  rooms: { type: String },
  bathrooms: { type: String },
  propertyAge: { type: String },

  // 5. Pricing Logic
  priceLimit: { type: String },
  priceOffer: { type: String },
  isNegotiable: { type: String }, // Can be "Yes/No" or Boolean

  // 6. Contact Channels
  contactChannels: {
    chat: { type: Boolean, default: false },
    whatsapp: { type: Boolean, default: false },
    call: { type: Boolean, default: false }
  },

  // 7. Submitter Details
  clientName: { type: String, required: true },
  clientMobile: { type: String, required: true },

  // 8. Additional Info
  notes: { type: String },

  // 9. File Uploads (Matches your controller mapping)
  files: [{
    fileName: { type: String },
    filePath: { type: String },
    fileType: { type: String }
  }],

  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Propertyforsale = mongoose.model('Propertyforsale', PropertyforsaleSchema);

export default Propertyforsale;