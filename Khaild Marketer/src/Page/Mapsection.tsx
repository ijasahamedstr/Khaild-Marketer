import React from "react";

const Mapsection: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        padding: "0",
        margin: "0",
        background: "#f5f5f5",
        direction: "rtl",
        fontFamily: "'Tajawal', sans-serif",
        paddingBottom: "60px", // <<=== Added bottom space here
      }}
    >
      {/* ====== العنوان ====== */}
      <div
        style={{
          width: "100%",
          padding: "40px 0 20px 0",
          textAlign: "right",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            margin: "0",
            fontSize: "34px",
            fontWeight: "700",
            color: "#073B4C",
          }}
        >
          خريطة المشاريع
        </h1>
      </div>

      {/* ====== الخريطة ====== */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <iframe
          src="https://dynamic-map-5nmj.vercel.app/ar"
          title="Dynamic Map"
          style={{
            width: "100%",
            maxWidth: "1600px",
            height: "650px",
            border: "2px solid #ddd",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
          allowFullScreen={false}
        ></iframe>
      </div>
    </div>
  );
};

export default Mapsection;
