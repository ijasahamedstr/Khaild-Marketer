import mongoose from 'mongoose';

const PropertyforsaleSchema = new mongoose.Schema({
  // 1. Property Status & Type
  propertyStatus: { type: String, required: true },
  propertyType: { type: String, required: true },
  
  // 2. Personal Profile
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

  // 5. Pricing
  priceLimit: { type: String },
  priceOffer: { type: String },
  isNegotiable: { type: String },

  // 6. Contact Channels
  contactChannels: {
    chat: { type: Boolean, default: false },
    whatsapp: { type: Boolean, default: false },
    call: { type: Boolean, default: false }
  },

  // 7. Submitter Details
  clientName: { type: String, required: true },
  clientMobile: { type: String, required: true },

  // 8. Notes
  notes: { type: String },

  // 9. Files (Stores the ImgBB URL in filePath)
  files: [{
    fileName: { type: String },
    filePath: { type: String }, // This will be the ImgBB public URL
    fileType: { type: String }
  }],

  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Propertyforsale = mongoose.model('Propertyforsale', PropertyforsaleSchema);

export default Propertyforsale;