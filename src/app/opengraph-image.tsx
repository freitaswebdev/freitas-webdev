import { ImageResponse } from "next/og";
export const alt = "Freitas WebDev — Engenharia digital. Impacto real.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#070a11",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "65px 75px",
        color: "#f1f2f6",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 24, color: "#f04452" }}>
        FREITAS ↗ WEBDEV
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 88,
          lineHeight: 1.04,
          letterSpacing: -5,
          marginTop: 65,
        }}
      >
        <div>Engenharia digital.</div>
        <div style={{ color: "#f04452" }}>Impacto real.</div>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 50,
          fontSize: 20,
          color: "#a0a6b4",
        }}
      >
        Websites · Sistemas · SaaS · Produtos digitais
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "auto",
          fontSize: 13,
          color: "#a0a6b4",
        }}
      >
        JUNDIAÍ, SP — ATENDIMENTO EM TODO O BRASIL
      </div>
    </div>,
    size,
  );
}
