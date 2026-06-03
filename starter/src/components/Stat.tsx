import React from "react";
import { P, labelStyle, panel } from "../design/tokens";

export const Stat: React.FC<{ label: string; value: string; color?: string }> = ({ label, value, color = P.ink }) => (
  <div style={panel({ padding: 22 })}>
    <div style={{ ...labelStyle, fontSize: 13, marginBottom: 8 }}>{label}</div>
    <div style={{ fontSize: 34, fontWeight: 900, color, letterSpacing: 0 }}>{value}</div>
  </div>
);
