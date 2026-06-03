import React from "react";
import { APP_CHROME, FONT, P } from "../design/tokens";
import { TypeText } from "./TypeText";

type ScriptSection = {
  label: string;
  timestamp: string;
  lines: string[];
};

export const wordCountForProgress = (text: string, progress: number) => {
  if (progress <= 0) {
    return 0;
  }

  return text.slice(0, Math.floor(text.length * progress)).trim().split(/\s+/).filter(Boolean).length;
};

export const ScriptSectionCard: React.FC<{
  section: ScriptSection;
  prompt: string;
  outputProgress: number;
  generated: boolean;
  generating?: boolean;
  typeStart?: number;
  typeEnd?: number;
  staticOutput?: boolean;
}> = ({ section, prompt, outputProgress, generated, generating = false, typeStart = 0, typeEnd = 0, staticOutput = false }) => {
  const body = section.lines.join(" ");
  const wordCount = wordCountForProgress(body, outputProgress);
  const readingSeconds = Math.max(0, Math.ceil(wordCount / 3));

  return (
    <div
      style={{
        background: APP_CHROME.cardBackground,
        border: `1px solid ${P.line}`,
        borderRadius: 8,
        padding: 14,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ color: P.cyan, fontWeight: 950, fontSize: 18 }}>{section.label}</span>
          <span style={{ color: P.muted, fontSize: 14 }}>{section.timestamp}</span>
        </div>
        <div
          style={{
            borderRadius: 8,
            padding: "9px 13px",
            background: generated ? P.cyan : P.panel2,
            color: generated ? "white" : P.muted,
            fontSize: 14,
            fontWeight: 950,
          }}
        >
          {generating ? "Generating" : generated ? "Generated" : "Generate"}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <div style={{ color: P.muted, fontSize: 12, fontWeight: 900, marginBottom: 6 }}>Prompt</div>
          <div
            style={{
              minHeight: 68,
              border: `1px solid ${P.line}`,
              borderRadius: 8,
              padding: 10,
              color: P.ink,
              background: "rgba(15,23,42,0.54)",
              fontSize: 14,
              lineHeight: 1.35,
            }}
          >
            {prompt}
          </div>
        </div>
        <div>
          <div style={{ color: P.muted, fontSize: 12, fontWeight: 900, marginBottom: 6 }}>Generated output</div>
          <div
            style={{
              minHeight: 68,
              border: `1px solid ${generated ? APP_CHROME.generatedBorder : P.line}`,
              borderRadius: 8,
              padding: 10,
              background: generated ? APP_CHROME.fieldActiveBackground : "rgba(15,23,42,0.38)",
              fontFamily: FONT.mono,
              fontSize: 14,
              lineHeight: 1.35,
              color: generated ? P.ink : P.muted,
            }}
          >
            {generated ? staticOutput ? body : <TypeText text={body} start={typeStart} end={typeEnd} /> : "Waiting for generation..."}
          </div>
          <div style={{ marginTop: 7, display: "flex", justifyContent: "space-between", color: P.muted, fontSize: 12, fontWeight: 850 }}>
            <span>{wordCount} words</span>
            <span>~{readingSeconds}s read</span>
          </div>
        </div>
      </div>
    </div>
  );
};
