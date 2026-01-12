import speakeasy from 'speakeasy';
import jwt from 'jsonwebtoken';
import AccountRegisterAdminModels from '../models/AccountRegisterAdmin.models.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await AccountRegisterAdminModels.findOne({ email });

        // 1. Check if user exists and password matches
        if (!admin || admin.password !== password) { // Note: Use bcrypt.compare in production
            return res.status(401).json({ message: "خطأ في البريد الإلكتروني أو كلمة المرور" });
        }

        // 2. Check if 2FA is enabled
        if (admin.twoFAEnabled) {
            return res.status(200).json({ 
                requires2FA: true, 
                adminId: admin._id,
                message: "يرجى إدخال رمز التحقق من Google Authenticator" 
            });
        }

        // 3. If 2FA not enabled, login immediately
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ 
            success: true, 
            token, 
            admin: { name: admin.name, email: admin.email } 
        });

    } catch (error) {
        res.status(500).json({ message: "خطأ في الخادم" });
    }
};

export const verifyLoginOTP = async (req, res) => {
    const { adminId, token } = req.body;

    try {
        const admin = await AccountRegisterAdminModels.findById(adminId);
        
        const verified = speakeasy.totp.verify({
            secret: admin.twoFASecret,
            encoding: 'base32',
            token: token,
            window: 1 // drift allowance
        });

        if (verified) {
            const jwtToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.json({ success: true, token: jwtToken, admin: { name: admin.name, email: admin.email } });
        } else {
            res.status(400).json({ message: "رمز التحقق غير صحيح" });
        }
    } catch (error) {
        res.status(500).json({ message: "خطأ في التحقق" });
    }
};