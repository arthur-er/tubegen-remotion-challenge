import React from "react";
import { APP_CHROME, P } from "../design/tokens";

export const ControlField: React.FC<{ label: string; children: React.ReactNode; active?: boolean }> = ({
  label,
  children,
  active,
}) => (
  <div>
    <div style={{ color: P.muted, fontSize: 13, fontWeight: 900, marginBottom: 8 }}>{label}</div>
    <div
      style={{
        border: `1px solid ${active ? APP_CHROME.fieldActiveBorder : P.line}`,
        borderRadius: 8,
        padding: 14,
        background: active ? APP_CHROME.fieldActiveBackground : APP_CHROME.fieldBackground,
        color: P.ink,
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 1.35,
      }}
    >
      {children}
    </div>
  </div>
);
