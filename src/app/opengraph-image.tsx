import { ImageResponse } from "next/og";

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
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(120% 120% at 15% 0%, #2a1650 0%, #120b1e 55%), #120b1e",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: -3,
            backgroundImage:
              "linear-gradient(100deg, #a78bfa 0%, #c2298a 45%, #e0824a 80%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          RD Travel
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 34,
            color: "#c3b8d6",
            maxWidth: 820,
            textAlign: "center",
            display: "flex",
          }}
        >
          Te armamos tu viaje, sin complicarte con nada
        </div>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 12,
            fontSize: 22,
            color: "#8b7fa3",
          }}
        >
          <span style={{ display: "flex" }}>Playa</span>
          <span style={{ display: "flex" }}>·</span>
          <span style={{ display: "flex" }}>Circuitos internacionales</span>
          <span style={{ display: "flex" }}>·</span>
          <span style={{ display: "flex" }}>Familia y pareja</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
