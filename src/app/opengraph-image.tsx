import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "TRACOLI BUSINESS — Sourcing & Logistique Chine–Afrique";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: 16,
              background: "#E60000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 36,
              fontWeight: 800,
            }}
          >
            T
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#E60000" }}>
              TRACOLI BUSINESS
            </span>
            <span
              style={{
                fontSize: 12,
                letterSpacing: 2,
                color: "#64748b",
                textTransform: "uppercase",
              }}
            >
              Trade Connectors Logistics International
            </span>
          </div>
        </div>

        {/* Centre */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              padding: "8px 20px",
              background: "#fee",
              color: "#E60000",
              borderRadius: 100,
              fontSize: 16,
              fontWeight: 700,
              width: "fit-content",
            }}
          >
            Sourcing · Fret · Dédouanement
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 900,
              color: "#0f172a",
              lineHeight: 1.1,
              letterSpacing: -2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Votre sourcing</span>
            <span>
              <span style={{ color: "#E60000" }}>Chine → Afrique</span>,
            </span>
            <span>simplement.</span>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #e5e7eb",
            paddingTop: 24,
            fontSize: 18,
            color: "#64748b",
          }}
        >
          <span>Burundi · RDC · Ouganda · Tanzanie · Kenya</span>
          <span style={{ fontWeight: 700, color: "#0f172a" }}>
            +257 69 03 27 65
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}