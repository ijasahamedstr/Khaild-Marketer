// Mapsection.tsx
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || "";

const Mapsection: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  // Riyadh bounding box: [[westLng, southLat], [eastLng, northLat]]
  const riyadhBounds: [[number, number], [number, number]] = [
    [46.20, 24.40],
    [47.05, 25.05],
  ];

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
      maxBounds: riyadhBounds,
      minZoom: 10,
      maxZoom: 16,
    });

    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    const handleResize = () => map.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      try {
        map.remove();
      } catch {}
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        background: "#f5f5f5",
        direction: "rtl",
        paddingBottom: "60px",
        fontFamily: "'Tajawal', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 0 20px", textAlign: "right" }}>
        <h1 style={{ margin: 0, fontSize: 34, fontWeight: 700, color: "#073B4C" }}>خريطة الرياض</h1>
      </div>

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
          <div style={{ width: "100%", height: 650 }}>
            <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mapsection;
