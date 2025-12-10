// Mapsection.tsx
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || "";

type MarkerItem = {
  id: string;
  title: string;
  lat: number;
  lng: number;
};

// (نماذج الماركر كما عندك)
const markers: MarkerItem[] = [
  { id: "m1", title: "مشروع 1", lat: 24.7136, lng: 46.6753 },
  { id: "m2", title: "مشروع 2", lat: 24.738, lng: 46.657 },
  { id: "m3", title: "مشروع 3", lat: 24.695, lng: 46.7 },
  { id: "m4", title: "مشروع 4", lat: 24.74, lng: 46.72 },
  { id: "m5", title: "مشروع 5", lat: 24.68, lng: 46.64 },
];

const Mapsection: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRefs = useRef<mapboxgl.Marker[]>([]);

  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const [openDrawer, setOpenDrawer] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // ====== Riyadh bounding box ======
  // صيغة: [[westLng, southLat], [eastLng, northLat]]
  // قيم تقريبية تغطي مدينة الرياض ومحيطها الحضري
  const riyadhBounds: [[number, number], [number, number]] = [
    [46.20, 24.40], // جنوب غرب (lng, lat)
    [47.05, 25.05], // شمال شرق (lng, lat)
  ];

  // center within Riyadh (lng, lat)
  const defaultCenter: [number, number] = [46.6753, 24.7136];
  const defaultZoom = 11.3;

  useEffect(() => {
    if (!mapContainer.current) return;
    if (mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v11",
      center: defaultCenter,
      zoom: defaultZoom,
      // قيد حركة الخريطة ضمن حدود الرياض
      maxBounds: riyadhBounds,
      // قيود زووم لتجربة أفضل داخل المدينة
      minZoom: 10,
      maxZoom: 16,
    });

    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    // helper: تحقق إن نقطة داخل الباوند
    const isWithinRiyadh = (lng: number, lat: number) => {
      const [westLng, southLat] = riyadhBounds[0];
      const [eastLng, northLat] = riyadhBounds[1];
      return lng >= westLng && lng <= eastLng && lat >= southLat && lat <= northLat;
    };

    // اضف ماركرات فقط إذا داخل باوند الرياض
    markers.forEach((m) => {
      if (!isWithinRiyadh(m.lng, m.lat)) {
        // لو أردت يمكن تسجيلها في console للمراجعة
        // console.warn(`Marker ${m.id} is outside Riyadh bounds and will be skipped.`);
        return;
      }

      const el = document.createElement("div");
      el.className = "project-marker";
      el.style.cssText = `
        min-width: 44px;
        height: 44px;
        background: white;
        border-radius: 12px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #d9e4ea;
        font-size: 11px;
        box-shadow: 0 6px 12px rgba(0,0,0,0.12);
        cursor: pointer;
        text-align: center;
        padding: 6px 8px;
      `;
      el.innerText = m.title;

      el.onclick = () => {
        map.flyTo({ center: [m.lng, m.lat], zoom: 14, essential: true });
      };

      const marker = new mapboxgl.Marker({ element: el }).setLngLat([m.lng, m.lat]).addTo(map);
      markerRefs.current.push(marker);
    });

    // تأكد من أن الخريطة تعيد القياس عند تغيير حجم النافذة
    const handleResize = () => map.resize();
    window.addEventListener("resize", handleResize);

    // لو أردت: عند التحريك، يمكن منع الخروج عن الباوند الإضافي
    // Mapbox سيبقي الكاميرا داخل maxBounds تلقائياً، لذلك ليست هناك حاجة لإضافة مراقب moveend

    return () => {
      // cleanup markers
      markerRefs.current.forEach((mrk) => mrk.remove());
      markerRefs.current = [];

      window.removeEventListener("resize", handleResize);

      try {
        map.remove();
      } catch {
        //
      }
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetToRiyadh = () => {
    // تأكد من أن الكاميرا داخل باوند عند العودة
    const lng = defaultCenter[0];
    const lat = defaultCenter[1];
    const [westLng, southLat] = riyadhBounds[0];
    const [eastLng, northLat] = riyadhBounds[1];

    // clamp center داخل الباوند إذا احتاج
    const clampedLng = Math.min(Math.max(lng, westLng), eastLng);
    const clampedLat = Math.min(Math.max(lat, southLat), northLat);

    mapRef.current?.flyTo({ center: [clampedLng, clampedLat], zoom: defaultZoom });
  };

  return (
    <div
      style={{
        width: "100%",
        background: "#f5f5f5",
        direction: language === "ar" ? "rtl" : "ltr",
        paddingBottom: "60px",
        fontFamily: "'Tajawal', sans-serif",
      }}
    >
      {/* TITLE */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 0 20px", textAlign: "right" }}>
        <h1 style={{ margin: 0, fontSize: 34, fontWeight: 700, color: "#073B4C" }}>خريطة المشاريع (الرياض فقط)</h1>
      </div>

      {/* MAP CARD */}
      <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
        <div
          style={{
            width: "100%",
            maxWidth: 1650,
            position: "relative",
            borderRadius: 20,
            background: "white",
            border: "1px solid #c7d7df",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          {/* FILTER BUTTONS */}
          <div
            style={{
              position: "absolute",
              top: 20,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 10,
              zIndex: 30,
            }}
          >
            {[
              { id: "mosque", label: "مسجد" },
              { id: "park", label: "حديقة" },
              { id: "hospital", label: "مستشفى" },
              { id: "school", label: "مدرسة" },
              { id: "store", label: "متجر" },
              { id: "teacher", label: "معلم" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveFilter(activeFilter === btn.id ? null : btn.id)}
                style={{
                  padding: "8px 18px",
                  background: activeFilter === btn.id ? "#e6f3f6" : "white",
                  border: activeFilter === btn.id ? "2px solid #0b5565" : "1px solid #dbe4e8",
                  borderRadius: 12,
                  cursor: "pointer",
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* RIGHT PROJECT LIST */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              width: openDrawer ? 320 : 60,
              transition: "0.3s",
              zIndex: 35,
            }}
          >
            <div
              style={{
                background: "white",
                padding: 14,
                display: "flex",
                justifyContent: "space-between",
                borderLeft: "1px solid #dde6ea",
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
                onClick={() => setOpenDrawer(!openDrawer)}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  border: "1px solid #ccc",
                  background: "white",
                }}
              >
                {openDrawer ? "‹" : "›"}
              </button>
            </div>

            {openDrawer && (
              <div style={{ background: "white", height: 420, overflowY: "auto", padding: 10 }}>
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
                    >
                      <strong>{m.title}</strong>
                      <div style={{ fontSize: 12, color: "#777" }}>{m.lat.toFixed(4)}, {m.lng.toFixed(4)}</div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* MAP CANVAS */}
          <div style={{ width: "100%", height: 650, position: "relative" }}>
            <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
          </div>

          {/* BOTTOM CENTER BUTTON */}
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
              }}
            >
              الرياض
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mapsection;
