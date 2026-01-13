// New import method

import Buyingproperty from "../models/Buyingproperty.models.js";


export const saveRequest = async (req, res) => {
  try {
    const newRequest = new Buyingproperty(req.body);
    await newRequest.save();
    res.status(201).json({ success: true, message: "Saved Successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};