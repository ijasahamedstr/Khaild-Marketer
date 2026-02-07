import Contactgirl from "../models/Propertyfinishinggirl.models.js";


// 1. CREATE: Save a new contact
export const saveContactgirl = async (req, res) => {
  try {
    // 1. Destructure the fields sent from the React frontend
    const { name, mobile, directPhone, seventhRows } = req.body;

    // 2. Map the data to your schema
    // We check if 'mobile' (from form) or 'directPhone' (from quick-call) exists
    const newContact = new Contactgirl({
      name: name || "عميل مهتم", // Default name if empty
      mobile: mobile || directPhone, // Use whichever phone was provided
      directPhone: directPhone || "",
      // If seventhRows is used for specific service options
      contactMethod: (seventhRows && seventhRows.length > 0) ? seventhRows[0] : 'الموقع الإلكتروني',
      serviceType: "تشطيب العقار"
    });

    // 3. Save to MongoDB
    await newContact.save();

    // 4. Return success response
    res.status(201).json({ 
      success: true, 
      message: "تم حفظ البيانات بنجاح", 
      data: newContact 
    });

  } catch (error) {
    console.error("Save Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "حدث خطأ أثناء حفظ البيانات",
      error: error.message 
    });
  }
};

// 2. VIEW ALL: Get all contacts
export const getAllContactsgirl = async (req, res) => {
  try {
    const contacts = await Contactgirl.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 3. SINGLE VIEW: Get one contact by ID
export const getContactByIdgirl = async (req, res) => {
  try {
    const contact = await Contactgirl.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 4. UPDATE: Update a contact by ID
export const updateContactgirl = async (req, res) => {
  try {
    const { name, mobile, seventhRows } = req.body;
    const updatedData = {
      name,
      mobile,
      contactMethod: seventhRows ? seventhRows[0] : undefined
    };

    const contact = await Contactgirl.findByIdAndUpdate(
      req.params.id, 
      updatedData, 
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    res.status(200).json({ success: true, message: "Updated successfully", data: contact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 5. DELETE: Remove a contact by ID
export const deleteContactgirl = async (req, res) => {
  try {
    const contact = await Contactgirl.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};