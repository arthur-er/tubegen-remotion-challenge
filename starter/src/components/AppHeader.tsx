import React from "react";
import { APP_CHROME, P } from "../design/tokens";

export const AppHeader: React.FC<{
  label: string;
  nextLabel?: string;
  labelOpacity?: number;
  nextLabelOpacity?: number;
  labelWidth?: number;
}> = ({ label, nextLabel, labelOpacity = 1, nextLabelOpacity = 0, labelWidth = 150 }) => (
  <header
    style={{
      position: "relative",
      height: APP_CHROME.headerHeight,
      borderBottom: `1px solid ${P.line}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: APP_CHROME.headerPadding,
      background: APP_CHROME.headerBackground,
      zIndex: 100,
    }}
  >
    <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: `linear-gradient(135deg, ${P.cyan}, ${P.violet})`,
          boxShadow: APP_CHROME.brandGlow,
        }}
      />
      <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 0 }}>TubeGen AI</div>
    </div>
    <div
      style={{
        position: "relative",
        width: nextLabel ? labelWidth : "auto",
        height: nextLabel ? 24 : "auto",
        color: P.muted,
        fontSize: 17,
        fontWeight: 700,
        textAlign: "right",
      }}
    >
      <span style={{ position: nextLabel ? "absolute" : "static", right: 0, opacity: labelOpacity }}>{label}</span>
      {nextLabel ? <span style={{ position: "absolute", right: 0, opacity: nextLabelOpacity }}>{nextLabel}</span> : null}
    </div>
  </header>
);
