import Contact from "../models/Propertyfinishing.models.js";

export const saveContact = async (req, res) => {
  try {
    const { name, mobile, seventhRows } = req.body;
    
    const newContact = new Contact({
      name,
      mobile,
      contactMethod: seventhRows ? seventhRows[0] : ''
    });

    await newContact.save();
    res.status(201).json({ success: true, message: "Data saved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};