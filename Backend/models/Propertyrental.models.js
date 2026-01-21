import mongoose from 'mongoose';

const PropertyrentalSchema = new mongoose.Schema({
    // Role: Lessor (مؤجر) or Lessee (مستأجر)
    role: { type: String, enum: ['مؤجر', 'مستأجر'], required: true },
    
    // 1. Personal Profile (The New Integrated Fields)
    ownerName: { type: String, required: true }, // اسم المالك أو الوكيل
    nationality: { type: String },               // الجنسية
    gender: { type: String },                    // النوع (ذكر/أنثى)
    
    // 2. Property Selection
    propertyType: { type: String }, 
    
    // 3. Location & Specs
    location: { type: String, required: true },
    developer: { type: String },
    area: { type: String },
    rooms: { type: String },
    bathrooms: { type: String },
    age: { type: String },
    
    // 4. Price Logic
    priceLimit: { type: String }, 
    priceOffer: { type: String }, 
    priceSelectionTypes: {
        isLimit: { type: Boolean, default: false },
        isOffer: { type: Boolean, default: false }
    },

    // 5. Additional Info
    notes: { type: String },

    // 6. Sender/Submitter Identity
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    
    // 7. Contact Channels
    channels: {
        chat: { type: Boolean, default: true },
        whatsapp: { type: Boolean, default: true },
        call: { type: Boolean, default: false }
    },
    
    // 8. Media Files (Images/Videos)
    media: [{ 
        filename: String, 
        path: String,
        mimetype: String
    }],

    createdAt: { type: Date, default: Date.now }
});

const Propertyrental = mongoose.model('Propertyrental', PropertyrentalSchema);
export default Propertyrental;