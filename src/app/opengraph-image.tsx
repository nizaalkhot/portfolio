import { ImageResponse } from "next/og";
import { site } from "@/data/content";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 72,
          background: "#0a0a0b",
          backgroundImage:
            "radial-gradient(ellipse 800px 500px at 600px 80px, rgba(0,255,136,0.18), transparent)",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 999,
              border: "1px solid rgba(0,255,136,0.4)",
              background: "rgba(0,255,136,0.08)",
              color: "#00ff88",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            N
          </div>
          <div style={{ fontSize: 22, opacity: 0.7, letterSpacing: -0.2 }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -3,
              maxWidth: 980,
            }}
          >
            Autonomous AI systems. Not decks.
          </div>
          <div style={{ display: "flex", fontSize: 28, opacity: 0.6, maxWidth: 900 }}>
            {site.role} · Agentic AI · MCP · Multi-Agent Systems
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 18,
            color: "#8b8b8b",
          }}
        >
          <div style={{ display: "flex", gap: 14 }}>
            <span style={{ color: "#00ff88" }}>+</span>
            <span>LangGraph</span>
            <span>·</span>
            <span>CrewAI</span>
            <span>·</span>
            <span>MCP</span>
            <span>·</span>
            <span>AWS Bedrock</span>
          </div>
          <div style={{ display: "flex" }}>{site.location}</div>
        </div>
      </div>
    ),
    size,
  );
}
