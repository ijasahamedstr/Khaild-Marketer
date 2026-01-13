import Propertyrental from "../models/Propertyrental.models.js";

export const createServiceRequest = async (req, res) => {
  try {
    const { 
      dropdowns, notes, channels, name, mobile, 
      location, developer, area, priceLimit, priceOffer, 
      isChecked1, isChecked2 
    } = req.body;

    const developerStatus = isChecked1 ? "مؤجر" : isChecked2 ? "مستأجر" : "غير محدد";

    const newRequest = new Propertyrental({
      propertyType: dropdowns[0],
      status: developerStatus,
      location,
      developer,
      area,
      priceLimit,
      priceOffer,
      notes,
      contactChannels: channels,
      clientName: name,
      clientMobile: mobile
    });

    await newRequest.save();
    res.status(201).json({ message: "Request saved successfully", data: newRequest });
  } catch (error) {
    res.status(500).json({ message: "Error saving request", error: error.message });
  }
};
