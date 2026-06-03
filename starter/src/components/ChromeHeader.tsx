import React from "react";
import { P, labelStyle, panel } from "../design/tokens";

export const ChromeHeader: React.FC<{ title: string; eyebrow: string }> = ({ title, eyebrow }) => (
  <div style={{ position: "absolute", top: 58, left: 72, right: 72, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      <div style={{ width: 42, height: 42, borderRadius: 8, background: `linear-gradient(135deg, ${P.cyan}, ${P.violet})`, boxShadow: `0 0 34px rgba(34,211,238,0.28)` }} />
      <div>
        <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: 0 }}>TubeGen AI</div>
        <div style={{ ...labelStyle, fontSize: 13 }}>{eyebrow}</div>
      </div>
    </div>
    <div style={{ ...panel({ padding: "10px 16px", fontSize: 18, color: P.muted }) }}>{title}</div>
  </div>
);
