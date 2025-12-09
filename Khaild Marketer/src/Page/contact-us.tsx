import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  GlobalStyles,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

// Contact detail helper (keeps icons consistent)
const ContactDetail: React.FC<{ icon: React.ReactElement; label: string; value: string }> = ({ icon, label, value }) => (
  <Box sx={{ mb: 1.5, display: "flex", alignItems: "center" }}>
    <Box sx={{ color: "#0F172A", mr: 1.5, display: "flex", alignItems: "center" }}>{icon}</Box>
    <Typography variant="body2" sx={{ color: "#4B5563", fontFamily: "'Tajawal', sans-serif" }}>
      {label}: <strong style={{ marginLeft: 6, color: "#0F172A" }}>{value}</strong>
    </Typography>
  </Box>
);

const Contactus: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const mobile = (form.elements.namedItem("mobile") as HTMLInputElement)?.value || "";
    const subject = (form.elements.namedItem("subject") as HTMLInputElement)?.value || "";
    const message = (form.elements.namedItem("message") as HTMLInputElement)?.value || "";

    const whatsappNumber = "+94768696704"; // adjust if needed
    const whatsappMessage = `Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AMobile: ${encodeURIComponent(mobile)}%0ASubject: ${encodeURIComponent(subject)}%0AMessage: ${encodeURIComponent(message)}`;
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    window.open(whatsappURL, "_blank");
    form.reset();
  };

  return (
    <Box sx={{ direction: "rtl" }}>
      {/* Global font override to Tajawal for entire page (uses !important) */}
      <GlobalStyles
        styles={{
          '*': {
            fontFamily: '"Tajawal", sans-serif !important',
            fontSize: '18px !important',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          },
          'input, textarea, select, button': {
            fontFamily: '"Tajawal", sans-serif !important',
            fontSize: '18px !important'
          }
        }}
      />

      {/* Map - uses the provided dynamic map URL */}
      <Box sx={{ width: "100%", height: { xs: 300, md: 500 }, overflow: "hidden" }}>
        <iframe
          src="https://dynamic-map-5nmj.vercel.app/ar"
          style={{ border: 0, width: "100%", height: "100%" }}
          title="Dynamic Map"
          loading="lazy"
        />
      </Box>

      <Container maxWidth="lg" sx={{ my: 6, px: { xs: 2, sm: 3 } }}>
        {/* Layout WITHOUT Grid: left column + right column using responsive flex */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 4, md: 8 } }}>
          {/* Left column */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, borderBottom: "3px solid #E5E7EB", display: "inline-block", pb: 0.5 }}>
              Khalid Marketer
            </Typography>

            <Typography sx={{ color: "#4B5563", mt: 3, mb: 4, lineHeight: 1.7 }}>
              <strong> Khalid Marketer</strong> تواصل معنا لأي معلومات إضافية أو استفسارات.
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontWeight: 700, mb: 1 }}>QARAR - Contact Information</Typography>
              <ContactDetail icon={<EmailIcon fontSize="small" />} label="البريد الإلكتروني" value="info@almtcqatar.com | almtcqatar@gmail.com" />
              <ContactDetail icon={<WhatsAppIcon fontSize="small" />} label="رقم الهاتف" value="(+974) 502260200" />
              <ContactDetail icon={<PhoneIphoneIcon fontSize="small" />} label="موبايل" value="(+94) 672260200" />
            </Box>
          </Box>

          {/* Right column - form (no Grid) */}
          <Box sx={{ flex: 1 }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ p: { xs: 2.5, sm: 4 }, background: "#fff", borderRadius: 1, boxShadow: '0 4px 10px rgba(2,6,23,0.06)' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, borderBottom: "3px solid #E5E7EB", display: "inline-block", pb: 0.5 }}>
                أرسل رسالتك
              </Typography>

              {/* Inquiry select - full width */}
              <Box sx={{ mb: 2 }}>
                <FormControl fullWidth variant="standard">
                  <InputLabel id="inquiry-type-label">نوع الاستفسار</InputLabel>
                  <Select
                    labelId="inquiry-type-label"
                    label="نوع الاستفسار"
                    name="inquiryType"
                    defaultValue=""
                    sx={{
                      fontFamily: '"Tajawal", sans-serif !important',
                      // ensure the select text and icon inherit the Tajawal font
                      '& .MuiSelect-select': { fontFamily: '"Tajawal", sans-serif !important', paddingTop: 1.5, paddingBottom: 1.5 },
                    }}
                    MenuProps={{ PaperProps: { sx: { fontFamily: '"Tajawal", sans-serif !important' } } }}
                  >
                    <MenuItem value="general">عام</MenuItem>
                    <MenuItem value="project">مشروع</MenuItem>
                    <MenuItem value="support">دعم</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Two-column like layout using flex-wrap for inputs */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <TextField
                  name="name"
                  label="الاسم *"
                  variant="standard"
                  required
                  sx={{ flex: "1 1 45%" }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ sx: { fontFamily: '"Tajawal", sans-serif !important' } }}
                />

                <TextField
                  name="email"
                  label="البريد الإلكتروني *"
                  variant="standard"
                  required
                  sx={{ flex: "1 1 45%" }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ sx: { fontFamily: '"Tajawal", sans-serif !important' } }}
                />

                <TextField
                  name="location"
                  label="الموقع"
                  variant="standard"
                  sx={{ flex: "1 1 45%" }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ sx: { fontFamily: '"Tajawal", sans-serif !important' } }}
                />

                <TextField
                  name="mobile"
                  label="رقم الهاتف *"
                  variant="standard"
                  required
                  sx={{ flex: "1 1 45%" }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ sx: { fontFamily: '"Tajawal", sans-serif !important' } }}
                />

                <TextField
                  name="subject"
                  label="الموضوع"
                  variant="standard"
                  sx={{ flex: "1 1 100%" }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ sx: { fontFamily: '"Tajawal", sans-serif !important' } }}
                />

                <TextField
                  name="message"
                  label="نص الرسالة *"
                  variant="standard"
                  required
                  multiline
                  rows={5}
                  sx={{ flex: "1 1 100%" }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ sx: { fontFamily: '"Tajawal", sans-serif !important' } }}
                />

                <Box sx={{ flex: "1 1 100%" }}>
                  <Button
                    type="submit"
                    fullWidth
                    sx={{
                      background: "linear-gradient(135deg, #023B4E, #046A84, #08A4BF)",
                      color: '#fff',
                      '&:hover': { opacity: 0.95 },
                      padding: '12px 18px',
                      fontSize: 18,
                      textTransform: 'none',
                      boxShadow: '0 6px 18px rgba(3, 67, 88, 0.18)'
                    }}
                  >
                    أرسل
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Contactus;
