import jwt from 'jsonwebtoken';
import AccountRegisterAdminModels from '../models/AccountRegisterAdmin.models.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (Bearer <token>)
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SUPER_SECRET_KEY');

      // Get user from the token and attach to request (excluding password)
      req.admin = await AccountRegisterAdminModels.findById(decoded.id).select('-password');
      
      next();
    } catch (error) {
      res.status(401).json({ message: "غير مصرح لك، الرمز غير صالح" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "غير مصرح لك، لا يوجد رمز وصول" });
  }
};

// Optional: Specific check for "Super Admin" role
export const adminOnly = (req, res, next) => {
  if (req.admin && req.admin.role === 'مدير نظام') {
    next();
  } else {
    res.status(403).json({ message: "هذا الإجراء مسموح به لمدير النظام فقط" });
  }
};