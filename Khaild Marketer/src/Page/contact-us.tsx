// Contactus.tsx
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Box, Typography, Container, GlobalStyles } from "@mui/material";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || "";

type ContactDetailProps = {
  icon: React.ReactElement;
  label: string;
  value: React.ReactNode;
};

const ContactDetail: React.FC<ContactDetailProps> = ({ icon, label, value }) => (
  <Box sx={{ mb: 1.6, display: "flex", alignItems: "center" }}>
    <Box
      sx={{
        color: "#0F172A",
        mr: 1.6,
        display: "flex",
        alignItems: "center",
        fontSize: "22px",
      }}
    >
      {icon}
    </Box>

    <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
      <Typography
        sx={{
          color: "#4B5563",
          fontSize: "18px",
          fontFamily: "'Tajawal', sans-serif",
        }}
      >
        {label}:
      </Typography>

      <Typography
        sx={{
          color: "#0F172A",
          fontWeight: 700,
          fontSize: "20px",
          fontFamily: "'Tajawal', sans-serif",
        }}
      >
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
};

const Contactus: React.FC = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement | null>(null);

  const [markers] = useState<MarkerItem[]>([
    { id: "1", title: "Project A", lat: 24.7136, lng: 46.6753 },
    { id: "2", title: "Project B", lat: 24.725, lng: 46.68 },
    { id: "3", title: "Project C", lat: 24.7, lng: 46.66 },
  ]);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [46.6753, 24.7136],
      zoom: 11,
    });

    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl(), "top-left");

    markers.forEach((m) => {
      const el = document.createElement("div");
      el.style.width = "18px";
      el.style.height = "18px";
      el.style.borderRadius = "50%";
      el.style.background = "#0b5565";
      el.style.border = "2px solid white";
      el.title = m.title;
      new mapboxgl.Marker(el).setLngLat([m.lng, m.lat]).addTo(map);
    });

    const resizeObserver = new ResizeObserver(() => map.resize());
    if (mapContainer.current) resizeObserver.observe(mapContainer.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const ltrNumber = (text: string) => (
    <span
      style={{
        direction: "ltr",
        unicodeBidi: "bidi-override",
        display: "inline-block",
        fontSize: "20px",
      }}
    >
      {text}
    </span>
  );

  return (
    <Box sx={{ direction: "rtl" }}>
      <GlobalStyles
        styles={{
          "*": { fontFamily: '"Tajawal", sans-serif !important' },
        }}
      />

      {/* MAP */}
      <div style={{ width: "100vw", height: "min(720px, 60vh)" }}>
        <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
      </div>

      {/* CONTACT DETAILS */}
      <Container maxWidth="lg" sx={{ my: 6, px: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 6,
          }}
        >
          {/* LEFT SECTION */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 2,
                borderBottom: "3px solid #E5E7EB",
                pb: 0.5,
                fontSize: "28px",
              }}
            >
              Khalid Marketer
            </Typography>

            <Typography
              sx={{
                color: "#4B5563",
                mt: 2,
                mb: 4,
                lineHeight: 1.9,
                fontSize: "20px",
              }}
            >
              <strong>Khalid Marketer</strong> تواصل معنا لأي معلومات إضافية أو استفسارات.
            </Typography>

            <Box>
              <Typography sx={{ fontWeight: 700, mb: 2, fontSize: "22px" }}>
                Saudi Arabia - Contact Information
              </Typography>

              <ContactDetail
                icon={<EmailIcon sx={{ fontSize: "22px" }} />}
                label="ايميل الموقع"
                value="info@waseetaqary.com"
              />

              <ContactDetail
                icon={<PhoneIphoneIcon sx={{ fontSize: "22px" }} />}
                label="لبيع وشراء العقارات"
                value={ltrNumber("(+966) 570819999")}
              />

              <ContactDetail
                icon={<PhoneIphoneIcon sx={{ fontSize: "22px" }} />}
                label="استئجار وتسليم واستلام العقارات"
                value={ltrNumber("(+966) 570829999")}
              />

              <ContactDetail
                icon={<PhoneIphoneIcon sx={{ fontSize: "22px" }} />}
                label="لتشطيب العقار"
                value={ltrNumber("(+966) 570839999")}
              />

              <ContactDetail
                icon={<PhoneIphoneIcon sx={{ fontSize: "22px" }} />}
                label="للقسم النسائي"
                value={ltrNumber("(+966) 570849999")}
              />

              <ContactDetail
                icon={<PhoneIphoneIcon sx={{ fontSize: "22px" }} />}
                label="لقسم التمويل العقاري"
                value={ltrNumber("(+966) 570859999")}
              />
            </Box>
          </Box>

          {/* RIGHT SECTION */}
          <Box sx={{ flex: 1 }} />
        </Box>
      </Container>
    </Box>
  );
};

export default Contactus;
