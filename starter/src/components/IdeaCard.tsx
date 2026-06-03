import React from "react";
import { APP_CHROME, P, panel } from "../design/tokens";

type Idea = {
  id: number;
  title: string;
  viralScore: number;
  hook: string;
  tags: string[];
};

export const ScoreBadge: React.FC<{ score: number }> = ({ score }) => (
  <div
    style={{
      borderRadius: 8,
      padding: "10px 14px",
      background: "rgba(148,163,184,0.12)",
      color: P.ink,
      fontWeight: 900,
      fontSize: 20,
      whiteSpace: "nowrap",
    }}
  >
    {score} viral
  </div>
);

export const IdeaCard: React.FC<{
  idea: Idea;
  selected?: boolean;
  selectedGlow?: number;
  compact?: boolean;
  showScoreBadge?: boolean;
}> = ({ idea, selected = false, selectedGlow = selected ? 1 : 0, compact = false, showScoreBadge = false }) => {
  const borderColor = selected ? `rgba(245,158,11,${0.35 + selectedGlow * 0.42})` : P.line;

  return (
    <div
      style={panel({
        padding: compact ? "18px 20px" : "20px 22px",
        display: "grid",
        gridTemplateColumns: compact ? "1fr 178px" : "1fr 172px",
        gap: compact ? 18 : 20,
        alignItems: "center",
        boxShadow: selected ? `0 0 ${26 + selectedGlow * 42}px rgba(245,158,11,${0.16 + selectedGlow * 0.16})` : "none",
        background: selected ? APP_CHROME.selectedBackground : "rgba(2,6,23,0.52)",
        borderColor,
      })}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 26, fontWeight: 900, letterSpacing: 0 }}>
          {compact ? (
            <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: 0 }}>{idea.title}</div>
          ) : (
            <>
              <h3 style={{ fontSize: 22, marginRight: "1rem" }}>{idea.title}</h3>
              <span
                style={{
                  fontSize: 14,
                  color: P.cyan,
                  background: APP_CHROME.chipBackground,
                  padding: "6px 10px",
                  borderRadius: 6,
                  fontWeight: 800,
                  height: "fit-content",
                }}
              >
                Viral Score {idea.viralScore}
              </span>
            </>
          )}
        </div>
        <div style={{ marginTop: compact ? 6 : 7, color: P.muted, fontSize: compact ? 16 : 17 }}>{idea.hook}</div>
        {compact ? null : (
          <div style={{ marginTop: 13, display: "flex", gap: 10 }}>
            {idea.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 14,
                  color: P.cyan,
                  background: APP_CHROME.chipBackground,
                  padding: "6px 10px",
                  borderRadius: 6,
                  fontWeight: 800,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {showScoreBadge ? <ScoreBadge score={idea.viralScore} /> : null}
        <div
          style={{
            borderRadius: 8,
            padding: compact ? "16px 18px" : "13px 16px",
            textAlign: "center",
            background: selected ? P.cyan : P.panel2,
            color: selected ? "white" : P.muted,
            fontSize: compact ? 18 : 16,
            fontWeight: 950,
          }}
        >
          {selected ? "Selected" : "Start video"}
        </div>
      </div>
    </div>
  );
};
