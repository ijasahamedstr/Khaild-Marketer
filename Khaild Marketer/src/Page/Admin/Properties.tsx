import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Box, Typography, Grid, Fade, Button, CircularProgress, 
  IconButton, Pagination, Dialog, Zoom, Divider, Card, CardContent, Chip, Stack
} from "@mui/material";
import { 
  Add, DeleteOutline, LocationOn,
  Business, PhoneIphone, WhatsApp, NotesOutlined, 
  CalendarToday, HomeWorkOutlined,
  ArrowForwardIos, Person
} from "@mui/icons-material";

// --- Interfaces ---
interface PropertyRequest {
  _id: string;
  propertyStatus?: string;
  propertyType?: string;
  location?: string;
  developer?: string;
  area?: string;
  priceLimit?: string;
  priceOffer?: string;
  notes?: string;
  clientName?: string;
  clientMobile?: string;
  contactChannels?: {
    chat: boolean;
    whatsapp: boolean;
    call: boolean;
  };
  createdAt?: string;
}

// --- Constants & Styles ---
const menuFont = "Tajawal, sans-serif";
const primaryTeal = "#004652";
const accentGold = "#CC9D2F";
const softBg = "#F8FAFC";

// --- Sub-Component: Modal Detail Item (No Grid) ---
const ModalDetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) => (
  <Box sx={{ flex: 1, minWidth: 200 }}>  {/* flex:1 allows two items per row if parent uses flex wrap */}
    <Stack direction="row" spacing={2} alignItems="center">
      <Box sx={{ color: accentGold, display: 'flex', opacity: 0.9 }}>{icon}</Box>
      <Box>
        <Typography sx={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: menuFont, fontWeight: 700, mb: 0.5 }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: '1rem', color: primaryTeal, fontFamily: menuFont, fontWeight: 800 }}>
          {value || 'غير متوفر'}
        </Typography>
      </Box>
    </Stack>
  </Box>
);

const Properties: React.FC = () => {
  const [requests, setRequests] = useState<PropertyRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewRequest, setViewRequest] = useState<PropertyRequest | null>(null);

  const apiHost = import.meta.env.VITE_API_URL;

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiHost}/api/save-request`);
      if (response.data.success) {
        setRequests(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedId) return;
    try {
      const response = await axios.delete(`${apiHost}/api/save-request/${selectedId}`);
      if (response.data.success) {
        setRequests((prev) => prev.filter((item) => item._id !== selectedId));
        setDeleteDialogOpen(false);
      }
    } catch (error) {
      alert("حدث خطأ أثناء الحذف");
    }
  };

  const paginatedItems = requests.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  if (loading) return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh', gap: 2 }}>
      <CircularProgress thickness={5} size={50} sx={{ color: accentGold }} />
      <Typography sx={{ fontFamily: menuFont, color: primaryTeal, fontWeight: 700 }}>جاري تحميل البيانات...</Typography>
    </Box>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, bgcolor: softBg, minHeight: "100vh", direction: 'rtl' }}>
      {/* --- HEADER SECTION --- */}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'flex-end' }} sx={{ mb: 6, gap: 2 }}>
        <Box>
          <Typography variant="h3" sx={{ fontFamily: menuFont, fontWeight: 900, color: primaryTeal, mb: 1, fontSize: { xs: '2rem', md: '2.5rem' } }}>
            إدارة العقارات <Box component="span" sx={{ color: accentGold }}>.</Box>
          </Typography>
          <Typography sx={{ fontFamily: menuFont, color: '#64748B', fontSize: '1rem', fontWeight: 500 }}>
            مرحباً بك، لديك حالياً <strong style={{ color: primaryTeal }}>{requests.length}</strong> طلبات مسجلة.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Add sx={{ ml: 1 }} />} 
          sx={{ 
            bgcolor: primaryTeal, borderRadius: "15px", fontFamily: menuFont, 
            fontWeight: 700, px: 4, py: 1.5, fontSize: '1rem',
            boxShadow: '0 10px 25px rgba(0,70,82,0.25)',
            '&:hover': { bgcolor: '#002d35', transform: 'scale(1.05)' },
            transition: 'all 0.3s ease'
          }}
        >
          إضافة طلب جديد
        </Button>
      </Stack>

      {/* --- BIG CARDS FLEX (5 cards per row) --- */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap',        // wrap to next row if more than 5 cards
          gap: 5,                  // space between cards
        }}
      >
        {paginatedItems.map((item) => (
          <Box 
            key={item._id} 
            sx={{ 
              flex: '0 0 20%',       // 5 cards per row
              minWidth: 0,           // allow shrink if needed
            }}
          >
            <Fade in timeout={600}>
              <Card 
                onClick={() => setViewRequest(item)}
                sx={{ 
                  borderRadius: '28px', position: 'relative', overflow: 'visible',
                  background: '#ffffff', border: '1px solid #E2E8F0',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  cursor: 'pointer',
                  '&:hover': { 
                    transform: 'translateY(-12px)', 
                    boxShadow: '0 40px 80px rgba(0,70,82,0.08)',
                    borderColor: accentGold 
                  },
                  '&::after': {
                    content: '""', position: 'absolute', top: 40, right: -1, bottom: 40,
                    width: '6px', bgcolor: accentGold, borderRadius: '10px 0 0 10px'
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {/* --- Card content remains the same --- */}
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
                    <Box>
                      <Chip 
                        label={item.propertyType || 'غير محدد'} 
                        sx={{ bgcolor: `${primaryTeal}10`, color: primaryTeal, fontWeight: 800, fontFamily: menuFont, mb: 1.5, px: 1 }} 
                      />
                      <Typography variant="h5" sx={{ fontFamily: menuFont, fontWeight: 900, color: primaryTeal, fontSize: '1.5rem' }}>
                        {item.developer || 'المطور العقاري'}
                      </Typography>
                    </Box>
                    <IconButton 
                      onClick={(e) => handleDeleteClick(e, item._id)} 
                      sx={{ bgcolor: '#FFF1F2', color: '#E11D48', '&:hover': { bgcolor: '#FFE4E6' } }}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </Stack>

                  <Stack spacing={2.5} sx={{ mb: 4 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box sx={{ bgcolor: '#F1F5F9', p: 1.2, borderRadius: '12px', display: 'flex' }}>
                        <LocationOn sx={{ color: accentGold }} />
                      </Box>
                      <Typography sx={{ fontFamily: menuFont, fontSize: '1.1rem', color: '#475569', fontWeight: 600 }}>
                        {item.location || 'الموقع غير محدد'}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={6}>
                      <Box>
                        <Typography sx={{ fontSize: '0.85rem', color: '#94A3B8', fontFamily: menuFont, mb: 0.5 }}>المساحة</Typography>
                        <Typography sx={{ fontWeight: 900, fontFamily: menuFont, fontSize: '1.4rem', color: primaryTeal }}>
                          {item.area} <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>م²</span>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: '0.85rem', color: '#94A3B8', fontFamily: menuFont, mb: 0.5 }}>الميزانية</Typography>
                        <Typography sx={{ fontWeight: 900, fontFamily: menuFont, fontSize: '1.4rem', color: accentGold }}>
                          {item.priceOffer || '---'}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>

                  <Divider sx={{ mb: 3, borderStyle: 'dashed' }} />

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box>
                        <Typography sx={{ fontFamily: menuFont, fontSize: '0.75rem', color: '#94A3B8' }}>عميل مهتم</Typography>
                      </Box>
                    </Stack>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: primaryTeal, gap: 1 }}>
                      <Typography sx={{ fontFamily: menuFont, fontWeight: 700, fontSize: '0.85rem' }}>التفاصيل</Typography>
                      <ArrowForwardIos sx={{ fontSize: 12, transform: 'rotate(180deg)' }} />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Fade>
          </Box>
        ))}
      </Box>
      {/* --- PAGINATION --- */}
      <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
        <Pagination 
          count={Math.ceil(requests.length / itemsPerPage)} 
          page={page} 
          onChange={(_, v) => setPage(v)}
          size="large"
          sx={{ 
            '& .MuiPaginationItem-root': { fontFamily: menuFont, fontWeight: 700, borderRadius: '12px' },
            '& .Mui-selected': { bgcolor: `${primaryTeal} !important`, color: 'white', boxShadow: '0 10px 20px rgba(0,70,82,0.2)' }
          }}
        />
      </Box>

      {/* --- DETAILS MODAL --- */}
      <Dialog 
        open={Boolean(viewRequest)} 
        onClose={() => setViewRequest(null)}
        fullWidth maxWidth="sm"
        TransitionComponent={Zoom}
        PaperProps={{ sx: { borderRadius: '32px', p: 1, border: '1px solid rgba(255,255,255,0.3)', overflow: 'hidden' } }}
      >
        {viewRequest && (
          <Box sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <Box sx={{ p: 2, bgcolor: accentGold, borderRadius: '20px', color: 'white', boxShadow: '0 10px 20px rgba(204,157,47,0.3)' }}>
                <HomeWorkOutlined fontSize="large" />
              </Box>
              <Box>
                <Typography sx={{ fontFamily: menuFont, fontWeight: 900, color: primaryTeal, fontSize: '1.5rem' }}>بيانات الطلب التفصيلية</Typography>
                <Typography sx={{ fontFamily: menuFont, fontSize: '0.9rem', color: '#64748B' }}>
                  تاريخ التسجيل: {viewRequest.createdAt ? new Date(viewRequest.createdAt).toLocaleDateString('ar-EG') : '---'}
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <ModalDetailItem icon={<Person />} label="اسم العميل الكامل" value={viewRequest.clientName} />
              <ModalDetailItem icon={<PhoneIphone />} label="رقم التواصل" value={viewRequest.clientMobile} />
              <ModalDetailItem icon={<Business />} label="حالة العقار المطلوبة" value={viewRequest.propertyStatus} />
              <ModalDetailItem icon={<CalendarToday />} label="نوع العقار" value={viewRequest.propertyType} />
            </Grid>

            <Box sx={{ p: 3, bgcolor: '#F8FAFC', borderRadius: '24px', border: '1px solid #E2E8F0' }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                <NotesOutlined sx={{ color: accentGold }} />
                <Typography sx={{ fontFamily: menuFont, fontWeight: 900, color: primaryTeal }}>ملاحظات العميل</Typography>
              </Stack>
              <Typography sx={{ fontFamily: menuFont, fontSize: '1rem', color: '#475569', lineHeight: 1.8 }}>
                {viewRequest.notes || "لا توجد ملاحظات إضافية مسجلة لهذا الطلب."}
              </Typography>
            </Box>

            <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
              <Button 
                fullWidth variant="contained" 
                startIcon={<WhatsApp sx={{ ml: 1 }} />}
                sx={{ bgcolor: '#25D366', fontFamily: menuFont, borderRadius: '16px', py: 1.8, fontSize: '1rem', fontWeight: 700, '&:hover': { bgcolor: '#1eb956' } }}
              >
                تواصل عبر واتساب
              </Button>
              <Button 
                fullWidth variant="outlined" 
                sx={{ borderColor: '#E2E8F0', color: '#64748B', fontFamily: menuFont, borderRadius: '16px', fontWeight: 700 }}
                onClick={() => setViewRequest(null)}
              >
                إغلاق النافذة
              </Button>
            </Stack>
          </Box>
        )}
      </Dialog>

      {/* --- DELETE CONFIRMATION --- */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} PaperProps={{ sx: { borderRadius: '24px' } }}>
        <Box sx={{ p: 4, textAlign: 'center', minWidth: 320 }}>
          <Typography sx={{ fontFamily: menuFont, fontWeight: 900, fontSize: '1.3rem', mb: 1, color: '#E11D48' }}>تأكيد عملية الحذف</Typography>
          <Typography sx={{ fontFamily: menuFont, color: '#64748B', mb: 4, lineHeight: 1.6 }}>هل أنت متأكد من حذف هذا الطلب نهائياً؟<br/>لا يمكن التراجع عن هذا الإجراء.</Typography>
          <Stack direction="row" spacing={2}>
            <Button fullWidth onClick={() => setDeleteDialogOpen(false)} sx={{ fontFamily: menuFont, color: '#64748B', fontWeight: 700 }}>إلغاء</Button>
            <Button fullWidth onClick={confirmDelete} variant="contained" sx={{ bgcolor: '#ef4444', fontFamily: menuFont, borderRadius: '12px', fontWeight: 700, '&:hover': { bgcolor: '#dc2626' } }}>نعم، احذف</Button>
          </Stack>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Properties;
