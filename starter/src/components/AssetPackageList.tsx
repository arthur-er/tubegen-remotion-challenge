import React from "react";
import { interpolate } from "remotion";
import { APP_CHROME, P, easeOut } from "../design/tokens";

const ASSET_ITEMS = [
  { label: "Thumbnail", accent: P.amber, status: "3 variants" },
  { label: "Visuals Gallery", accent: P.cyan, status: "12 shots" },
  { label: "Voiceover", accent: P.mint, status: "6:20 narration" },
  { label: "Music Gallery", accent: P.violet, status: "4 tracks" },
  { label: "Captions", accent: P.cyan, status: "847 words" },
];

export const AssetPackageList: React.FC<{
  frame?: number;
  revealStart?: number;
  revealGap?: number;
  completed?: boolean;
}> = ({ frame = 0, revealStart = 0, revealGap = 0, completed = false }) => (
  <div style={{ display: "grid", gap: 10 }}>
    {ASSET_ITEMS.map((item, index) => {
      const start = revealStart + index * revealGap;
      const progress = completed ? 1 : interpolate(frame, [start, start + 24], [0, 1], easeOut);
      const ready = completed || frame >= start + 24;

      return (
        <div
          key={item.label}
          style={{
            opacity: progress,
            transform: `translateY(${interpolate(progress, [0, 1], [18, 0])}px)`,
            background: APP_CHROME.cardBackground,
            border: `1px solid ${P.line}`,
            borderRadius: 8,
            padding: 14,
            display: "grid",
            gridTemplateColumns: item.label === "Thumbnail" ? "160px 1fr" : "1fr",
            gap: 14,
          }}
        >
          {item.label === "Thumbnail" ? <ThumbnailMini /> : null}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ color: item.accent, fontSize: 20, fontWeight: 950 }}>{item.label}</div>
              <div style={{ color: ready ? P.mint : P.cyan, fontSize: 14, fontWeight: 900 }}>{ready ? "Ready" : "Generating"}</div>
            </div>
            <div style={{ marginTop: 8, color: P.muted, fontSize: 14 }}>{item.status}</div>
            {item.label === "Visuals Gallery" || item.label === "Music Gallery" ? <GalleryPreview accent={item.accent} /> : null}
            {item.label === "Voiceover" ? <Waveform opacity={completed ? 0.9 : 0.35 + progress * 0.55} /> : null}
            {item.label === "Captions" ? <CaptionChips /> : null}
          </div>
        </div>
      );
    })}
  </div>
);

const ThumbnailMini: React.FC = () => (
  <div
    style={{
      height: 92,
      borderRadius: 8,
      background:
        "linear-gradient(135deg, rgba(34,211,238,0.92), rgba(139,92,246,0.72)), radial-gradient(circle at 78% 34%, rgba(245,158,11,0.9), transparent 28%)",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div style={{ position: "absolute", left: 12, bottom: 12, right: 42, color: "white", fontSize: 16, lineHeight: 0.95, fontWeight: 950 }}>
      Brutal MrBeast Challenges
    </div>
    <div
      style={{
        position: "absolute",
        right: 10,
        bottom: 10,
        width: 32,
        height: 32,
        borderRadius: 999,
        background: P.amber,
        color: "#120B02",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 13,
        fontWeight: 950,
      }}
    >
      88
    </div>
  </div>
);

const GalleryPreview: React.FC<{ accent: string }> = ({ accent }) => (
  <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
    {Array.from({ length: 4 }, (_, cardIndex) => (
      <div key={cardIndex} style={{ height: 34, borderRadius: 7, background: `linear-gradient(135deg, ${accent}55, rgba(15,23,42,0.88))`, border: `1px solid ${P.line}` }} />
    ))}
  </div>
);

const Waveform: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div style={{ marginTop: 10, height: 26, display: "flex", alignItems: "center", gap: 4 }}>
    {Array.from({ length: 24 }, (_, bar) => (
      <div key={bar} style={{ width: 5, height: 7 + ((bar * 11) % 19), borderRadius: 999, background: P.mint, opacity }} />
    ))}
  </div>
);

const CaptionChips: React.FC = () => (
  <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
    {["Bold", "Pop", "Synced"].map((caption) => (
      <span key={caption} style={{ borderRadius: 999, padding: "6px 9px", background: APP_CHROME.chipBackground, color: P.cyan, fontSize: 12, fontWeight: 900 }}>
        {caption}
      </span>
    ))}
  </div>
);
