import React from "react";
import { interpolate } from "remotion";
import { P } from "../design/tokens";

export const CursorPointer: React.FC<{
  x: number;
  y: number;
  opacity: number;
  pressed: number;
  accent?: boolean;
}> = ({ x, y, opacity, pressed, accent = false }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      opacity,
      transform: `translate(-8px, -6px) scale(${interpolate(pressed, [0, 1], [1, 0.9])})`,
      filter: accent
        ? "drop-shadow(0 14px 20px rgba(0,0,0,0.52)) drop-shadow(0 0 12px rgba(34,211,238,0.35))"
        : "drop-shadow(0 14px 20px rgba(0,0,0,0.42))",
      zIndex: accent ? 1000 : 6,
    }}
  >
    <svg width={accent ? 54 : 32} height={accent ? 62 : 32} viewBox="0 0 54 62" fill="none">
      <path d="M7 5L45 41L28 43L20 58L7 5Z" fill="#F8FAFC" stroke="#071018" strokeWidth="4" strokeLinejoin="round" />
      {accent ? <path d="M29 42L41 57" stroke="#071018" strokeWidth="6" strokeLinecap="round" /> : null}
      {accent ? <path d="M29 42L41 57" stroke={P.cyan} strokeWidth="3" strokeLinecap="round" /> : null}
    </svg>
  </div>
);
