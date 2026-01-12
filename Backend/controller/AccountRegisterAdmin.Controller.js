import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import AccountRegisterAdminModels from '../models/AccountRegisterAdmin.models.js';

// Create New Admin
export const createAdmin = async (req, res) => {
  try {
    const admin = new AccountRegisterAdminModels(req.body);
    await admin.save();
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Generate 2FA QR Code
export const setup2FA = async (req, res) => {
  const { adminId } = req.body;
  const secret = speakeasy.generateSecret({ name: `RealEstate (${adminId})` });
  
  await AccountRegisterAdminModels.findByIdAndUpdate(adminId, { twoFASecret: secret.base32 });

  QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
    res.json({ qrCode: data_url });
  });
};

// Verify 2FA and Enable
export const verify2FA = async (req, res) => {
  const { adminId, token } = req.body;
  const admin = await AccountRegisterAdminModels.findById(adminId);

  const verified = speakeasy.totp.verify({
    secret: admin.twoFASecret,
    encoding: 'base32',
    token
  });

  if (verified) {
    admin.twoFAEnabled = true;
    await admin.save();
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
};



// Fetch all admins from MongoDB
export const getAllAdmins = async (req, res) => {
    try {
        // .select('-password') ensures we don't send sensitive passwords to the frontend
        const admins = await AccountRegisterAdminModels.find().select('-password');
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
};


// server/controller/AccountRegisterAdmin.Controller.js

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await AccountRegisterAdminModels.findOne({ email });
        if (!admin || admin.password !== password) {
            return res.status(401).json({ message: "بيانات الدخول غير صحيحة" });
        }

        if (admin.twoFAEnabled) {
            return res.json({ requires2FA: true, adminId: admin._id });
        }

        // Return user data for top bar
        res.json({ 
            success: true, 
            token: "JWT_TOKEN_HERE", 
            admin: { 
                name: admin.name, 
                profileImage: admin.profileImage 
            } 
        });
    } catch (error) {
        res.status(500).json({ message: "خطأ في الخادم" });
    }
};

