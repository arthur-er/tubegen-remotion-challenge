import React from "react";
import { P, labelStyle } from "../design/tokens";

export const MiniStat: React.FC<{ label: string; value: string; color?: string }> = ({
  label,
  value,
  color = P.ink,
}) => (
  <div
    style={{
      border: `1px solid ${P.line}`,
      borderRadius: 8,
      background: "rgba(2,6,23,0.48)",
      padding: 18,
    }}
  >
    <div style={{ ...labelStyle, fontSize: 12, marginBottom: 8 }}>{label}</div>
    <div style={{ color, fontSize: 27, fontWeight: 900, letterSpacing: 0 }}>{value}</div>
  </div>
);
