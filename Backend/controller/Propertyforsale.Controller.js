import Servicerequestsale from "../models/Propertyforsale.models.js";



export const saveServiceRequest = async (req, res) => {
  try {
    const newRequest = new Servicerequestsale(req.body);
    await newRequest.save();
    res.status(201).json({ message: "تم حفظ البيانات بنجاح" });
  } catch (error) {
    res.status(500).json({ message: "خطأ في خادم البيانات", error: error.message });
  }
};