import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  Box, Typography, Button, CircularProgress, IconButton, Pagination,
  Dialog, Divider, Chip, Stack, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, GlobalStyles, Tooltip, 
  InputAdornment, TextField, Avatar, Container, Alert, Snackbar,
  TableFooter
} from "@mui/material";
import {
  WhatsApp, CallOutlined, Search, VisibilityOutlined,
  DeleteOutline, PersonOutline, PhoneAndroidOutlined,
  CheckCircleOutline, MapsHomeWorkOutlined, Close, Download,
  Refresh, TrendingUp, AssignmentOutlined, SecurityOutlined,
  PaymentsOutlined, AccessTimeOutlined, LocationOnOutlined,
  InfoOutlined, BusinessOutlined, HistoryEduOutlined, NotesOutlined,
  EventAvailableOutlined, AssessmentOutlined, EngineeringOutlined,
  AdminPanelSettingsOutlined, LanguageOutlined, ShieldOutlined,
  ContactSupportOutlined, ReceiptLongOutlined, StorefrontOutlined
} from "@mui/icons-material";

// --- SYSTEM THEME & FONT CONFIGURATION ---
const TAJAWAL = "'Tajawal', sans-serif";
const UI_COLORS = {
  primary: "#004652",
  secondary: "#006D77",
  accent: "#CC9D2F",
  danger: "#EF4444",
  success: "#10B981",
  background: "#F1F5F9",
  cardBg: "#FFFFFF",
  border: "#E2E8F0",
  warning: "#F59E0B",
  textMain: "#1E293B",
  textMuted: "#64748B"
};

// --- DATA CONTRACT (MAPPED TO MONGOOSE SCHEMA) ---
interface BookingData {
  _id?: string;
  clientName: string;
  clientMobile: string;
  clientLocation?: string;
  bookingTime: string;
  propertyId?: string;
  propertyType?: string;
  propertyStatus?: string;
  propertyPrice?: string;
  propertyLocation?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

const Buyingproperty: React.FC = () => {
  // --- STATE ORCHESTRATION ---
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<BookingData | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [notif, setNotif] = useState({ open: false, msg: "", type: "success" as any });

  const API_URL = import.meta.env.VITE_API_URL;
  const LIMIT = 10;

  // --- DATABASE OPERATIONS ---
  const fetchData = useCallback(async () => {
    try {
      setSyncing(true);
      const res = await axios.get(`${API_URL}/api/all-bookings`);
      if (res.data.success) {
        setBookings(res.data.data);
      }
    } catch (err) {
      triggerNotif("فشل في استرداد البيانات من الخادم", "error");
    } finally {
      setSyncing(false);
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await axios.delete(`${API_URL}/api/delete-booking/${deleteTarget}`);
      if (res.data.success) {
        setBookings(prev => prev.filter(b => b._id !== deleteTarget));
        triggerNotif("تم حذف السجل العقاري بنجاح", "success");
        setDeleteTarget(null);
      }
    } catch (err) {
      triggerNotif("خطأ في معالجة طلب الحذف", "error");
    }
  };

  const triggerNotif = (msg: string, type: any) => setNotif({ open: true, msg, type });

  // --- ANALYTICS ENGINE ---
  const stats = useMemo(() => {
    const total = bookings.length;
    const confirmed = bookings.filter(b => b.status === 'confirmed').length;
    const pending = bookings.filter(b => b.status === 'pending').length;
    const totalValue = bookings.reduce((acc, b) => acc + parseFloat(b.propertyPrice || "0"), 0);
    return { total, confirmed, pending, totalValue };
  }, [bookings]);

  // --- FILTER & SEARCH LOGIC ---
  const filteredData = useMemo(() => {
    return bookings.filter(item => {
      const searchStr = `${item.clientName} ${item.clientMobile} ${item.propertyLocation} ${item.propertyType}`.toLowerCase();
      const matchesSearch = searchStr.includes(search.toLowerCase());
      const matchesFilter = filter === "all" || item.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [bookings, search, filter]);

  const paginatedData = filteredData.slice((page - 1) * LIMIT, page * LIMIT);

  // --- EXPORT TO EXCEL ---
  const exportData = () => {
    const dataToExport = filteredData.map(r => ({
      "اسم العميل": r.clientName,
      "جوال العميل": r.clientMobile,
      "موقع العميل": r.clientLocation || "—",
      "وقت الحجز": new Date(r.bookingTime).toLocaleString("ar-SA"),
      "نوع العقار": r.propertyType || "غير محدد",
      "السعر": r.propertyPrice || "0",
      "حالة الطلب": r.status,
      "موقع العقار": r.propertyLocation || "غير محدد",
      "تاريخ الإضافة": r.createdAt ? new Date(r.createdAt).toLocaleDateString("ar-SA") : "—"
    }));
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "PropertyBookings");
    XLSX.writeFile(wb, `RealEstate_Log_${Date.now()}.xlsx`);
  };

  if (loading) return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", bgcolor: UI_COLORS.background }}>
      <CircularProgress thickness={5} size={60} sx={{ color: UI_COLORS.primary, mb: 2 }} />
      <Typography sx={{ fontFamily: TAJAWAL, fontWeight: 900, color: UI_COLORS.primary }}>جاري مزامنة قاعدة البيانات العقارية...</Typography>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", direction: "rtl", bgcolor: UI_COLORS.background, pb: 10 }}>
      <GlobalStyles styles={{ 
        body: { fontFamily: TAJAWAL, margin: 0 }, 
        "*": { fontFamily: `${TAJAWAL} !important` } 
      }} />

      {/* --- TOP NAVIGATION BAR --- */}
      <Box sx={{ bgcolor: UI_COLORS.primary, color: "#fff", py: 2, px: 4, position: "sticky", top: 0, zIndex: 1100, boxShadow: "0 4px 15px rgba(0,0,0,0.15)" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: UI_COLORS.accent, width: 50, height: 50 }}><AdminPanelSettingsOutlined fontSize="large" /></Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 900, fontFamily: TAJAWAL }}>بوابة إدارة المبيعات</Typography>
              <Typography variant="caption" sx={{ opacity: 0.8, display: 'flex', alignItems: 'center', gap: 0.5, fontFamily: TAJAWAL }}>
                <ShieldOutlined sx={{ fontSize: 14 }} /> نظام الأصول العقارية الآمن
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button 
                variant="outlined" 
                color="inherit" 
                onClick={fetchData} 
                disabled={syncing}
                sx={{ borderRadius: "10px", fontWeight: 700 }}
                startIcon={syncing ? <CircularProgress size={16} color="inherit" /> : <Refresh />}
            >
              {syncing ? "جاري التحديث" : "تحديث البيانات"}
            </Button>
            <Button 
                variant="contained" 
                sx={{ bgcolor: UI_COLORS.accent, "&:hover": { bgcolor: "#b38a29" }, borderRadius: "10px", fontWeight: 700 }} 
                onClick={exportData} 
                startIcon={<Download />}
            >
                تصدير Excel
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Container maxWidth={false} sx={{ mt: 4, px: { lg: 6 } }}>
        
        {/* --- ANALYTICS DASHBOARD --- */}
        <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
          <DashboardCard label="إجمالي الحجوزات" val={stats.total} icon={<AssessmentOutlined />} color="#3B82F6" />
          <DashboardCard label="حجوزات معلقة" val={stats.pending} icon={<AccessTimeOutlined />} color={UI_COLORS.warning} />
          <DashboardCard label="حجوزات مؤكدة" val={stats.confirmed} icon={<CheckCircleOutline />} color={UI_COLORS.success} />
          <DashboardCard label="إجمالي القيم" val={stats.totalValue.toLocaleString()} icon={<PaymentsOutlined />} color="#8B5CF6" unit="ر.س" />
        </Box>

        {/* --- SEARCH & FILTER BAR --- */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: "16px", border: `1px solid ${UI_COLORS.border}` }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} alignItems="center">
            <TextField 
              fullWidth 
              placeholder="ابحث بالاسم، رقم الجوال، أو موقع العقار..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{ 
                startAdornment: <InputAdornment position="start"><Search color="primary" /></InputAdornment>,
                sx: { borderRadius: "12px", bgcolor: "#F8FAFC" }
              }}
            />
            <Stack direction="row" spacing={1} sx={{ minWidth: 420 }}>
              {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(s => (
                <Chip 
                  key={s} 
                  label={s === 'all' ? "الكل" : s} 
                  onClick={() => setFilter(s)} 
                  sx={{ 
                    px: 1, fontWeight: 800, fontFamily: TAJAWAL,
                    bgcolor: filter === s ? UI_COLORS.primary : "#E2E8F0",
                    color: filter === s ? "#fff" : UI_COLORS.textMuted
                  }} 
                />
              ))}
            </Stack>
          </Stack>
        </Paper>

        {/* --- DATA MASTER TABLE --- */}
        <TableContainer component={Paper} sx={{ borderRadius: "16px", overflow: "hidden", border: `1px solid ${UI_COLORS.border}` }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="right" sx={{ fontWeight: 900, bgcolor: "#F8FAFC", color: UI_COLORS.primary }}>بيانات العميل</TableCell>
                <TableCell align="right" sx={{ fontWeight: 900, bgcolor: "#F8FAFC", color: UI_COLORS.primary }}>نوع العقار</TableCell>
                <TableCell align="right" sx={{ fontWeight: 900, bgcolor: "#F8FAFC", color: UI_COLORS.primary }}>الموقع</TableCell>
                <TableCell align="right" sx={{ fontWeight: 900, bgcolor: "#F8FAFC", color: UI_COLORS.primary }}>السعر</TableCell>
                <TableCell align="center" sx={{ fontWeight: 900, bgcolor: "#F8FAFC", color: UI_COLORS.primary }}>حالة الحجز</TableCell>
                <TableCell align="center" sx={{ fontWeight: 900, bgcolor: "#F8FAFC", color: UI_COLORS.primary }}>الإجراءات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.length > 0 ? paginatedData.map((row) => (
                <TableRow key={row._id} hover>
                  <TableCell align="right">
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: UI_COLORS.primary, fontWeight: 900 }}>{row.clientName[0]}</Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 800 }}>{row.clientName}</Typography>
                        <Typography variant="caption" color="textSecondary">{row.clientMobile}</Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{row.propertyType}</Typography>
                    <Typography variant="caption" sx={{ color: UI_COLORS.accent }}>{row.propertyStatus}</Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>{row.propertyLocation}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 900, color: UI_COLORS.secondary }}>{row.propertyPrice} ر.س</TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={row.status} 
                      size="small" 
                      sx={{ 
                        fontWeight: 900, fontFamily: TAJAWAL,
                        bgcolor: row.status === 'confirmed' ? '#E8F5E9' : '#F1F5F9',
                        color: row.status === 'confirmed' ? '#2E7D32' : '#475569'
                      }} 
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="التفاصيل الكاملة"><IconButton onClick={() => setSelectedItem(row)} sx={{ color: UI_COLORS.primary, bgcolor: "#F0F4F8" }}><VisibilityOutlined /></IconButton></Tooltip>
                      <Tooltip title="حذف السجل"><IconButton onClick={() => setDeleteTarget(row._id || null)} sx={{ color: UI_COLORS.danger, bgcolor: "#FFF1F1" }}><DeleteOutline /></IconButton></Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 10 }}>
                        <Typography color="textSecondary" sx={{ fontWeight: 700 }}>لا توجد حجوزات مطابقة لمعايير البحث حالياً</Typography>
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack direction="row" justifyContent="center" sx={{ mt: 4 }}>
          <Pagination 
            count={Math.ceil(filteredData.length / LIMIT)} 
            page={page} 
            onChange={(_, v) => setPage(v)} 
            color="primary" 
            sx={{ "& .MuiPaginationItem-root": { fontWeight: 800 } }}
          />
        </Stack>
      </Container>

      {/* --- SEPARATED CATEGORY POP-UP (NATIVE FLEXBOX) --- */}
      <Dialog 
        open={Boolean(selectedItem)} 
        onClose={() => setSelectedItem(null)} 
        fullWidth 
        maxWidth="md" 
        PaperProps={{ sx: { borderRadius: "24px", overflow: "hidden" } }}
      >
        {selectedItem && (
          <Box sx={{ p: 0 }}>
            {/* Header Area */}
            <Box sx={{ p: 3, bgcolor: UI_COLORS.primary, color: "#fff", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <ReceiptLongOutlined />
                <Typography variant="h6" sx={{ fontWeight: 900 }}>الملف الشامل لحجز العميل</Typography>
              </Stack>
              <IconButton onClick={() => setSelectedItem(null)} sx={{ color: "#fff" }}><Close /></IconButton>
            </Box>

            <Box sx={{ p: 4 }}>
              {/* CATEGORY 1: CLIENT IDENTIFICATION */}
              <Box sx={{ mb: 5 }}>
                <SectionLabel title="بيانات العميل الشخصية" icon={<PersonOutline />} />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <DataCard label="اسم العميل" val={selectedItem.clientName} icon={<PersonOutline />} />
                  <DataCard label="رقم الجوال" val={selectedItem.clientMobile} icon={<PhoneAndroidOutlined />} />
                  <DataCard label="موقع العميل الحالي" val={selectedItem.clientLocation} icon={<LocationOnOutlined />} />
                  <DataCard label="وقت الحجز المختار" val={new Date(selectedItem.bookingTime).toLocaleString("ar-SA")} icon={<EventAvailableOutlined />} />
                </Box>
              </Box>

              {/* CATEGORY 2: PROPERTY LINKAGE */}
              <Box sx={{ mb: 5 }}>
                <SectionLabel title="مواصفات العقار المحجوز" icon={<StorefrontOutlined />} />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <DataCard label="نوع الوحدة" val={selectedItem.propertyType} icon={<MapsHomeWorkOutlined />} />
                  <DataCard label="حالة الوحدة" val={selectedItem.propertyStatus} icon={<InfoOutlined />} />
                  <DataCard label="السعر التقديري" val={`${selectedItem.propertyPrice} ر.س`} icon={<PaymentsOutlined />} />
                  <DataCard label="موقع العقار" val={selectedItem.propertyLocation} icon={<LocationOnOutlined />} />
                </Box>
              </Box>

              {/* CATEGORY 3: SYSTEM METADATA */}
              <Box sx={{ mb: 5 }}>
                <SectionLabel title="بيانات النظام والحالة" icon={<HistoryEduOutlined />} />
                <Box sx={{ p: 3, bgcolor: "#F8FAFC", borderRadius: "16px", border: `1px solid ${UI_COLORS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 800 }}>حالة الحجز الحالية</Typography>
                    <Stack direction="row" spacing={1} mt={0.5} alignItems="center">
                      <Chip label={selectedItem.status} color="primary" size="small" sx={{ fontWeight: 900, fontFamily: TAJAWAL }} />
                      <Typography variant="caption" color="textSecondary">آخر تحديث للبيانات: {new Date(selectedItem.updatedAt || "").toLocaleDateString("ar-SA")}</Typography>
                    </Stack>
                  </Box>
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 800 }}>رقم العقار المرجعي</Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 700, color: UI_COLORS.primary }}>{selectedItem.propertyId || "ID_PENDING"}</Typography>
                  </Box>
                </Box>
              </Box>

              {/* CATEGORY 4: ADDITIONAL NOTES */}
              <Box sx={{ p: 3, bgcolor: "#FFFBEB", borderRadius: "16px", border: "1px solid #FEF3C7" }}>
                <Stack direction="row" spacing={1} mb={1} alignItems="center">
                  <NotesOutlined sx={{ fontSize: 20, color: "#92400E" }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 900, color: "#92400E" }}>ملاحظات العميل الإضافية</Typography>
                </Stack>
                <Typography variant="body2" sx={{ lineHeight: 1.8, color: "#92400E" }}>{selectedItem.notes || "لا توجد ملاحظات مسجلة لهذا الطلب"}</Typography>
              </Box>

              {/* FOOTER ACTIONS */}
              <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  color="success" 
                  onClick={() => window.open(`https://wa.me/${selectedItem.clientMobile}`)} 
                  startIcon={<WhatsApp />} 
                  sx={{ py: 1.5, borderRadius: "12px", fontWeight: 900, fontSize: 16 }}
                >
                  فتح محادثة واتساب
                </Button>
                <Button 
                  fullWidth 
                  variant="contained" 
                  sx={{ py: 1.5, borderRadius: "12px", fontWeight: 900, fontSize: 16, bgcolor: UI_COLORS.primary }} 
                  onClick={() => window.open(`tel:${selectedItem.clientMobile}`)} 
                  startIcon={<CallOutlined />}
                >
                  اتصال هاتفي مباشر
                </Button>
              </Stack>
            </Box>
          </Box>
        )}
      </Dialog>

      {/* --- CONFIRM DELETE MODAL --- */}
      <Dialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)}>
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <EngineeringOutlined sx={{ fontSize: 60, color: UI_COLORS.danger, mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>تأكيد الحذف النهائي</Typography>
          <Typography variant="body2" color="textSecondary" mb={3}>هل أنت متأكد من حذف هذا السجل بشكل دائم من قاعدة البيانات؟ لا يمكن التراجع عن هذا الإجراء.</Typography>
          <Stack direction="row" spacing={2}>
            <Button fullWidth variant="outlined" sx={{ fontWeight: 800 }} onClick={() => setDeleteTarget(null)}>إلغاء</Button>
            <Button fullWidth variant="contained" color="error" sx={{ fontWeight: 800 }} onClick={handleDelete}>تأكيد الحذف</Button>
          </Stack>
        </Box>
      </Dialog>

      <Snackbar open={notif.open} autoHideDuration={4000} onClose={() => setNotif({ ...notif, open: false })}>
        <Alert severity={notif.type} variant="filled" sx={{ fontWeight: 800 }}>{notif.msg}</Alert>
      </Snackbar>
    </Box>
  );
};

// --- NATIVE FLEXBOX CUSTOM COMPONENTS ---

const DashboardCard = ({ label, val, icon, color, unit = "" }: any) => (
  <Box sx={{ 
      flex: "1 1 280px", p: 3, bgcolor: "#fff", borderRadius: "24px", 
      border: `1px solid ${UI_COLORS.border}`, boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
      transition: "0.3s", "&:hover": { transform: "translateY(-5px)", boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }
  }}>
    <Stack direction="row" spacing={3} alignItems="center">
      <Box sx={{ p: 2, bgcolor: `${color}15`, color: color, borderRadius: "16px" }}>{icon}</Box>
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 800, color: UI_COLORS.textMuted }}>{label}</Typography>
        <Typography variant="h5" sx={{ fontWeight: 900, color: UI_COLORS.textMain }}>{val} <Typography component="span" variant="caption">{unit}</Typography></Typography>
      </Box>
    </Stack>
  </Box>
);

const SectionLabel = ({ title, icon }: any) => (
  <Stack direction="row" spacing={1} alignItems="center" mb={2} color={UI_COLORS.primary}>
    {React.cloneElement(icon, { sx: { fontSize: 22 } })}
    <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>{title}</Typography>
  </Stack>
);

const DataCard = ({ label, val, icon }: any) => (
  <Box sx={{ 
      flex: "1 1 calc(25% - 16px)", minWidth: "180px", p: 2.5, bgcolor: "#F8FAFC", 
      borderRadius: "16px", border: `1px solid ${UI_COLORS.border}` 
  }}>
    <Stack direction="row" spacing={1} mb={0.5} alignItems="center">
      {React.cloneElement(icon, { sx: { fontSize: 16, color: UI_COLORS.accent } })}
      <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 800 }}>{label}</Typography>
    </Stack>
    <Typography variant="body2" sx={{ fontWeight: 800, color: UI_COLORS.textMain }}>{val || "—"}</Typography>
  </Box>
);

export default Buyingproperty;