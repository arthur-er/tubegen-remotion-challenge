import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { P, SCENE_FRAMES, clamp, easeOut, panel } from "../design/tokens";
import { MOCK_ANALYTICS, MOCK_IDEAS, SELECTED_IDEA_ID } from "../mock";
import { AnimatedEntry } from "../components/AnimatedEntry";
import { ChromeHeader } from "../components/ChromeHeader";
import { SceneFade } from "../components/SceneFade";
import { Stat } from "../components/Stat";

const Confetti: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      {Array.from({ length: 28 }, (_, i) => {
        const y = interpolate(frame - 18, [0, 90], [230, 930 + (i % 6) * 20], clamp);
        const x = 260 + ((i * 137) % 1390) + Math.sin(frame * 0.06 + i) * 28;
        const opacity = interpolate(frame, [10, 28, 92], [0, 1, 0], clamp);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 9 + (i % 3) * 5,
              height: 18,
              borderRadius: 3,
              background: [P.cyan, P.mint, P.amber, P.violet][i % 4],
              opacity,
              transform: `rotate(${frame * 4 + i * 31}deg)`,
            }}
          />
        );
      })}
    </>
  );
};

export const ExportPublishScene: React.FC = () => {
  const frame = useCurrentFrame();
  const selected = MOCK_IDEAS.find((idea) => idea.id === SELECTED_IDEA_ID);
  const views = Math.floor(interpolate(frame, [74, 128], [0, MOCK_ANALYTICS.predictedViews48h], easeOut));
  const revenue = Math.floor(interpolate(frame, [74, 128], [0, MOCK_ANALYTICS.predictedRevenue], easeOut));
  const pulse = 0.65 + Math.sin((frame * Math.PI * 2) / 34) * 0.35;

  return (
    <SceneFade duration={SCENE_FRAMES.export}>
      <ChromeHeader title="Export & Publish" eyebrow="Step 04" />
      <Confetti />
      <div style={{ position: "absolute", top: 162, left: 150, right: 150 }}>
        <AnimatedEntry delay={12}>
          <h1 style={{ margin: 0, fontSize: 82, lineHeight: 1, letterSpacing: 0 }}>Video ready for launch.</h1>
        </AnimatedEntry>
        <div style={{ marginTop: 42, display: "grid", gridTemplateColumns: "1.12fr 0.88fr", gap: 30 }}>
          <AnimatedEntry delay={34}>
            <div style={panel({ padding: 22 })}>
              <div style={{ height: 438, borderRadius: 8, background: `linear-gradient(135deg, rgba(34,211,238,0.92), rgba(139,92,246,0.72)), radial-gradient(circle at 74% 34%, rgba(245,158,11,0.9), transparent 26%)`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 38, top: 34, padding: "10px 14px", borderRadius: 8, background: "rgba(0,0,0,0.55)", fontSize: 20, fontWeight: 900 }}>YouTube Thumbnail</div>
                <div style={{ position: "absolute", left: 42, bottom: 46, right: 250, fontSize: 54, lineHeight: 0.95, fontWeight: 950, textShadow: "0 8px 28px rgba(0,0,0,0.38)", letterSpacing: 0 }}>
                  I copied MrBeast for 30 days
                </div>
                <div style={{ position: "absolute", right: 42, bottom: 42, width: 164, height: 164, borderRadius: 82, background: P.amber, color: "#120B02", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, fontWeight: 950 }}>94</div>
              </div>
              <div style={{ marginTop: 18, fontSize: 28, fontWeight: 850, letterSpacing: 0 }}>{selected?.title}</div>
            </div>
          </AnimatedEntry>
          <AnimatedEntry delay={54}>
            <div style={{ display: "grid", gap: 18 }}>
              <Stat label="Predicted 48h views" value={views.toLocaleString("en-US")} color={P.cyan} />
              <Stat label="Estimated revenue" value={`$${revenue.toLocaleString("en-US")}`} color={P.amber} />
              <Stat label="CTR estimate" value={MOCK_ANALYTICS.ctrEstimate} color={P.mint} />
              <Stat label="Best publish time" value={MOCK_ANALYTICS.suggestedPublishTime} />
            </div>
          </AnimatedEntry>
        </div>
        <AnimatedEntry delay={136}>
          <div style={{ margin: "34px auto 0", width: 420, textAlign: "center", padding: "24px 30px", borderRadius: 8, background: `linear-gradient(135deg, ${P.cyan}, ${P.mint})`, color: "#031014", fontSize: 32, fontWeight: 950, boxShadow: `0 0 ${28 + pulse * 34}px rgba(34,211,238,${0.22 + pulse * 0.22})` }}>
            Export to YouTube
          </div>
        </AnimatedEntry>
      </div>
    </SceneFade>
  );
};
