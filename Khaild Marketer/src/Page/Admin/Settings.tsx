import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Stack,
  Paper,
  TextField,
  Button,
  Avatar,
  IconButton,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  PersonOutline,
  MailOutline,
  Visibility,
  VisibilityOff,
  CloudUpload,
  AddCircleOutline,
  RemoveRedEyeOutlined,
  ArrowBack,
  EditOutlined,
  Search,
  QrCode2,
  AccessTime,
  GppGoodOutlined,
  CheckCircle,
} from "@mui/icons-material";

const primaryTeal = "#004652";
const accentGold = "#CC9D2F";
const menuFont = "Tajawal, sans-serif";
const BASE_URL = import.meta.env.VITE_API_URL;

const AdminManagement: React.FC = () => {
  const [view, setView] = useState<"list" | "form" | "details">("list");
  const [admins, setAdmins] = useState<any[]>([]);
  const [filteredAdmins, setFilteredAdmins] = useState<any[]>([]); // For Search Logic
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Fetch from Database
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/all`);
      setAdmins(response.data);
      setFilteredAdmins(response.data); // Initialize filtered list
    } catch (error) {
      console.error("Error fetching admins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // --- SEARCH LOGIC ---
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = admins.filter(
      (admin) =>
        admin.name.toLowerCase().includes(query) ||
        admin.email.toLowerCase().includes(query)
    );
    setFilteredAdmins(filtered);
  }, [searchQuery, admins]);

  const handleAddNew = () => {
    setSelectedAdmin(null);
    setIsEditing(false);
    setView("form");
  };

  const handleViewDetails = (admin: any) => {
    setSelectedAdmin(admin);
    setView("details");
  };

  const handleFormSubmit = async (formData: any) => {
    try {
      await axios.post(`${BASE_URL}/api/create`, formData);
      fetchAdmins();
      setView("list");
      setSearchQuery(""); // Clear search on return
    } catch (error) {
      alert("Error saving account. Please try again.");
    }
  };

  const goBack = () => {
    setView("list");
    setSelectedAdmin(null);
    fetchAdmins();
  };

  return (
    <Box sx={{ direction: "rtl", width: "100%", pt: 0, pb: 5, px: { xs: 1, md: 0 }, textAlign: "right" }}>
      {/* --- HEADER --- */}
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={3} sx={{ mb: 5 }}>
        <Box sx={{ textAlign: "right" }}>
          <Typography variant="h3" sx={{ fontFamily: menuFont, fontWeight: 900, color: primaryTeal, fontSize: { xs: "2.2rem", md: "2.8rem" } }}>
            {view === "list" && "إدارة المسؤولين"}
            {view === "form" && (isEditing ? "تعديل البيانات" : "إنشاء مسؤول جديد")}
            {view === "details" && "ملف المسؤول"}
          </Typography>
        </Box>

        {view === "list" ? (
          <Button
            variant="contained"
            fullWidth={isMobile}
            onClick={handleAddNew}
            startIcon={<AddCircleOutline sx={{ ml: 1, fontSize: '1.5rem !important' }} />}
            sx={{ bgcolor: primaryTeal, fontFamily: menuFont, borderRadius: "14px", px: 6, py: 1.8, fontSize: "1.1rem", fontWeight: 800 }}
          >
            إضافة مسؤول
          </Button>
        ) : (
          <Button onClick={goBack} startIcon={<ArrowBack sx={{ ml: 1 }} />} sx={{ fontFamily: menuFont, color: primaryTeal, fontWeight: 800, fontSize: '1.1rem', alignSelf: { xs: "flex-end", sm: "center" } }}>
            العودة للقائمة
          </Button>
        )}
      </Stack>

      {loading ? (
        <Stack alignItems="center" sx={{ py: 10 }}><CircularProgress sx={{ color: primaryTeal }} /></Stack>
      ) : (
        <>
          {view === "list" && (
            <>
              {/* --- SEARCH BAR --- */}
              <TextField
                placeholder="البحث بالاسم أو البريد الإلكتروني..."
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ color: "#94A3B8", ml: 1, fontSize: '1.8rem' }} />,
                }}
                sx={{ 
                  mb: 4, 
                  "& .MuiOutlinedInput-root": { borderRadius: "18px", bgcolor: "#F8FAFC", fontFamily: menuFont, height: "65px", fontSize: '1.1rem' },
                  "& input": { textAlign: 'right' }
                }}
              />
              <AdminList admins={filteredAdmins} onView={handleViewDetails} onEdit={(admin: any) => { setSelectedAdmin(admin); setIsEditing(true); setView("form"); }} />
            </>
          )}
          {view === "form" && <AdminForm admin={selectedAdmin} isEditing={isEditing} onSave={handleFormSubmit} />}
          {view === "details" && <AdminDetails admin={selectedAdmin} onEdit={() => { setIsEditing(true); setView("form"); }} />}
        </>
      )}
    </Box>
  );
};

/* -------------------------------------------------------------------------- */
/* PAGE: LIST VIEW                                                            */
/* -------------------------------------------------------------------------- */
const AdminList = ({ admins, onView, onEdit }: any) => (
  <TableContainer component={Paper} elevation={0} sx={{ borderRadius: "28px", border: "1px solid #E2E8F0", overflowX: "auto" }}>
    <Table sx={{ minWidth: 900 }}>
      <TableHead sx={{ bgcolor: "#F8FAFC" }}>
        <TableRow>
          <TableCell sx={{ fontFamily: menuFont, fontWeight: 900, color: primaryTeal, py: 3.5, width: "100px", textAlign: "center", fontSize: '1.1rem' }}>#</TableCell>
          <TableCell sx={{ fontFamily: menuFont, fontWeight: 900, color: primaryTeal, px: 4, fontSize: '1.1rem', textAlign: "right" }}>الصورة</TableCell>
          <TableCell sx={{ fontFamily: menuFont, fontWeight: 900, color: primaryTeal, px: 4, fontSize: '1.1rem', textAlign: "right" }}>الاسم الكامل</TableCell>
          <TableCell sx={{ fontFamily: menuFont, fontWeight: 900, color: primaryTeal, px: 4, fontSize: '1.1rem', textAlign: "right" }}>الحالة</TableCell>
          <TableCell align="center" sx={{ fontFamily: menuFont, fontWeight: 900, color: primaryTeal, px: 4, fontSize: '1.1rem' }}>الإجراءات</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {admins.length > 0 ? (
          admins.map((admin: any, index: number) => (
            <TableRow key={admin._id} hover sx={{ transition: "0.2s" }}>
              <TableCell sx={{ py: 3, fontFamily: menuFont, fontWeight: 900, color: "#94A3B8", textAlign: "center", fontSize: '1.1rem' }}>
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </TableCell>
              <TableCell sx={{ py: 3, px: 4, textAlign: "right" }}>
                <Avatar src={admin.profileImage} sx={{ width: 60, height: 60, border: `2px solid ${primaryTeal}20` }} />
              </TableCell>
              <TableCell sx={{ py: 3, px: 4, textAlign: "right" }}>
                <Typography sx={{ fontFamily: menuFont, fontWeight: 800, color: primaryTeal, fontSize: "1.2rem" }}>{admin.name}</Typography>
                <Typography sx={{ fontFamily: menuFont, color: "#94A3B8", fontSize: "0.9rem" }}>{admin.email}</Typography>
              </TableCell>
              <TableCell sx={{ py: 3, px: 4, textAlign: "right" }}>
                <Chip 
                  label={admin.twoFAEnabled ? "مؤمن نشط" : "غير نشط"} 
                  sx={{ fontFamily: menuFont, fontWeight: 900, fontSize: "0.85rem", bgcolor: admin.twoFAEnabled ? "rgba(16, 185, 129, 0.15)" : "rgba(100, 116, 139, 0.15)", color: admin.twoFAEnabled ? "#10B981" : "#64748B", borderRadius: "12px", px: 1.5, py: 2 }} 
                />
              </TableCell>
              <TableCell align="center" sx={{ py: 3, px: 4 }}>
                <Stack direction="row" spacing={3} justifyContent="center">
                  <IconButton onClick={() => onView(admin)} sx={{ bgcolor: "#F1F5F9", color: primaryTeal, p: 2 }}><RemoveRedEyeOutlined sx={{ fontSize: 26 }} /></IconButton>
                  <IconButton onClick={() => onEdit(admin)} sx={{ bgcolor: "#FFFBEB", color: accentGold, p: 2 }}><EditOutlined sx={{ fontSize: 26 }} /></IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} sx={{ textAlign: 'center', py: 5, fontFamily: menuFont, fontSize: '1.2rem', color: '#94A3B8' }}>
              لا توجد نتائج تطابق بحثك...
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

/* -------------------------------------------------------------------------- */
/* PAGE: FORM VIEW (IMAGE URL POP-UP)                                         */
/* -------------------------------------------------------------------------- */
const AdminForm = ({ admin, isEditing, onSave }: any) => {
  const [showPass, setShowPass] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [tempUrl, setTempUrl] = useState("");
  const [formData, setFormData] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
    password: "",
    profileImage: admin?.profileImage || "",
  });

  const handleUrlSubmit = () => {
    setFormData({ ...formData, profileImage: tempUrl });
    setOpenPopup(false);
  };

  return (
    <Paper elevation={0} sx={{ p: { xs: 4, md: 7 }, borderRadius: "40px", bgcolor: "#F8FAFC", border: "1px solid #E2E8F0", maxWidth: "900px", mx: "auto" }}>
      <Stack spacing={5}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ position: "relative" }}>
            <Avatar 
              src={formData.profileImage} 
              sx={{ width: 140, height: 140, bgcolor: "#fff", border: "6px solid #fff", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", fontSize: '3rem', fontWeight: 900 }}
            >
                {!formData.profileImage && (formData.name ? formData.name[0] : <PersonOutline sx={{fontSize: 70, color: "#94A3B8"}}/>)}
            </Avatar>
            <IconButton 
              onClick={() => { setTempUrl(formData.profileImage); setOpenPopup(true); }}
              sx={{ position: "absolute", bottom: 5, right: 5, bgcolor: primaryTeal, color: "#fff", border: "4px solid #fff", p: 1.5, '&:hover': { bgcolor: '#00353d' } }}
            >
              <CloudUpload sx={{ fontSize: 24 }} />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 4 }}>
          <TextField 
            fullWidth label="الاسم الكامل" 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "20px", bgcolor: "#fff", height: '65px' }, "& label": { fontFamily: menuFont, right: 20, left: 'auto', transformOrigin: 'right', fontWeight: 700 }, "& input": { textAlign: 'right' } }} 
          />
          <TextField 
            fullWidth label="البريد الإلكتروني" 
            value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "20px", bgcolor: "#fff", height: '65px' }, "& label": { fontFamily: menuFont, right: 20, left: 'auto', transformOrigin: 'right', fontWeight: 700 }, "& input": { textAlign: 'right' } }} 
          />
          <TextField
            fullWidth
            type={showPass ? "text" : "password"}
            label={isEditing ? "كلمة المرور الجديدة (اختياري)" : "كلمة المرور"}
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            sx={{ gridColumn: { md: "span 2" }, "& .MuiOutlinedInput-root": { borderRadius: "20px", bgcolor: "#fff", height: '65px' }, "& label": { fontFamily: menuFont, right: 20, left: 'auto', transformOrigin: 'right', fontWeight: 700 }, "& input": { textAlign: 'right' } }}
            InputProps={{ endAdornment: <IconButton onClick={() => setShowPass(!showPass)} sx={{ p: 2 }}>{showPass ? <VisibilityOff /> : <Visibility />}</IconButton> }}
          />
        </Box>
        <Button variant="contained" onClick={() => onSave(formData)} sx={{ bgcolor: primaryTeal, py: 2.5, borderRadius: "20px", fontFamily: menuFont, fontWeight: 900, fontSize: "1.2rem" }}>
          {isEditing ? "حفظ التغييرات" : "إنشاء الحساب الآن"}
        </Button>
      </Stack>

      <Dialog open={openPopup} onClose={() => setOpenPopup(false)} dir="rtl">
        <DialogTitle sx={{ fontFamily: menuFont, fontWeight: 900, textAlign: 'right' }}>إضافة رابط الصورة</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontFamily: menuFont, mb: 2, textAlign: 'right' }}>يرجى إدخال رابط (URL) الصورة الشخصية للمسؤول:</Typography>
          <TextField
            fullWidth
            autoFocus
            placeholder="https://example.com/image.jpg"
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenPopup(false)} sx={{ fontFamily: menuFont, color: "#64748B" }}>إلغاء</Button>
          <Button onClick={handleUrlSubmit} variant="contained" sx={{ bgcolor: primaryTeal, fontFamily: menuFont, px: 4 }}>تحديث الصورة</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

/* -------------------------------------------------------------------------- */
/* PAGE: DETAILS VIEW                                                         */
/* -------------------------------------------------------------------------- */
const AdminDetails = ({ admin, onEdit }: any) => {
  const [qrCode, setQrCode] = useState("");
  const [token, setToken] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSetup2FA = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/setup-2fa`, { adminId: admin._id, email: admin.email });
      setQrCode(res.data.qrCode);
      setIsVerifying(true);
    } catch (error) {
      alert("Failed to generate QR Code");
    }
  };

  const handleVerify2FA = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/verify-2fa`, { adminId: admin._id, token });
      if (res.data.success) {
        alert("2FA Enabled Successfully!");
        window.location.reload();
      }
    } catch (error) {
      alert("Invalid code. Please try again.");
    }
  };

  return (
    <Paper elevation={0} sx={{ p: { xs: 5, md: 8 }, borderRadius: "40px", border: "1px solid #E2E8F0", bgcolor: "#fff", maxWidth: "950px", mx: "auto", textAlign: "right" }}>
      <Stack spacing={6}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={4} alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={4} alignItems="center">
            <Avatar src={admin?.profileImage} sx={{ width: 140, height: 140, bgcolor: primaryTeal, fontSize: 48, fontWeight: 900, border: `4px solid #fff`, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>{admin.name[0]}</Avatar>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="h4" sx={{ fontFamily: menuFont, fontWeight: 900, color: primaryTeal, fontSize: '2.5rem' }}>{admin.name}</Typography>
              <Typography sx={{ color: "#64748B", fontFamily: menuFont, fontWeight: 700, fontSize: '1.3rem' }}>{admin.role || "Admin"}</Typography>
            </Box>
          </Stack>
          <Button variant="outlined" startIcon={<EditOutlined sx={{ml: 1}}/>} onClick={onEdit} sx={{ fontFamily: menuFont, borderColor: accentGold, color: accentGold, borderRadius: "16px", px: 5, py: 1.5, fontWeight: 800 }}>تعديل البيانات</Button>
        </Stack>
        
        <Divider />

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 4 }}>
          <DetailItem label="البريد الإلكتروني" value={admin.email} icon={<MailOutline sx={{fontSize: '2rem'}}/>} />
          <DetailItem label="تاريخ إنشاء الحساب" value={new Date(admin.createdAt).toLocaleDateString('ar-EG')} icon={<AccessTime sx={{fontSize: '2rem'}}/>} />
        </Box>

        <Paper variant="outlined" sx={{ p: 4, borderRadius: "32px", bgcolor: "#F8FAFC", border: "1px dashed #E2E8F0" }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={4} alignItems="center">
              <Box sx={{ bgcolor: "#fff", p: 2, borderRadius: "20px", border: "1px solid #E2E8F0", textAlign: 'center' }}>
                  {qrCode ? (
                    <img src={qrCode} alt="QR Code" style={{ width: '180px' }} />
                  ) : (
                    <QrCode2 sx={{ fontSize: '120px', color: primaryTeal, opacity: admin.twoFAEnabled ? 1 : 0.2 }} />
                  )}
              </Box>
              <Box sx={{ flexGrow: 1, textAlign: "right" }}>
                  <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-start" sx={{ mb: 1.5 }}>
                      <Typography sx={{ fontFamily: menuFont, fontWeight: 900, color: primaryTeal, fontSize: '1.4rem' }}>Google Authenticator (2FA)</Typography>
                      {admin.twoFAEnabled ? <CheckCircle sx={{ color: '#10B981', fontSize: '2.5rem' }} /> : <GppGoodOutlined sx={{ color: '#94A3B8', fontSize: '2.5rem' }} />}
                  </Stack>
                  <Typography sx={{ fontFamily: menuFont, color: "#64748B", fontSize: '1.1rem', mb: 2 }}>
                    {admin.twoFAEnabled ? "الحساب مؤمن بالكامل عبر المصادقة الثنائية." : "عزز أمان حسابك عن طريق ربطه بتطبيق Google Authenticator."}
                  </Typography>
                  {!admin.twoFAEnabled && (
                    isVerifying ? (
                      <Stack spacing={2} alignItems="flex-start">
                        <TextField size="small" placeholder="000 000" value={token} onChange={(e) => setToken(e.target.value)} sx={{ bgcolor: '#fff', maxWidth: '200px' }} />
                        <Button variant="contained" onClick={handleVerify2FA} sx={{ bgcolor: primaryTeal, fontFamily: menuFont }}>تأكيد</Button>
                      </Stack>
                    ) : (
                      <Button variant="contained" onClick={handleSetup2FA} sx={{ bgcolor: primaryTeal, px: 4, py: 1.5, fontFamily: menuFont, fontWeight: 800 }}>بدء الإعداد الآن</Button>
                    )
                  )}
              </Box>
          </Stack>
        </Paper>
      </Stack>
    </Paper>
  );
};

const DetailItem = ({ label, value, icon }: any) => (
  <Box sx={{ p: 4, bgcolor: "#F8FAFC", borderRadius: "28px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: 2, textAlign: "right" }}>
    <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-start">
      <Box sx={{ color: primaryTeal, bgcolor: "#fff", p: 1.5, borderRadius: "12px", display: "flex", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>{icon}</Box>
      <Typography variant="caption" sx={{ fontFamily: menuFont, color: "#94A3B8", fontWeight: 800, fontSize: "1.1rem" }}>{label}</Typography>
    </Stack>
    <Typography sx={{ fontFamily: menuFont, fontWeight: 800, color: primaryTeal, fontSize: "1.4rem", mr: 6 }}>{value}</Typography>
  </Box>
);

export default AdminManagement;