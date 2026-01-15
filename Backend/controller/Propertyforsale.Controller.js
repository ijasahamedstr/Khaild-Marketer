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


// 2. VIEW ALL: Get all requests
export const getAllServiceRequests = async (req, res) => {
  try {
    const requests = await Servicerequestsale.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: "خطأ في جلب البيانات", error: error.message });
  }
};

// 3. SINGLE VIEW: Get one request by ID
export const getServiceRequestById = async (req, res) => {
  try {
    const request = await Servicerequestsale.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ success: false, message: "الطلب غير موجود" });
    }
    res.status(200).json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: "خطأ في خادم البيانات", error: error.message });
  }
};

// 4. UPDATE: Update a request by ID
export const updateServiceRequest = async (req, res) => {
  try {
    const updatedRequest = await Servicerequestsale.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ success: false, message: "الطلب غير موجود" });
    }

    res.status(200).json({ success: true, message: "تم تحديث البيانات بنجاح", data: updatedRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: "خطأ في التحديث", error: error.message });
  }
};

// 5. DELETE: Remove a request by ID
export const deleteServiceRequest = async (req, res) => {
  try {
    const deletedRequest = await Servicerequestsale.findByIdAndDelete(req.params.id);
    if (!deletedRequest) {
      return res.status(404).json({ success: false, message: "الطلب غير موجود" });
    }
    res.status(200).json({ success: true, message: "تم حذف الطلب بنجاح" });
  } catch (error) {
    res.status(500).json({ success: false, message: "خطأ في الحذف", error: error.message });
  }
};