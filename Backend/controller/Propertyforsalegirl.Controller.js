
import axios from 'axios';
import FormData from 'form-data';
import Propertyforsalegril from '../models/Propertyforsalegirl.models.js';

// ---------------------------------------------------------
// 1. CREATE (Save Request & Upload to ImgBB)
// ---------------------------------------------------------
export const savePropertyRequestgirl = async (req, res) => {
  try {
    // Parse the JSON string from the FormData 'payload' field
    const data = JSON.parse(req.body.payload);
    let fileEntries = [];

    // Check if files exist
    if (req.files && req.files.length > 0) {
      
      const uploadPromises = req.files.map(async (file) => {
        // Convert buffer to Base64 (ImgBB easiest method)
        const base64Image = file.buffer.toString('base64');
        
        const formData = new FormData();
        formData.append("image", base64Image);

        // Upload to ImgBB API
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, 
          formData,
          {
            headers: { 
              ...formData.getHeaders()
            }
          }
        );

        // Return the schema object with the Public URL
        return {
          fileName: file.originalname,
          filePath: response.data.data.url, // <--- The ImgBB URL
          fileType: "image/png" // ImgBB standardizes formats
        };
      });

      // Wait for all uploads to complete
      fileEntries = await Promise.all(uploadPromises);
    }

    // Create MongoDB Document
    const newProperty = new Propertyforsalegril({
      ...data,
      files: fileEntries 
    });

    const savedProperty = await newProperty.save();

    res.status(201).json({ 
      success: true, 
      message: "Property request saved successfully!",
      data: savedProperty 
    });

  } catch (error) {
    console.error("Save/Upload Error:", error?.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: "Failed to save property request", 
      error: error.message 
    });
  }
};

// ---------------------------------------------------------
// 2. FILTER (Search)
// ---------------------------------------------------------
export const getAllServiceRequestsfiltergirl = async (req, res) => {
  try {
    const { propertyStatus, propertyType, location, rooms, bathrooms, priceLimit } = req.query;

    let filter = {};

    if (propertyStatus) filter.propertyStatus = propertyStatus;
    if (propertyType) filter.propertyType = propertyType;
    if (rooms) filter.rooms = rooms;
    if (bathrooms) filter.bathrooms = bathrooms;
    if (priceLimit) filter.priceLimit = priceLimit;

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    const requests = await Propertyforsalegril.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: "Search Error", error: error.message });
  }
};

// ---------------------------------------------------------
// 3. GET ALL
// ---------------------------------------------------------
export const getAllServiceRequestsgirl = async (req, res) => {
  try {
    const requests = await Propertyforsalegril.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fetch Error", error: error.message });
  }
};

// ---------------------------------------------------------
// 4. GET BY ID
// ---------------------------------------------------------
export const getServiceRequestByIdgirl = async (req, res) => {
  try {
    const request = await Propertyforsalegril.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }
    res.status(200).json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// ---------------------------------------------------------
// 5. UPDATE
// ---------------------------------------------------------
export const updateServiceRequestgirl = async (req, res) => {
  try {
    // Note: If you want to update images, you need to handle file uploads here too
    // For now, this just updates text fields
    const updatedRequest = await Propertyforsalegril.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }

    res.status(200).json({ success: true, message: "Update Success", data: updatedRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update Error", error: error.message });
  }
};

// ---------------------------------------------------------
// 6. DELETE
// ---------------------------------------------------------
export const deleteServiceRequestgirl = async (req, res) => {
  try {
    const deletedRequest = await Propertyforsalegril.findByIdAndDelete(req.params.id);
    if (!deletedRequest) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }
    res.status(200).json({ success: true, message: "Delete Success" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete Error", error: error.message });
  }
};