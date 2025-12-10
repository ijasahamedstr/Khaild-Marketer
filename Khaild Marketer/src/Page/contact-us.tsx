// Contactus.tsx
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
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

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || "";

type ContactDetailProps = {
  icon: React.ReactElement;
  label: string;
  value: React.ReactNode;
};
const ContactDetail: React.FC<ContactDetailProps> = ({ icon, label, value }) => (
  <Box sx={{ mb: 1.5, display: "flex", alignItems: "center" }}>
    <Box sx={{ color: "#0F172A", mr: 1.5, display: "flex", alignItems: "center" }}>{icon}</Box>
    <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
      <Typography variant="body2" sx={{ color: "#4B5563", fontFamily: "'Tajawal', sans-serif" }}>
        {label}:
      </Typography>
      <Typography variant="body2" sx={{ color: "#0F172A", fontWeight: 700, fontFamily: "'Tajawal', sans-serif" }}>
        {value}
      </Typography>
    </Box>
  </Box>
);

type MarkerItem = {
  id: string;
  title: string;
  lat: number;
  lng: number;
  category?: string;
};

const Contactus: React.FC = () => {
  // UI state
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(true);

  // Map refs
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement | null>(null);

  // Example Riyadh bounds (lng, lat) — adjust if needed
  const riyadhBounds: [[number, number], [number, number]] = [
    [46.4669 - 0.5, 24.6333 - 0.5],
    [46.4669 + 0.5, 24.6333 + 0.5],
  ];

  // Example markers — replace with your real data or fetch dynamically
  const [markers] = useState<MarkerItem[]>([
    { id: "1", title: "Project A", lat: 24.7136, lng: 46.6753, category: "store" },
    { id: "2", title: "Project B", lat: 24.7250, lng: 46.6800, category: "park" },
    { id: "3", title: "Project C", lat: 24.7000, lng: 46.6600, category: "school" },
  ]);

  // Initialize Mapbox map
  useEffect(() => {
    if (!mapContainer.current) return;
    if (mapRef.current) return; // already initialized

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [46.6753, 24.7136],
      zoom: 11,
    });

    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl({ showCompass: true }), "top-left");

    // Add markers from state
    markers.forEach((m) => {
      const el = document.createElement("div");
      el.style.width = "16px";
      el.style.height = "16px";
      el.style.borderRadius = "50%";
      el.style.background = "#0b5565";
      el.style.border = "2px solid white";
      el.title = m.title;

      new mapboxgl.Marker(el).setLngLat([m.lng, m.lat]).addTo(map);
      el.addEventListener("click", () => {
        map.flyTo({ center: [m.lng, m.lat], zoom: 14 });
      });
    });

    // Make sure map resizes when viewport changes (full-bleed)
    const resizeObserver = new ResizeObserver(() => map.resize());
    if (mapContainer.current) resizeObserver.observe(mapContainer.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, [markers]);

  // Reset view to Riyadh center
  const resetToRiyadh = () => {
    if (!mapRef.current) return;
    mapRef.current.flyTo({ center: [46.6753, 24.7136], zoom: 11 });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const mobileInput = (form.elements.namedItem("mobile") as HTMLInputElement)?.value || "";
    const subject = (form.elements.namedItem("subject") as HTMLInputElement)?.value || "";
    const formMessage = (form.elements.namedItem("message") as HTMLInputElement)?.value || "";

    const cleanedMobile = mobileInput.replace(/\D/g, "");
    const whatsappNumberDefault = "94768696704"; // digits only fallback
    const whatsappNumberToUse = cleanedMobile.length >= 8 ? cleanedMobile : whatsappNumberDefault;

    const whatsappPlain = `Name: ${name}\nEmail: ${email}\nMobile: ${mobileInput}\nSubject: ${subject}\nMessage: ${formMessage}`;
    const whatsappURL = `https://wa.me/${whatsappNumberToUse}?text=${encodeURIComponent(whatsappPlain)}`;

    window.open(whatsappURL, "_blank");
    form.reset();
  };

  return (
    <Box sx={{ direction: "rtl" }}>
      <GlobalStyles
        styles={{
          ":root": {
            // ensure body-level margin doesn't produce white gutters when rendering full-bleed
            margin: 0,
            padding: 0,
          },
          "*": {
            fontFamily: '"Tajawal", sans-serif !important',
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          },
          "input, textarea, select, button": {
            fontFamily: '"Tajawal", sans-serif !important',
          },
        }}
      />

      {/* ========== FULL-BLEED MAP CARD ========== */}
      <div
        style={{
          width: "100vw",
          left: 0,
          right: 0,
          position: "relative",
          overflow: "hidden",
          // keep the map on top of other page elements visually
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "relative",
            // removed top padding to eliminate the extra space above the map
            paddingTop: 0,
          }}
        >
          {/* FILTER BUTTONS (centered overlay) */}
          <div
            style={{
              position: "absolute",
              top: 12,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 10,
              zIndex: 40,
            }}
          >
            {[{ id: "mosque", label: "مسجد" },
              { id: "park", label: "حديقة" },
              { id: "hospital", label: "مستشفى" },
              { id: "school", label: "مدرسة" },
              { id: "store", label: "متجر" },
              { id: "teacher", label: "معلم" }].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveFilter((prev) => (prev === btn.id ? null : btn.id))}
                style={{
                  padding: "8px 18px",
                  background: activeFilter === btn.id ? "#e6f3f6" : "white",
                  border: activeFilter === btn.id ? "2px solid #0b5565" : "1px solid #dbe4e8",
                  borderRadius: 12,
                  cursor: "pointer",
                }}
                type="button"
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* RIGHT PROJECT LIST (overlay) */}
          <div
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              width: openDrawer ? 320 : 60,
              transition: "width 0.28s ease",
              zIndex: 45,
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              borderRadius: 8,
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "saturate(120%) blur(6px)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: 14,
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #e6eef2",
              }}
            >
              {openDrawer && (
                <div>
                  <strong>جميع المشاريع</strong>
                  <div style={{ fontSize: 12, color: "#777" }}>
                    {markers.filter((m) => m.lng >= riyadhBounds[0][0] && m.lng <= riyadhBounds[1][0] && m.lat >= riyadhBounds[0][1] && m.lat <= riyadhBounds[1][1]).length} نتائج
                  </div>
                </div>
              )}

              <button
                onClick={() => setOpenDrawer((v) => !v)}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  border: "1px solid #ccc",
                  background: "white",
                  alignSelf: "center",
                }}
                type="button"
              >
                {openDrawer ? "‹" : "›"}
              </button>
            </div>

            {openDrawer && (
              <div style={{ height: 420, overflowY: "auto", padding: 10 }}>
                {markers
                  .filter((m) => m.lng >= riyadhBounds[0][0] && m.lng <= riyadhBounds[1][0] && m.lat >= riyadhBounds[0][1] && m.lat <= riyadhBounds[1][1])
                  .map((m) => (
                    <div
                      key={m.id}
                      onClick={() =>
                        mapRef.current?.flyTo({
                          center: [m.lng, m.lat],
                          zoom: 14,
                        })
                      }
                      style={{
                        padding: 12,
                        background: "#f7f9fa",
                        borderRadius: 10,
                        border: "1px solid #e4ecef",
                        marginBottom: 10,
                        cursor: "pointer",
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <strong>{m.title}</strong>
                      <div style={{ fontSize: 12, color: "#777" }}>{m.lat.toFixed(4)}, {m.lng.toFixed(4)}</div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* MAP CANVAS (reduced height & no top gap) */}
          <div
            style={{
              width: "100vw",
              height: "min(720px, 60vh)", // reduced, responsive map height
              position: "relative",
              zIndex: 1,
            }}
          >
            <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
          </div>

          {/* BOTTOM CENTER BUTTON (overlay) */}
          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 50,
            }}
          >
            <button
              onClick={resetToRiyadh}
              style={{
                padding: "12px 28px",
                background: "#073B4C",
                color: "white",
                borderRadius: 12,
                cursor: "pointer",
                border: "none",
              }}
              type="button"
            >
              الرياض
            </button>
          </div>
        </div>
      </div>

      {/* ========== CONTACT FORM BELOW ========== */}
      <Container maxWidth="lg" sx={{ my: 6, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 4, md: 8 } }}>
          {/* Left column */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 2,
                borderBottom: "3px solid #E5E7EB",
                display: "inline-block",
                pb: 0.5,
              }}
            >
              Khalid Marketer
            </Typography>

            <Typography sx={{ color: "#4B5563", mt: 3, mb: 4, lineHeight: 1.7 }}>
              <strong> Khalid Marketer</strong> تواصل معنا لأي معلومات إضافية أو استفسارات.
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontWeight: 700, mb: 1 }}>QARAR - Contact Information</Typography>
              <ContactDetail icon={<EmailIcon fontSize="small" />} label="البريد الإلكتروني" value="info@almtcqatar.com | almtcqatar@gmail.com" />

              <ContactDetail
                icon={<WhatsAppIcon fontSize="small" />}
                label="رقم الهاتف"
                value={
                  <span style={{ direction: "ltr", unicodeBidi: "bidi-override" }}>
                    (+974) 502260200
                  </span>
                }
              />

              <ContactDetail
                icon={<PhoneIphoneIcon fontSize="small" />}
                label="موبايل"
                value={
                  <span style={{ direction: "ltr", unicodeBidi: "bidi-override" }}>
                    (+94) 672260200
                  </span>
                }
              />
            </Box>
          </Box>

          {/* Right column - form */}
          <Box sx={{ flex: 1 }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                p: { xs: 2.5, sm: 4 },
                background: "#fff",
                borderRadius: 1,
                boxShadow: "0 4px 10px rgba(2,6,23,0.06)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  borderBottom: "3px solid #E5E7EB",
                  display: "inline-block",
                  pb: 0.5,
                }}
              >
                أرسل رسالتك
              </Typography>

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
                      "& .MuiSelect-select": { fontFamily: '"Tajawal", sans-serif !important', paddingTop: 1.5, paddingBottom: 1.5 },
                    }}
                    MenuProps={{ PaperProps: { sx: { fontFamily: '"Tajawal", sans-serif !important' } } }}
                  >
                    <MenuItem value="general">عام</MenuItem>
                    <MenuItem value="project">مشروع</MenuItem>
                    <MenuItem value="support">دعم</MenuItem>
                  </Select>
                </FormControl>
              </Box>

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
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Contactus;
