import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const CLASS_COLORS: Record<string, string> = {
  "Death Knight": "#C41E3A",
  "Demon Hunter": "#A330C9",
  "Druid":        "#FF7C0A",
  "Evoker":       "#33937F",
  "Hunter":       "#AAD372",
  "Mage":         "#3FC7EB",
  "Monk":         "#00FF98",
  "Paladin":      "#F48CBA",
  "Priest":       "#E2E8F0",
  "Rogue":        "#FFF468",
  "Shaman":       "#0070DD",
  "Warlock":      "#8788EE",
  "Warrior":      "#C69B6D",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const name        = searchParams.get("name")    ?? "Unknown";
  const realm       = searchParams.get("realm")   ?? "";
  const region      = (searchParams.get("region") ?? "").toUpperCase();
  const cls         = searchParams.get("class")   ?? "";
  const spec        = searchParams.get("spec")    ?? "";
  const ilvl        = searchParams.get("ilvl")    ?? "0";
  const mplus       = searchParams.get("mplus")   ?? "0";
  const roastTitle  = searchParams.get("title")   ?? "Roasted";
  const snippet     = searchParams.get("snippet") ?? "";

  const classColor = CLASS_COLORS[cls] ?? "#9CA3AF";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#090910",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "52px 60px 44px 60px",
          position: "relative",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, transparent, #3b82f6, #818cf8, #3b82f6, transparent)",
          }}
        />

        {/* Header: branding + class badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <span style={{ color: "#3b82f6", fontSize: "26px", fontWeight: 900, letterSpacing: "0.12em" }}>
            WOWROAST.COM
          </span>
          <span
            style={{
              color: classColor,
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              padding: "4px 14px",
              border: `1px solid ${classColor}33`,
              borderRadius: "6px",
            }}
          >
            {spec ? `${spec} ${cls}` : cls}
          </span>
        </div>

        {/* Character name + realm / stats */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "28px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: classColor, fontSize: "58px", fontWeight: 900, lineHeight: 1, marginBottom: "8px" }}>
              {name}
            </span>
            <span style={{ color: "#4b5563", fontSize: "22px", letterSpacing: "0.04em" }}>
              {realm} · {region}
            </span>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "44px", alignItems: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ color: classColor, fontSize: "48px", fontWeight: 900, lineHeight: 1 }}>
                {ilvl}
              </span>
              <span style={{ color: "#374151", fontSize: "13px", letterSpacing: "0.22em", marginTop: "4px" }}>
                ILVL
              </span>
            </div>
            <div style={{ width: "1px", height: "52px", background: "#1f2937" }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ color: "#60a5fa", fontSize: "48px", fontWeight: 900, lineHeight: 1 }}>
                {mplus}
              </span>
              <span style={{ color: "#374151", fontSize: "13px", letterSpacing: "0.22em", marginTop: "4px" }}>
                M+ SCORE
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "#1a1a2e", marginBottom: "28px" }} />

        {/* Roast title */}
        <div
          style={{
            fontSize: "38px",
            fontWeight: 900,
            color: "#e2e8f0",
            lineHeight: 1.25,
            marginBottom: "20px",
          }}
        >
          &ldquo;{roastTitle}&rdquo;
        </div>

        {/* Roast snippet */}
        <div
          style={{
            fontSize: "19px",
            color: "#4b5563",
            lineHeight: 1.65,
            flex: 1,
            overflow: "hidden",
          }}
        >
          {snippet}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            color: "#1f2937",
            fontSize: "14px",
            letterSpacing: "0.35em",
            marginTop: "16px",
          }}
        >
          ROASTED BY AI · DATA FROM RAIDER.IO & WCL
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
