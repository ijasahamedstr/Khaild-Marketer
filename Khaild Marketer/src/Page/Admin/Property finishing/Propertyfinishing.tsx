import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  Box, Typography, Button, CircularProgress, IconButton, Pagination,
  Dialog, Divider, Chip, Stack, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, GlobalStyles, 
  InputAdornment, DialogTitle, DialogContent, DialogActions, TextField,
  Avatar, Container, Alert, Snackbar,
} from "@mui/material";
import {
  WhatsApp, CallOutlined, Search, VisibilityOutlined, 
  DeleteOutline, PersonOutline, PhoneAndroidOutlined, 
  HistoryToggleOff, CheckCircleOutline, Close, Download, 
  Refresh, PeopleAltOutlined, 
  AssignmentOutlined, 
 BuildOutlined, ContactMailOutlined
} from "@mui/icons-material";

// --- THEME CONFIG ---
const FONT_FAMILY = '"Tajawal", sans-serif !important';
const UI_COLORS = {
  primary: "#004652",
  secondary: "#006D77",
  accent: "#CC9D2F",
  danger: "#EF4444",
  success: "#10B981",
  background: "#F1F5F9",
  border: "#E2E8F0"
};

// --- UPDATED DATA CONTRACT ---
interface ContactRequest {
  _id?: string;
  name: string;
  mobile: string;
  contactMethod?: string;
  serviceType: string;
  createdAt?: string;
}

const Propertyfinishing: React.FC = () => {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<ContactRequest | null>(null);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [syncSignal, setSyncSignal] = useState(0);
  const [notif, setNotif] = useState({ open: false, msg: "", type: "success" as any });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const LIMIT = 12;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/save-service-contact`);
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
      const res = await axios.delete(`${API_URL}/api/save-service-contact/${deleteTarget}`);
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

  const filteredData = useMemo(() => {
    return requests.filter(item => {
      const searchStr = `${item.name} ${item.mobile} ${item.serviceType}`.toLowerCase();
      return searchStr.includes(search.toLowerCase());
    });
  }, [requests, search]);

  const pagedData = filteredData.slice((page - 1) * LIMIT, page * LIMIT);

  const exportToExcel = () => {
    const dataToExport = filteredData.map(r => ({
      "الاسم": r.name,
      "رقم الجوال": r.mobile,
      "نوع الخدمة": r.serviceType,
      "وسيلة التواصل": r.contactMethod || "غير محدد",
      "التاريخ": r.createdAt ? new Date(r.createdAt).toLocaleString("ar-SA") : "-"
    }));
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ServiceRequests");
    XLSX.writeFile(wb, `Finishing_Requests_${Date.now()}.xlsx`);
  };

  if (loading) return (
    <Stack sx={{ height: "100vh" }} alignItems="center" justifyContent="center" spacing={2} bgcolor={UI_COLORS.background}>
      <CircularProgress thickness={5} size={60} sx={{ color: UI_COLORS.primary }} />
      <Typography variant="h6" sx={{ fontWeight: 800 }}>جاري تحميل طلبات التشطيب...</Typography>
    </Stack>
  );

  return (
    <Box sx={{ minHeight: "100vh", direction: "rtl", bgcolor: UI_COLORS.background, pb: 10 }}>
      <GlobalStyles styles={{ body: { fontFamily: FONT_FAMILY, margin: 0 }, "*": { fontFamily: FONT_FAMILY } }} />

      {/* --- HEADER --- */}
      <Box sx={{ bgcolor: UI_COLORS.primary, color: "#fff", py: 2, px: 4, position: "sticky", top: 0, zIndex: 1100, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: UI_COLORS.accent, width: 45, height: 45 }}><BuildOutlined /></Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 900 }}>إدارة طلبات التشطيب</Typography>
              <Typography variant="caption" sx={{ opacity: 0.8, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CheckCircleOutline sx={{ fontSize: 12 }} /> لوحة التحكم بالخدمات
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" color="inherit" onClick={() => setSyncSignal(s => s + 1)} startIcon={<Refresh />}>تحديث</Button>
            <Button variant="contained" sx={{ bgcolor: UI_COLORS.accent }} onClick={exportToExcel} startIcon={<Download />}>تصدير Excel</Button>
          </Stack>
        </Stack>
      </Box>

      <Container maxWidth={false} sx={{ mt: 4, px: { lg: 6 } }}>
        {/* --- STATS --- */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
          <StatPanel label="إجمالي الطلبات" val={requests.length} icon={<AssignmentOutlined />} color="#3B82F6" />
          <StatPanel label="طلبات اليوم" val={requests.filter(r => new Date(r.createdAt!).toDateString() === new Date().toDateString()).length} icon={<PeopleAltOutlined />} color="#10B981" />
        </Stack>

        {/* --- SEARCH --- */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: "16px", border: `1px solid ${UI_COLORS.border}` }}>
          <TextField 
            fullWidth
            placeholder="ابحث باسم العميل، رقم الجوال، أو نوع الخدمة..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
              sx: { borderRadius: "12px", bgcolor: "#F8FAFC" }
            }}
          />
        </Paper>

        {/* --- TABLE --- */}
        <TableContainer component={Paper} sx={{ borderRadius: "16px", overflow: "hidden", border: `1px solid ${UI_COLORS.border}` }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="right" sx={{ fontWeight: 900, bgcolor: "#F8FAFC" }}>العميل</TableCell>
                <TableCell align="right" sx={{ fontWeight: 900, bgcolor: "#F8FAFC" }}>الخدمة</TableCell>
                <TableCell align="right" sx={{ fontWeight: 900, bgcolor: "#F8FAFC" }}>وسيلة التواصل</TableCell>
                <TableCell align="right" sx={{ fontWeight: 900, bgcolor: "#F8FAFC" }}>تاريخ الطلب</TableCell>
                <TableCell align="center" sx={{ fontWeight: 900, bgcolor: "#F8FAFC" }}>التحكم</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pagedData.map((row) => (
                <TableRow key={row._id} hover>
                  <TableCell align="right">
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: UI_COLORS.primary, fontSize: 14 }}>{row.name.charAt(0)}</Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 800 }}>{row.name}</Typography>
                        <Typography variant="caption" color="textSecondary">{row.mobile}</Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Chip label={row.serviceType} size="small" sx={{ fontWeight: 700, bgcolor: "#E0F2F1", color: "#00796B" }} />
                  </TableCell>
                  <TableCell align="right">{row.contactMethod || "غير محدد"}</TableCell>
                  <TableCell align="right">{row.createdAt ? new Date(row.createdAt).toLocaleDateString("ar-SA") : "-"}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <IconButton onClick={() => setSelectedItem(row)} sx={{ color: UI_COLORS.primary, bgcolor: "#f0f4f5" }}><VisibilityOutlined /></IconButton>
                      <IconButton onClick={() => setDeleteTarget(row._id || null)} sx={{ color: UI_COLORS.danger, bgcolor: "#fff1f1" }}><DeleteOutline /></IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack direction="row" justifyContent="center" sx={{ mt: 4 }}>
          <Pagination count={Math.ceil(filteredData.length / LIMIT)} page={page} onChange={(_, v) => setPage(v)} color="primary" />
        </Stack>
      </Container>

      {/* --- DETAIL MODAL --- */}
      <Dialog open={Boolean(selectedItem)} onClose={() => setSelectedItem(null)} fullWidth maxWidth="sm">
        {selectedItem && (
          <Box sx={{ p: 4 }}>
            <Stack direction="row" justifyContent="space-between" mb={3}>
              <Typography variant="h5" sx={{ fontWeight: 900 }}>تفاصيل طلب الخدمة</Typography>
              <IconButton onClick={() => setSelectedItem(null)}><Close /></IconButton>
            </Stack>
            <Divider sx={{ mb: 3 }} />
            <Stack spacing={3}>
              <DataField icon={<PersonOutline />} label="اسم العميل" val={selectedItem.name} />
              <DataField icon={<PhoneAndroidOutlined />} label="رقم الجوال" val={selectedItem.mobile} />
              <DataField icon={<BuildOutlined />} label="نوع الخدمة" val={selectedItem.serviceType} />
              <DataField icon={<ContactMailOutlined />} label="وسيلة التواصل المفضلة" val={selectedItem.contactMethod} />
              <DataField icon={<HistoryToggleOff />} label="وقت الإرسال" val={selectedItem.createdAt ? new Date(selectedItem.createdAt).toLocaleString("ar-SA") : ""} />
            </Stack>
            <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
              <Button fullWidth variant="contained" color="success" startIcon={<WhatsApp />} onClick={() => window.open(`https://wa.me/${selectedItem.mobile}`)}>واتساب</Button>
              <Button fullWidth variant="contained" sx={{ bgcolor: UI_COLORS.primary }} startIcon={<CallOutlined />} onClick={() => window.open(`tel:${selectedItem.mobile}`)}>اتصال</Button>
            </Stack>
          </Box>
        )}
      </Dialog>

      {/* --- DELETE DIALOG --- */}
      <Dialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)}>
        <DialogTitle sx={{ fontWeight: 900 }}>تأكيد الحذف</DialogTitle>
        <DialogContent>هل أنت متأكد من حذف هذا السجل نهائياً؟</DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setDeleteTarget(null)}>إلغاء</Button>
          <Button onClick={handleDelete} variant="contained" color="error">حذف</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={notif.open} autoHideDuration={4000} onClose={() => setNotif({ ...notif, open: false })}>
        <Alert severity={notif.type} variant="filled">{notif.msg}</Alert>
      </Snackbar>
    </Box>
  );
};

// --- HELPERS ---
const StatPanel = ({ label, val, icon, color }: any) => (
  <Paper sx={{ flex: 1, p: 3, borderRadius: "20px", border: `1px solid ${UI_COLORS.border}` }}>
    <Stack direction="row" spacing={3} alignItems="center">
      <Box sx={{ p: 2, borderRadius: "15px", bgcolor: `${color}15`, color: color }}>
        {React.cloneElement(icon, { fontSize: "large" })}
      </Box>
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 800, color: "#64748B" }}>{label}</Typography>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>{val}</Typography>
      </Box>
    </Stack>
  </Paper>
);

const DataField = ({ icon, label, val }: any) => (
  <Stack direction="row" spacing={2} alignItems="center">
    <Box sx={{ color: UI_COLORS.primary, display: "flex", p: 1, bgcolor: "#F1F5F9", borderRadius: "8px" }}>{icon}</Box>
    <Box>
      <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700 }}>{label}</Typography>
      <Typography variant="body1" sx={{ fontWeight: 800 }}>{val || "غير مسجل"}</Typography>
    </Box>
  </Stack>
);

export default Propertyfinishing;