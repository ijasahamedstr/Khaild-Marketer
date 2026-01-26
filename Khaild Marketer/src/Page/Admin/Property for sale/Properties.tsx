import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  Box, Typography, Button, CircularProgress, IconButton, Pagination,
  Dialog, Zoom, Stack, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, GlobalStyles, Tooltip, 
  InputAdornment, DialogTitle, DialogContent, DialogActions, TextField,
  Card, Avatar, Fade,Chip
} from "@mui/material";
import {
  LocationOn, WhatsApp, FileDownloadOutlined,
  Search, VisibilityOutlined, Scale, DeleteOutline,
  Speed, PersonOutline, 
  BedOutlined, BathtubOutlined, HistoryToggleOff, Public,
  CollectionsOutlined, ImageNotSupportedOutlined, OpenInNew, CheckCircleOutline,
  AssignmentOutlined, PeopleAltOutlined, TrendingUp, PaymentsOutlined, 
  Refresh, FilterList, MoreVert,SecurityOutlined
} from "@mui/icons-material";

// --- Visual Configurations ---
const TAJAWAL = "'Tajawal', sans-serif";
const accentGold = "#CC9D2F";
const UI_COLORS = {
  primary: "#004652",
  secondary: "#64748B",
  accent: "#CC9D2F",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
  bg: "#F8FAFC",
  white: "#FFFFFF"
};

// --- Interfaces ---
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
  priceOffer?: string;
  isNegotiable?: string;
  notes?: string;
  clientName?: string;
  clientMobile?: string;
  createdAt?: string;
  files?: PropertyFile[];
}

// --- Main Component ---
const Properties: React.FC = () => {
  const [requests, setRequests] = useState<PropertyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [viewRequest, setViewRequest] = useState<PropertyRequest | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [syncSignal, setSyncSignal] = useState(0);

  const apiHost = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // --- Data Fetching ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${apiHost}/api/save-request`);
        if (res.data.success) setRequests(res.data.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiHost, syncSignal]);

  // --- Dashboard Logic & Analytics ---
  const stats = useMemo(() => {
    const total = requests.length;
    const lessors = requests.filter(r => r.propertyStatus?.includes("مؤجر") || r.propertyStatus?.includes("عرض")).length;
    const lessees = requests.filter(r => r.propertyStatus?.includes("مستأجر") || r.propertyStatus?.includes("طلب")).length;
    const totalVal = requests.reduce((acc, curr) => {
      const price = parseFloat(curr.priceOffer?.replace(/[^\d.]/g, '') || "0");
      return acc + price;
    }, 0);

    return {
      total,
      lessors,
      lessees,
      avgVal: total > 0 ? (totalVal / total).toLocaleString() : "0"
    };
  }, [requests]);

  // --- Handlers ---
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await axios.delete(`${apiHost}/api/save-request/${deleteId}`);
      if (res.data.success) {
        setRequests(prev => prev.filter(item => item._id !== deleteId));
        setDeleteId(null);
      }
    } catch (err) {
      alert("حدث خطأ أثناء الحذف");
    }
  };

  const exportToExcel = () => {
    const formatted = filtered.map(item => ({
      "اسم المالك": item.ownerName,
      "الموقع": item.location,
      "نوع العقار": item.propertyType,
      "السعر": item.priceOffer,
      "التاريخ": item.createdAt ? new Date(item.createdAt).toLocaleDateString("ar-EG") : ""
    }));
    const ws = XLSX.utils.json_to_sheet(formatted);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "PropertyData");
    XLSX.writeFile(wb, `Enterprise_Report_${Date.now()}.xlsx`);
  };

  // --- Filtering ---
  const filtered = requests.filter(r =>
    r.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.ownerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.clientMobile?.includes(searchTerm) ||
    r.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ITEMS_PER_PAGE = 8;
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  if (loading) return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: 2 }}>
      <CircularProgress size={60} thickness={4} sx={{ color: accentGold }} />
      <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 700 }}>جاري تحميل البيانات المؤسسية...</Typography>
    </Box>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: UI_COLORS.bg, minHeight: "100vh", direction: "rtl" }}>
      <GlobalStyles styles={{ body: { fontFamily: TAJAWAL, backgroundColor: UI_COLORS.bg } }} />

      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        justifyContent="space-between" 
        alignItems="center" 
        sx={{ 
          bgcolor: UI_COLORS.primary, 
          color: "#fff", 
          py: 2, 
          px: 4, 
          position: "sticky", 
          top: 0, 
          zIndex: 1100, 
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)" 
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
          <Avatar sx={{ bgcolor: UI_COLORS.accent, width: 45, height: 45 }}>
            <SecurityOutlined />
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 900, color: "#fff", fontFamily: TAJAWAL }}>
              المنصة المركزية لإدارة العقارات
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)", fontFamily: TAJAWAL }}>
              مرحباً بك في لوحة تحكم الأصول العقارية والطلبات الرقمية
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mt: { xs: 2, md: 0 } }}>
          <Button 
            variant="outlined" 
            onClick={() => setSyncSignal(s => s + 1)} 
            startIcon={<Refresh />}
            sx={{ 
              borderRadius: "12px", fontFamily: TAJAWAL, border: "1.5px solid #fff", color: "#fff",
              "&:hover": { border: "1.5px solid #fff", bgcolor: 'rgba(255, 255, 255, 0.1)' } 
            }}
          >
            تحديث
          </Button>
          <Button 
            variant="contained" 
            onClick={exportToExcel}
            startIcon={<FileDownloadOutlined />} 
            sx={{ 
              borderRadius: "12px", fontFamily: TAJAWAL, bgcolor: "#fff", color: UI_COLORS.primary,
              "&:hover": { bgcolor: "#f0f0f0" }, boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
            }}
          >
            تصدير Excel
          </Button>
        </Stack>
      </Stack>

      {/* --- ANALYTICS STATS PANELS --- */}
      <Box sx={{ p: 4 }}>
        <Stack 
          direction={{ xs: 'column', lg: 'row' }} 
          spacing={3} 
          sx={{ mb: 5, '& > *': { flex: 1 } }}
        >
          <StatPanel 
            label="إجمالي الوحدات" 
            val={stats?.total || 0} 
            icon={<AssignmentOutlined />} 
            color={UI_COLORS.info} 
          />
          <StatPanel 
            label="عروض الملاك (مؤجر)" 
            val={stats?.lessors || 0} 
            icon={<PeopleAltOutlined />} 
            color={UI_COLORS.success} 
          />
          <StatPanel 
            label="طلبات المستأجرين" 
            val={stats?.lessees || 0} 
            icon={<TrendingUp />} 
            color={UI_COLORS.warning} 
          />
          <StatPanel 
            label="متوسط القيمة السوقية" 
            val={stats?.avgVal || 0} 
            icon={<PaymentsOutlined />} 
            color="#8B5CF6" 
          />
        </Stack>
      </Box>

      {/* --- TOOLBAR SECTION --- */}
      <Card sx={{ borderRadius: "20px", mb: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #E2E8F0' }}>
        <Box sx={{ p: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
          <TextField 
            placeholder="ابحث بواسطة المالك، الموقع، رقم الجوال..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ 
              flexGrow: 1,
              "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#F1F5F9", "& fieldset": { border: "none" } }
            }}
            InputProps={{ startAdornment: ( <InputAdornment position="start"> <Search sx={{ color: UI_COLORS.secondary }} /> </InputAdornment> ) }}
          />
          <Button variant="outlined" startIcon={<FilterList />} sx={{ borderRadius: "12px", px: 3, fontFamily: TAJAWAL, color: UI_COLORS.secondary, borderColor: "#E2E8F0" }}>تصفية متقدمة</Button>
        </Box>
      </Card>

      {/* --- DATA TABLE --- */}
      <TableContainer component={Paper} sx={{ borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.04)", border: "1px solid #E2E8F0" }}>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead sx={{ bgcolor: "#F8FAFC" }}>
            <TableRow>
              {["هوية المالك", "حالة الأصول", "الموقع الجغرافي", "المساحة الكلية", "القيمة التقديرية", "الملفات", "الإجراءات"].map(h => (
                <TableCell key={h} align="right" sx={{ fontWeight: 800, fontFamily: TAJAWAL, color: UI_COLORS.primary, py: 2.5, borderBottom: '2px solid #EDF2F7' }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((item) => (
              <TableRow key={item._id} hover sx={{ transition: '0.2s', "&:hover": { bgcolor: "#F1F5F9" } }}>
                <TableCell align="right">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: UI_COLORS.primary, fontSize: '0.9rem', fontWeight: 700 }}>{item.ownerName?.[0]}</Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontFamily: TAJAWAL, fontSize: '0.95rem' }}>{item.ownerName}</Typography>
                      <Typography sx={{ fontSize: "0.75rem", color: UI_COLORS.secondary }}>{item.clientMobile}</Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell align="right">
                  <Chip 
                    label={item.propertyStatus} 
                    size="small" 
                    sx={{ 
                      fontFamily: TAJAWAL, 
                      fontWeight: 700, 
                      bgcolor: item.propertyStatus?.includes("مؤجر") ? "#ECFDF5" : "#FFFBEB", 
                      color: item.propertyStatus?.includes("مؤجر") ? "#059669" : "#D97706",
                      borderRadius: '8px'
                    }} 
                  />
                </TableCell>
                <TableCell align="right">
                   <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                     <LocationOn sx={{ fontSize: 16, color: UI_COLORS.secondary }} />
                     <Typography sx={{ fontFamily: TAJAWAL, fontSize: '0.9rem' }}>{item.location}</Typography>
                   </Stack>
                </TableCell>
                <TableCell align="right" sx={{ fontFamily: TAJAWAL, fontWeight: 600 }}>{item.area} <Typography component="span" sx={{ fontSize: '0.7rem', color: UI_COLORS.secondary }}>م²</Typography></TableCell>
                <TableCell align="right">
                  <Typography sx={{ fontWeight: 900, color: UI_COLORS.primary, fontFamily: TAJAWAL }}>{item.priceOffer} <Typography component="span" sx={{ fontSize: '0.7rem' }}>SAR</Typography></Typography>
                </TableCell>
                <TableCell align="right">
                  {item.files && item.files.length > 0 ? (
                    <Tooltip title="عرض المرفقات">
                      <Chip label={item.files.length} icon={<CollectionsOutlined fontSize="small" />} size="small" clickable sx={{ bgcolor: "#E2E8F0", "&:hover": { bgcolor: "#CBD5E1" } }} />
                    </Tooltip>
                  ) : <Typography sx={{ color: '#CBD5E1' }}>-</Typography>}
                </TableCell>
                <TableCell align="right">
                   <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <IconButton onClick={() => setViewRequest(item)} sx={{ color: UI_COLORS.primary, bgcolor: "#F0F9FA", "&:hover": { bgcolor: "#E0F2F4" } }}><VisibilityOutlined fontSize="small" /></IconButton>
                      <IconButton onClick={() => setDeleteId(item._id || null)} sx={{ color: UI_COLORS.danger, bgcolor: "#FEF2F2", "&:hover": { bgcolor: "#FEE2E2" } }}><DeleteOutline fontSize="small" /></IconButton>
                   </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* --- PAGINATION --- */}
      <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
        <Pagination 
          count={Math.ceil(filtered.length / ITEMS_PER_PAGE)} 
          page={page} 
          onChange={(_, v) => setPage(v)} 
          size="large"
          color="primary"
          sx={{ "& .MuiPaginationItem-root": { fontFamily: TAJAWAL, fontWeight: 700, borderRadius: '12px' } }}
        />
      </Box>

      {/* --- DETAIL DIALOG (ENHANCED) --- */}
      <Dialog 
        open={Boolean(viewRequest)} 
        onClose={() => setViewRequest(null)} 
        fullWidth 
        maxWidth="md" 
        TransitionComponent={Zoom}
        PaperProps={{ sx: { borderRadius: '24px', p: 1 } }}
      >
        {viewRequest && (
          <Box>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 900, fontFamily: TAJAWAL, color: UI_COLORS.primary }}>ملف الوحدة العقارية</Typography>
              <IconButton onClick={() => setViewRequest(null)}><MoreVert /></IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Stack spacing={4}>
                {/* Image Gallery */}
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 800, fontFamily: TAJAWAL, color: UI_COLORS.secondary }}>المرفقات الصورية والمعاينة:</Typography>
                  <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', py: 1 }}>
                    {viewRequest.files?.map((f, i) => (
                      <Card key={i} sx={{ minWidth: 200, borderRadius: '16px', position: 'relative' }}>
                        <Box component="img" src={`${apiHost}/${f.filePath}`} sx={{ width: '100%', height: 140, objectFit: 'cover' }} />
                        <IconButton size="small" sx={{ position: 'absolute', top: 5, right: 5, bgcolor: 'white' }} onClick={() => window.open(`${apiHost}/${f.filePath}`)}><OpenInNew fontSize="inherit" /></IconButton>
                      </Card>
                    ))}
                    {(!viewRequest.files || viewRequest.files.length === 0) && (
                      <Box sx={{ width: '100%', p: 4, textAlign: 'center', border: '2px dashed #E2E8F0', borderRadius: '16px' }}>
                        <ImageNotSupportedOutlined sx={{ color: '#CBD5E1', fontSize: 40 }} />
                        <Typography sx={{ color: '#94A3B8', fontFamily: TAJAWAL }}>لا توجد وسائط لهذا العقار</Typography>
                      </Box>
                    )}
                  </Box>
                </Box>

                {/* Grid Info */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                   <SectionCard title="بيانات التعاقد">
                      <DetailRow icon={<PersonOutline />} label="الطرف الأول" value={viewRequest.ownerName} />
                      <DetailRow icon={<Public />} label="الجنسية" value={viewRequest.nationality || "سعودي"} />
                      <DetailRow icon={<CheckCircleOutline />} label="نوع الطلب" value={viewRequest.propertyStatus} />
                      <DetailRow icon={<HistoryToggleOff />} label="تاريخ الإدراج" value={new Date(viewRequest.createdAt || "").toLocaleDateString("ar-EG")} />
                   </SectionCard>
                   
                   <SectionCard title="المواصفات الهندسية">
                      <DetailRow icon={<Speed />} label="التصنيف" value={viewRequest.propertyType} />
                      <DetailRow icon={<BedOutlined />} label="غرف النوم" value={viewRequest.rooms || "0"} />
                      <DetailRow icon={<BathtubOutlined />} label="دورات المياه" value={viewRequest.bathrooms || "0"} />
                      <DetailRow icon={<Scale />} label="المساحة الصافية" value={`${viewRequest.area} م²`} />
                   </SectionCard>
                </Box>

                <Box sx={{ p: 3, bgcolor: "#F8FAFC", borderRadius: '16px', borderLeft: `6px solid ${UI_COLORS.accent}` }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, fontFamily: TAJAWAL, mb: 1 }}>ملاحظات الإدارة:</Typography>
                  <Typography sx={{ fontFamily: TAJAWAL, color: UI_COLORS.secondary, lineHeight: 1.8 }}>{viewRequest.notes || "لا توجد ملحوظات إضافية مسجلة لهذا الأًصل في الوقت الحالي."}</Typography>
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 3, gap: 2 }}>
                <Button fullWidth variant="contained" startIcon={<WhatsApp />} sx={{ bgcolor: '#25D366', borderRadius: '12px', fontFamily: TAJAWAL }} onClick={() => window.open(`https://wa.me/${viewRequest.clientMobile?.replace(/\D/g,'')}`)}>مراسلة العميل</Button>
                <Button fullWidth variant="outlined" sx={{ borderRadius: '12px', fontFamily: TAJAWAL }} onClick={() => setViewRequest(null)}>إغلاق الملف</Button>
            </DialogActions>
          </Box>
        )}
      </Dialog>

      {/* --- DELETE CONFIRMATION --- */}
      <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)} TransitionComponent={Fade}>
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Avatar sx={{ bgcolor: '#FEE2E2', color: UI_COLORS.danger, width: 60, height: 60, mx: 'auto', mb: 2 }}><DeleteOutline fontSize="large" /></Avatar>
          <Typography variant="h6" sx={{ fontFamily: TAJAWAL, fontWeight: 900 }}>هل أنت متأكد من الحذف؟</Typography>
          <Typography sx={{ fontFamily: TAJAWAL, color: UI_COLORS.secondary, mt: 1 }}>هذا الإجراء سيؤدي إلى حذف كافة البيانات والصور المرفقة نهائياً من الخوادم.</Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button fullWidth onClick={() => setDeleteId(null)} sx={{ fontFamily: TAJAWAL, color: UI_COLORS.secondary }}>تراجع</Button>
            <Button fullWidth variant="contained" onClick={handleDelete} sx={{ bgcolor: UI_COLORS.danger, fontFamily: TAJAWAL, "&:hover": { bgcolor: "#dc2626" } }}>تأكيد الحذف</Button>
          </Stack>
        </Box>
      </Dialog>
    </Box>
  );
};

// --- SUB-COMPONENTS ---

const StatPanel = ({ label, val, icon, color }: any) => (
  <Paper sx={{ p: 3, borderRadius: "24px", display: 'flex', alignItems: 'center', gap: 2.5, border: "1px solid #E2E8F0", transition: '0.3s', "&:hover": { transform: 'translateY(-5px)', boxShadow: '0 12px 24px rgba(0,0,0,0.05)' } }}>
    <Box sx={{ p: 2, borderRadius: "18px", bgcolor: `${color}15`, color: color, display: 'flex', fontSize: '2rem' }}>{icon}</Box>
    <Box>
      <Typography sx={{ fontSize: "0.9rem", color: UI_COLORS.secondary, fontFamily: TAJAWAL, fontWeight: 500 }}>{label}</Typography>
      <Typography variant="h5" sx={{ fontWeight: 900, color: "#1E293B", fontFamily: TAJAWAL, mt: 0.5 }}>{val}</Typography>
    </Box>
  </Paper>
);

const SectionCard = ({ title, children }: any) => (
  <Box sx={{ p: 2, border: '1px solid #EDF2F7', borderRadius: '20px' }}>
    <Typography sx={{ mb: 2, fontWeight: 800, fontFamily: TAJAWAL, color: UI_COLORS.primary, fontSize: '0.9rem', borderBottom: '1px solid #EDF2F7', pb: 1 }}>{title}</Typography>
    <Stack spacing={1.5}>{children}</Stack>
  </Box>
);

const DetailRow = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
  <Stack direction="row" justifyContent="space-between" alignItems="center">
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Box sx={{ color: accentGold, display: 'flex', fontSize: 18 }}>{icon}</Box>
      <Typography sx={{ color: UI_COLORS.secondary, fontFamily: TAJAWAL, fontSize: "0.85rem" }}>{label}</Typography>
    </Stack>
    <Typography sx={{ fontWeight: 700, fontFamily: TAJAWAL, fontSize: '0.9rem' }}>{value}</Typography>
  </Stack>
);

export default Properties;