import { ImageResponse } from "next/og";

export const alt = "TRACOLI BUSINESS — Sourcing & Logistique Chine–Afrique";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #111111 0%, #2a0a0b 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 40, color: "#E50209", fontWeight: 700, letterSpacing: 4 }}>
          TRACOLI BUSINESS
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, marginTop: 24, lineHeight: 1.1 }}>
          Sourcing & Logistique Chine → Afrique
        </div>
        <div style={{ fontSize: 34, marginTop: 32, color: "#d4d4d4" }}>
          Bujumbura · Kinshasa · Goma · Kampala · Mombasa
        </div>
      </div>
    ),
    size
  );
}
