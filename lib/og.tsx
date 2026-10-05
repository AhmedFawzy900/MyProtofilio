import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const logoSrc = readFile(join(process.cwd(), "public/logo.jpg"), "base64").then((b) => `data:image/jpeg;base64,${b}`);

export async function renderOg({
  eyebrow,
  title,
  subtitle,
  tags = [],
  accent = ["#22d3ee", "#d946ef"],
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  tags?: string[];
  accent?: [string, string];
}) {
  const logo = await logoSrc;
  const host = siteUrl.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#05060f",
          color: "#e7e9f3",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${accent[0]}55, transparent 65%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            left: -200,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${accent[1]}40, transparent 65%)`,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={84} height={84} style={{ borderRadius: 20 }} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: "#fff" }}>{profile.name}</div>
            <div style={{ fontSize: 22, color: "#8d93ab" }}>{profile.title}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: accent[0],
              marginBottom: 18,
            }}
          >
            {eyebrow}
          </div>
          <div style={{ display: "flex", fontSize: title.length > 28 ? 64 : 80, fontWeight: 800, color: "#fff", lineHeight: 1.05 }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#c3c7d8", marginTop: 20, lineHeight: 1.35, maxWidth: 980 }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {tags.slice(0, 5).map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  fontSize: 22,
                  padding: "8px 18px",
                  borderRadius: 9999,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.05)",
                  color: "#e7e9f3",
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#8d93ab" }}>{host}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
