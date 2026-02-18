import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "WoWRoast.com - Get Your WoW Character Roasted by AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          background: "linear-gradient(135deg, #07070a 0%, #0f172a 50%, #07070a 100%)",
          fontFamily: "serif",
        }}
      >
        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: "120px",
            fontWeight: 900,
            letterSpacing: "-2px",
            background: "linear-gradient(135deg, #e2e8f0, #60a5fa, #818cf8)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: "10px",
          }}
        >
          WoWRoast
        </div>

        <div
          style={{
            fontSize: "24px",
            color: "rgba(96,165,250,0.3)",
            letterSpacing: "12px",
            fontFamily: "monospace",
            marginBottom: "40px",
          }}
        >
          .COM
        </div>

        <div
          style={{
            fontSize: "36px",
            fontWeight: 700,
            color: "rgba(255,255,255,0.9)",
            letterSpacing: "2px",
          }}
        >
          Roast me !
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.3)",
            marginTop: "24px",
            fontFamily: "monospace",
            letterSpacing: "4px",
          }}
        >
          AI-POWERED CHARACTER ROASTS
        </div>
      </div>
    ),
    { ...size }
  );
}
