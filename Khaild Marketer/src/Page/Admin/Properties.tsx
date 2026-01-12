import React from "react";
import { Box, Typography, Stack, Paper, Fade, Button } from "@mui/material";
import { HomeWorkOutlined, AddHomeWork } from "@mui/icons-material";

const menuFont = "Tajawal, sans-serif";
const primaryTeal = "#004652";
const accentGold = "#CC9D2F";

const Properties: React.FC = () => (
  <Fade in timeout={800}>
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ fontFamily: menuFont, fontWeight: 900, color: primaryTeal }}>العقارات</Typography>
        <Button variant="contained" startIcon={<AddHomeWork />} sx={{ bgcolor: accentGold, borderRadius: "12px", fontFamily: menuFont }}>إضافة مشروع</Button>
      </Stack>
      {[1, 2, 3].map((item) => (
        <Paper key={item} sx={{ p: 3, borderRadius: "28px", border: "1px solid #E2E8F0", display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
          <Box sx={{ width: { xs: "100%", md: 240 }, height: 160, bgcolor: "#F1F5F9", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <HomeWorkOutlined sx={{ fontSize: 50, color: "#CBD5E1" }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontFamily: menuFont, fontWeight: 800, color: primaryTeal }}>فيلا فاخرة حي الملقا {item}</Typography>
            <Typography sx={{ mt: 2, fontFamily: menuFont, color: "#94A3B8" }}>مساحة 450 متر مربع - واجهة شمالية - مسبح خاص</Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 900, color: accentGold }}>SAR 1,850,000</Typography>
              <Button sx={{ fontFamily: menuFont, fontWeight: 700 }}>عرض الملف</Button>
            </Stack>
          </Box>
        </Paper>
      ))}
    </Stack>
  </Fade>
);

export default Properties;