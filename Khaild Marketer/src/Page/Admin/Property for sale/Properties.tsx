import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  Box, Typography, Button, CircularProgress, IconButton, Pagination,
  Dialog, Divider, Chip, Stack, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, GlobalStyles, Tooltip, 
  InputAdornment, DialogTitle, DialogContent, DialogActions, TextField,
  Avatar, Backdrop, Container, Alert, Snackbar
} from "@mui/material";
import {
  WhatsApp, CallOutlined, Search, VisibilityOutlined, Scale, 
  DeleteOutline, PersonOutline, PhoneAndroidOutlined, BedOutlined, 
  HistoryToggleOff, CheckCircleOutline, 
  MapsHomeWorkOutlined, Close, Download, PlayCircleOutline, 
  Refresh, TrendingUp, PeopleAltOutlined, HomeWorkOutlined, 
  AssignmentOutlined, SecurityOutlined, BathtubOutlined, 
  BusinessCenterOutlined, PaymentsOutlined,
  WcOutlined, LanguageOutlined
} from "@mui/icons-material";

// --- SYSTEM THEME CONFIGURATION ---
const FONT_FAMILY = '"Tajawal", sans-serif !important';
const UI_COLORS = {
  primary: "#004652",
  secondary: "#006D77",
  accent: "#CC9D2F",
  danger: "#EF4444",
  success: "#10B981",
  background: "#F1F5F9",
  cardBg: "#FFFFFF",
  border: "#E2E8F0"
};

// --- DATA CONTRACTS (MAPPED TO MONGOOSE SCHEMA) ---
interface PropertyFile {
  fileName: string;
  filePath: string;
  fileType: string;
}

interface PropertyRequest {
  _id?: string;
  propertyStatus: string;
  propertyType: string;
  ownerName: string;
  nationality?: string;
  gender?: string;
  location: string;
  developer?: string;
  area?: string;
  rooms?: string;
  bathrooms?: string;
  propertyAge?: string;
  priceLimit?: string;
  priceOffer?: string;
  isNegotiable?: string;
  contactChannels: { 
    chat: boolean; 
    whatsapp: boolean; 
    call: boolean 
  };
  clientName?: string;
  clientMobile: string;
  notes?: string;
  files?: PropertyFile[];
  createdAt?: string;
}

const Properties: React.FC = () => {
  // --- STATE ORCHESTRATION ---
  const [requests, setRequests] = useState<PropertyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<PropertyRequest | null>(null);
  const [mediaActive, setMediaActive] = useState<PropertyFile | null>(null);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [syncSignal, setSyncSignal] = useState(0);
  const [notif, setNotif] = useState({ open: false, msg: "", type: "success" as any });

  const API_URL = import.meta.env.VITE_API_URL;
  const LIMIT = 12;

  // --- DATABASE OPERATIONS ---
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/save-request`);
      if (res.data.success) {
        setRequests(res.data.data);
      }
    } catch (err) {
      showNotif("فشل الاتصال بالخادم الرئيسي", "error");
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData, syncSignal]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await axios.delete(`${API_URL}/api/save-request/${deleteTarget}`);
      if (res.data.success) {
        setRequests(prev => prev.filter(r => r._id !== deleteTarget));
        showNotif("تم حذف السجل بنجاح", "success");
        setDeleteTarget(null);
      }
    } catch (err) {
      showNotif("حدث خطأ أثناء محاولة الحذف", "error");
    }
  };

  const showNotif = (msg: string, type: any) => setNotif({ open: true, msg, type });

  // --- ANALYTICS CALCULATIONS ---
  const stats = useMemo(() => {
    const total = requests.length;
    const ready = requests.filter(r => r.propertyStatus === 'جاهز').length;
    const offPlan = requests.filter(r => r.propertyStatus === 'على الخارطة').length;
    const totalVal = requests.reduce((acc, r) => acc + (parseFloat(r.priceOffer || r.priceLimit || "0")), 0);
    return { total, ready, offPlan, totalVal };
  }, [requests]);

  // --- FILTER & SEARCH ENGINE ---
  const filteredData = useMemo(() => {
    return requests.filter(item => {
      const searchStr = `${item.ownerName} ${item.clientMobile} ${item.location} ${item.propertyType} ${item.developer} ${item.clientName}`.toLowerCase();
      const matchesSearch = searchStr.includes(search.toLowerCase());
      const matchesFilter = filterStatus === "all" || item.propertyStatus === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [requests, search, filterStatus]);

  const pagedData = filteredData.slice((page - 1) * LIMIT, page * LIMIT);

  // --- REPORT GENERATION ---
  const exportToExcel = () => {
    const dataToExport = filteredData.map(r => ({
      "حالة العقار": r.propertyStatus,
      "اسم المالك": r.ownerName,
      "الجنسية": r.nationality || "غير محدد",
      "النوع": r.gender || "غير محدد",
      "نوع العقار": r.propertyType,
      "الموقع": r.location,
      "المطور": r.developer || "-",
      "المساحة": r.area,
      "الغرف": r.rooms,
      "دورات المياه": r.bathrooms,
      "السعر المعروض": r.priceOffer || "-",
      "حد السعر": r.priceLimit || "-",
      "اسم العميل": r.clientName || "-",
      "جوال العميل": r.clientMobile,
      "تاريخ الطلب": r.createdAt ? new Date(r.createdAt).toLocaleString("ar-SA") : "-"
    }));
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "PropertyData");
    XLSX.writeFile(wb, `RealEstate_Master_${Date.now()}.xlsx`);
  };

  if (loading) return (
    <Stack sx={{ height: "100vh" }} alignItems="center" justifyContent="center" spacing={2} bgcolor={UI_COLORS.background}>
      <CircularProgress thickness={5} size={60} sx={{ color: UI_COLORS.primary }} />
      <Typography variant="h6" sx={{ fontWeight: 800,fontFamily: FONT_FAMILY  }}>جاري تحميل الأنظمة والبيانات...</Typography>
    </Stack>
  );

  return (
    <Box sx={{ minHeight: "100vh", direction: "rtl", bgcolor: UI_COLORS.background, pb: 10 }}>
      <GlobalStyles styles={{ body: { fontFamily: FONT_FAMILY, margin: 0 }, "*": { fontFamily: FONT_FAMILY } }} />

      {/* --- HEADER --- */}
      <Box sx={{ bgcolor: UI_COLORS.primary, color: "#fff", py: 2, px: 4, position: "sticky", top: 0, zIndex: 1100, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: UI_COLORS.accent, width: 45, height: 45 }}><SecurityOutlined /></Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: -0.5 }}>نظام الأصول العقارية</Typography>
              <Typography variant="caption" sx={{ opacity: 0.8, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CheckCircleOutline sx={{ fontSize: 12 }} /> متصل بالسيرفر المركزي
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" color="inherit" onClick={() => setSyncSignal(s => s + 1)} startIcon={<Refresh />}>مزامنة</Button>
            <Button variant="contained" sx={{ bgcolor: UI_COLORS.accent, "&:hover": { bgcolor: "#b38a29" } }} onClick={exportToExcel} startIcon={<Download />}>تصدير التقارير</Button>
          </Stack>
        </Stack>
      </Box>

      <Container maxWidth={false} sx={{ mt: 4, px: { lg: 6 } }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
          <StatPanel label="إجمالي الطلبات" val={stats.total} icon={<AssignmentOutlined />} color="#3B82F6" />
          <StatPanel label="عقارات جاهزة" val={stats.ready} icon={<HomeWorkOutlined />} color="#10B981" />
          <StatPanel label="على الخارطة" val={stats.offPlan} icon={<TrendingUp />} color="#F59E0B" />
          <StatPanel label="متوسط القيم" val={(stats.totalVal / (stats.total || 1)).toLocaleString()} icon={<PaymentsOutlined />} color="#8B5CF6" />
        </Stack>

        <Paper sx={{ p: 3, mb: 3, borderRadius: "16px", border: `1px solid ${UI_COLORS.border}` }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} alignItems="center">
            <TextField 
              fullWidth
              placeholder="ابحث بالاسم، الموقع، الجوال أو نوع العقار..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
                sx: { borderRadius: "12px", bgcolor: "#F8FAFC" }
              }}
            />
            <Stack direction="row" spacing={1} sx={{ minWidth: 400 }}>
              {['all', 'جاهز', 'على الخارطة'].map((s) => (
                <Chip 
                  key={s}
                  label={s === 'all' ? "كافة الحالات" : s}
                  onClick={() => setFilterStatus(s)}
                  sx={{ 
                    px: 2, height: 45, fontWeight: 800,
                    bgcolor: filterStatus === s ? UI_COLORS.primary : "#E2E8F0",
                    color: filterStatus === s ? "#fff" : "#475569"
                  }}
                />
              ))}
            </Stack>
          </Stack>
        </Paper>

        <TableContainer component={Paper} sx={{ borderRadius: "16px", overflow: "hidden", border: `1px solid ${UI_COLORS.border}` }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="right" sx={{ fontWeight: 900, bgcolor: "#F8FAFC" }}>المالك</TableCell>
                <TableCell align="right" sx={{ fontWeight: 900, bgcolor: "#F8FAFC" }}>نوع العقار</TableCell>
                <TableCell align="right" sx={{ fontWeight: 900, bgcolor: "#F8FAFC" }}>الموقع</TableCell>
                <TableCell align="right" sx={{ fontWeight: 900, bgcolor: "#F8FAFC" }}>المطور</TableCell>
                <TableCell align="right" sx={{ fontWeight: 900, bgcolor: "#F8FAFC" }}>المساحة</TableCell>
                <TableCell align="right" sx={{ fontWeight: 900, bgcolor: "#F8FAFC" }}>السعر</TableCell>
                <TableCell align="center" sx={{ fontWeight: 900, bgcolor: "#F8FAFC" }}>التحكم</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pagedData.map((row) => (
                <TableRow key={row._id} hover>
                  <TableCell align="right">
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: row.propertyStatus === 'جاهز' ? "#E0F2F1" : "#FFF8E1", color: row.propertyStatus === 'جاهز' ? "#00796B" : "#F57F17", fontWeight: 900, fontSize: 14 }}>
                        {row.propertyStatus === 'جاهز' ? "ج" : "خ"}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 800 }}>{row.ownerName}</Typography>
                        <Typography variant="caption" color="textSecondary">{row.clientMobile}</Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell align="right"><Chip label={row.propertyType} size="small" variant="outlined" sx={{ fontWeight: 700 }} /></TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>{row.location}</TableCell>
                  <TableCell align="right">{row.developer || "عادي"}</TableCell>
                  <TableCell align="right">{row.area} م²</TableCell>
                  <TableCell align="right">
                    <Typography sx={{ fontWeight: 900, color: UI_COLORS.secondary }}>{row.priceOffer || row.priceLimit || "غير محدد"}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="التفاصيل"><IconButton onClick={() => setSelectedItem(row)} sx={{ color: UI_COLORS.primary, bgcolor: "#f0f4f5" }}><VisibilityOutlined /></IconButton></Tooltip>
                      <Tooltip title="حذف"><IconButton onClick={() => setDeleteTarget(row._id || null)} sx={{ color: UI_COLORS.danger, bgcolor: "#fff1f1" }}><DeleteOutline /></IconButton></Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack direction="row" justifyContent="center" sx={{ mt: 4 }}>
          <Pagination count={Math.ceil(filteredData.length / LIMIT)} page={page} onChange={(_, v) => setPage(v)} color="primary" size="large" />
        </Stack>
      </Container>

      {/* --- DETAIL MODAL --- */}
      <Dialog open={Boolean(selectedItem)} onClose={() => setSelectedItem(null)} fullWidth maxWidth="md">
        {selectedItem && (
          <Box sx={{ p: 4 }}>
            {/* Header Section */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h5" sx={{ fontWeight: 900 }}>تفاصيل الطلب: {selectedItem.propertyType}</Typography>
                <Chip 
                  label={selectedItem.propertyStatus} 
                  color={selectedItem.propertyStatus === 'جاهز' ? "success" : "warning"} 
                  sx={{ fontWeight: 900 }} 
                />
              </Stack>
              <IconButton onClick={() => setSelectedItem(null)}><Close /></IconButton>
            </Stack>
            
            <Divider sx={{ mb: 4 }} />

            {/* Main Data Grid */}
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
              {/* Column 1: Owner & Client Info */}
              <Stack spacing={3} sx={{ flex: 1 }}>
                <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 900 }}>بيانات المالك والعميل</Typography>
                <DataField icon={<PersonOutline />} label="اسم المالك" val={selectedItem.ownerName} />
                <DataField icon={<PeopleAltOutlined />} label="اسم العميل" val={selectedItem.clientName} />
                <DataField icon={<LanguageOutlined />} label="الجنسية" val={selectedItem.nationality} />
                <DataField icon={<WcOutlined />} label="الجنس" val={selectedItem.gender} />
                <DataField icon={<PhoneAndroidOutlined />} label="رقم الجوال" val={selectedItem.clientMobile} />
              </Stack>

              {/* Column 2: Property Specifications */}
              <Stack spacing={3} sx={{ flex: 1 }}>
                <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 900 }}>مواصفات العقار</Typography>
                <DataField icon={<MapsHomeWorkOutlined />} label="الموقع" val={selectedItem.location} />
                <DataField icon={<BusinessCenterOutlined />} label="المطور" val={selectedItem.developer} />
                <DataField icon={<Scale />} label="المساحة" val={`${selectedItem.area} م²`} />
                <DataField icon={<BedOutlined />} label="عدد الغرف" val={selectedItem.rooms} />
                <DataField icon={<BathtubOutlined />} label="دورات المياه" val={selectedItem.bathrooms} />
                <DataField icon={<HistoryToggleOff />} label="عمر العقار" val={selectedItem.propertyAge} />
              </Stack>
            </Stack>

            {/* Financial & Negotiation Section */}
            <Box sx={{ mt: 4, p: 3, bgcolor: "#F8FAFC", borderRadius: "12px", border: `1px solid ${UI_COLORS.border}` }}>
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <PaymentsOutlined /> المالية والتعاقد
              </Typography>
              <Stack direction="row" spacing={4} flexWrap="wrap">
                <Box sx={{ minWidth: 120 }}><Typography variant="caption">السعر المعروض</Typography><Typography variant="h6" sx={{ fontWeight: 900, color: UI_COLORS.success }}>{selectedItem.priceOffer || "N/A"}</Typography></Box>
                <Box sx={{ minWidth: 120 }}><Typography variant="caption">الحد السعري</Typography><Typography variant="h6" sx={{ fontWeight: 900, color: UI_COLORS.accent }}>{selectedItem.priceLimit || "N/A"}</Typography></Box>
                <Box sx={{ minWidth: 120 }}><Typography variant="caption">قابل للتفاوض</Typography><Typography variant="h6" sx={{ fontWeight: 900 }}>{selectedItem.isNegotiable || "غير محدد"}</Typography></Box>
              </Stack>
            </Box>

            {/* Notes Section */}
            {selectedItem.notes && (
              <Box sx={{ mt: 3, p: 2, bgcolor: "#FFFBEB", borderRadius: "8px", border: "1px solid #FEF3C7" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 900, color: "#92400E", mb: 0.5 }}>ملاحظات إضافية:</Typography>
                <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>{selectedItem.notes}</Typography>
              </Box>
            )}

            {/* Media Section */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>المرفقات والصور ({selectedItem.files?.length || 0})</Typography>
              {selectedItem.files && selectedItem.files.length > 0 ? (
                <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 2 }}>
                  {selectedItem.files.map((file, idx) => (
                    <Paper key={idx} onClick={() => setMediaActive(file)} sx={{ minWidth: 150, height: 150, cursor: "pointer", position: "relative", overflow: "hidden", borderRadius: "12px", border: `2px solid ${UI_COLORS.border}` }}>
                      {file.fileType.startsWith('image') ? (
                        <img src={`${API_URL}/${file.filePath}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="property" />
                      ) : (
                        <Stack alignItems="center" justifyContent="center" sx={{ height: '100%', bgcolor: '#1E293B', color: '#fff' }}>
                          <PlayCircleOutline fontSize="large" />
                          <Typography variant="caption">عرض الفيديو</Typography>
                        </Stack>
                      )}
                    </Paper>
                  ))}
                </Stack>
              ) : (
                <Typography variant="body2" color="textSecondary">لا توجد ملفات مرفقة لهذا الطلب</Typography>
              )}
            </Box>

            {/* Action Buttons */}
            <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
              <Button 
                fullWidth 
                variant="contained" 
                color="success" 
                sx={{ height: 50, fontWeight: 900, borderRadius: "12px" }} 
                startIcon={<WhatsApp />} 
                onClick={() => window.open(`https://wa.me/${selectedItem.clientMobile}`)}
              >
                مراسلة واتساب
              </Button>
              <Button 
                fullWidth 
                variant="contained" 
                sx={{ height: 50, fontWeight: 900, bgcolor: UI_COLORS.primary, borderRadius: "12px" }} 
                startIcon={<CallOutlined />} 
                onClick={() => window.open(`tel:${selectedItem.clientMobile}`)}
              >
                اتصال هاتفي
              </Button>
            </Stack>
          </Box>
        )}
      </Dialog>

      {/* --- MEDIA VIEWER & DELETE --- */}
      <Backdrop open={Boolean(mediaActive)} onClick={() => setMediaActive(null)} sx={{ zIndex: 2000, backdropFilter: "blur(10px)" }}>
        {mediaActive && (
          <Box onClick={(e) => e.stopPropagation()} sx={{ maxWidth: '90vw', maxHeight: '90vh' }}>
            {mediaActive.fileType.startsWith('image') ? (
              <img 
                src={mediaActive.filePath} 
                style={{ width: '100%', maxHeight: '80vh', borderRadius: "12px" }} 
                alt="preview" 
              />
            ) : (
              <video 
                controls 
                autoPlay 
                style={{ width: '100%', maxHeight: '80vh', borderRadius: "12px" }}
              >
                <source src={mediaActive.filePath} />
              </video>
            )}
          </Box>
        )}
      </Backdrop>

      <Dialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)}>
        <DialogTitle sx={{ fontWeight: 900 }}>تأكيد الحذف</DialogTitle>
        <DialogContent>هل أنت متأكد من حذف سجل المالك وباقي المرفقات نهائياً؟</DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setDeleteTarget(null)}>إلغاء</Button>
          <Button onClick={handleDelete} variant="contained" color="error" sx={{ fontWeight: 800 }}>تأكيد الحذف</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={notif.open} autoHideDuration={4000} onClose={() => setNotif({ ...notif, open: false })}>
        <Alert severity={notif.type} variant="filled" sx={{ fontWeight: 800 }}>{notif.msg}</Alert>
      </Snackbar>
    </Box>
  );
};

// --- HELPER COMPONENTS ---
const StatPanel = ({ label, val, icon, color }: any) => (
  <Paper sx={{ flex: 1, p: 3, borderRadius: "20px", border: `1px solid ${UI_COLORS.border}`, transition: "0.3s", "&:hover": { transform: "translateY(-5px)", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" } }}>
    <Stack direction="row" spacing={3} alignItems="center">
      <Box sx={{ p: 2, borderRadius: "15px", bgcolor: `${color}15`, color: color }}>{React.cloneElement(icon, { fontSize: "large" })}</Box>
      <Box><Typography variant="caption" sx={{ fontWeight: 800, color: "#64748B" }}>{label}</Typography><Typography variant="h4" sx={{ fontWeight: 900 }}>{val}</Typography></Box>
    </Stack>
  </Paper>
);

const DataField = ({ icon, label, val }: any) => (
  <Stack direction="row" spacing={2} alignItems="center">
    <Box sx={{ color: UI_COLORS.primary, display: "flex", p: 1, bgcolor: "#F1F5F9", borderRadius: "8px" }}>{icon}</Box>
    <Box><Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700 }}>{label}</Typography><Typography variant="body1" sx={{ fontWeight: 800 }}>{val || "غير مسجل"}</Typography></Box>
  </Stack>
);

export default Properties;