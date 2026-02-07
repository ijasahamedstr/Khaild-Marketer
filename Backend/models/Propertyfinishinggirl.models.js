import mongoose from 'mongoose';

const ContactgirlSchema = new mongoose.Schema({
  // The user's full name from the second card
  name: { 
    type: String, 
    trim: true 
  },
  // The mobile number from the second card
  mobile: { 
    type: String, 
    trim: true 
  },
  // The "Direct Contact" input from the first card
  directPhone: { 
    type: String, 
    trim: true 
  },
  // Identifying which service page this came from
  serviceType: { 
    type: String, 
    default: "تشطيب العقار" 
  },
  // Metadata for your records
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, { 
  // Automatically creates updatedAt and createdAt fields
  timestamps: true 
});

// Optimization: Indexing the mobile number if you plan to search by it later
ContactgirlSchema.index({ mobile: 1, directPhone: 1 });

const Contactgirl = mongoose.model('Contactgirl', ContactgirlSchema);
export default Contactgirl;