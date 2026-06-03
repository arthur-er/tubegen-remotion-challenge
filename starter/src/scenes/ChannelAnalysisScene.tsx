import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { APP_CHROME, FONT, P, SCENE_FRAMES, SPRING, easeOut, labelStyle, panel } from "../design/tokens";
import { MOCK_CHANNEL, MOCK_IDEAS } from "../mock";
import { AnimatedEntry } from "../components/AnimatedEntry";
import { AppHeader } from "../components/AppHeader";
import { IdeaCard } from "../components/IdeaCard";
import { MiniStat } from "../components/MiniStat";
import { SceneFade } from "../components/SceneFade";
import { TypeText } from "../components/TypeText";

const INPUT_TIMING = {
  typeStart: 46,
  typeEnd: 104,
  analyzeActive: 106,
};

const ANALYSIS_TIMING = {
  loadingStart: 108,
  loadingFull: 124,
  loadingPeak: 132,
  loadingHoldEnd: 148,
  loadingEnd: 164,
  statsStart: 156,
  statsEnd: 178,
};

const ZOOM_TIMING = {
  start: 164,
  duration: 54,
};

const REVEAL_TIMING = {
  start: 190,
  end: 224,
};

const HANDOFF_TIMING = {
  promptOutStart: 176,
  promptOutEnd: 206,
  reviewInStart: 194,
  reviewInEnd: 224,
};

const UNIT_PROGRESS = [0, 1];
const FADE_RANGE = [0, 1];

const APP_ZOOM = {
  scale: [1, 0.55],
  x: [0, -400],
  y: [0, -200],
  inset: [100, 74],
  promptY: [0, -68],
};

const REVEAL_MOTION = {
  appBottom: [-290],
  textX: [80, 0],
  ideasY: [48, 0],
};

export const ChannelAnalysisScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const loading = frame >= ANALYSIS_TIMING.loadingStart && frame < ANALYSIS_TIMING.loadingEnd;
  const dots = ".".repeat((Math.floor(frame / 10) % 3) + 1);
  const zoom = spring({
    frame: frame - ZOOM_TIMING.start,
    fps,
    config: SPRING.zoom,
    durationInFrames: ZOOM_TIMING.duration,
  });

  const loadingScale = interpolate(
    frame,
    [INPUT_TIMING.typeEnd, ANALYSIS_TIMING.loadingPeak, ANALYSIS_TIMING.loadingEnd],
    [1, 1.055, 1.03],
    easeOut,
  );
  const appScale = interpolate(zoom, UNIT_PROGRESS, [loadingScale, APP_ZOOM.scale[1]]);
  const appX = interpolate(zoom, UNIT_PROGRESS, APP_ZOOM.x);
  const appY = interpolate(zoom, UNIT_PROGRESS, APP_ZOOM.y);
  const appInset = interpolate(zoom, UNIT_PROGRESS, APP_ZOOM.inset);
  const revealFrames = [REVEAL_TIMING.start, REVEAL_TIMING.end];
  const appBottom = interpolate(frame, revealFrames, [appInset, REVEAL_MOTION.appBottom[0]], easeOut);
  const promptY = interpolate(zoom, UNIT_PROGRESS, APP_ZOOM.promptY);
  const rightOpacity = interpolate(frame, revealFrames, FADE_RANGE, easeOut);
  const rightX = interpolate(frame, revealFrames, REVEAL_MOTION.textX, easeOut);
  const compactOpacity = interpolate(
    frame,
    [ANALYSIS_TIMING.loadingStart, ANALYSIS_TIMING.loadingStart + 20],
    [0, 1],
    easeOut,
  );
  const loadingOpacity = interpolate(
    frame,
    [
      ANALYSIS_TIMING.loadingStart,
      ANALYSIS_TIMING.loadingFull,
      ANALYSIS_TIMING.loadingHoldEnd,
      ANALYSIS_TIMING.loadingEnd,
    ],
    [0, 1, 1, 0],
    easeOut,
  );
  const statsOpacity = interpolate(
    frame,
    [ANALYSIS_TIMING.statsStart, ANALYSIS_TIMING.statsEnd],
    [0, 1],
    easeOut,
  );
  const ideasOpacity = interpolate(frame, revealFrames, FADE_RANGE, easeOut);
  const ideasY = interpolate(frame, revealFrames, REVEAL_MOTION.ideasY, easeOut);
  const promptOpacity = interpolate(
    frame,
    [HANDOFF_TIMING.promptOutStart, HANDOFF_TIMING.promptOutEnd],
    [1, 0],
    easeOut,
  );
  const reviewOpacity = interpolate(
    frame,
    [HANDOFF_TIMING.reviewInStart, HANDOFF_TIMING.reviewInEnd],
    [0, 1],
    easeOut,
  );

  return (
    <SceneFade duration={SCENE_FRAMES.input} fadeOut={false}>
      <div
        style={{
          position: "absolute",
          top: appInset,
          left: appInset,
          right: appInset,
          bottom: appBottom,
          transform: `perspective(1600px) translate(${appX}px, ${appY}px) scale(${appScale})`,
          transformOrigin: "center center",
        }}
      >
        <div
          style={panel({
            position: "relative",
            height: "100%",
            overflow: "hidden",
            background: APP_CHROME.bodyBackground,
          })}
        >
          <AppHeader label="New video project" nextLabel="Idea review" labelOpacity={promptOpacity} nextLabelOpacity={reviewOpacity} />

          <div
            style={{
              position: "absolute",
              left: 84,
              right: 84,
              top: 168,
              transform: `translateY(${promptY}px)`,
              opacity: promptOpacity,
            }}
          >
            <AnimatedEntry delay={10}>
              <div style={{ ...labelStyle, color: P.cyan, marginBottom: 22 }}>Start with a channel</div>
              <h1
                style={{
                  margin: 0,
                  maxWidth: 1120,
                  fontSize: 86,
                  lineHeight: 0.98,
                  fontWeight: 950,
                  letterSpacing: 0,
                }}
              >
                What channel whe are analyzing?
              </h1>
            </AnimatedEntry>
            <AnimatedEntry delay={34}>
              <div
                style={{
                  marginTop: 46,
                  display: "grid",
                  gridTemplateColumns: "1fr 190px",
                  gap: 18,
                  alignItems: "stretch",
                }}
              >
                <div
                  style={{
                    height: 102,
                    padding: "0 32px",
                    background: "rgba(2,6,23,0.72)",
                    border: `1px solid ${P.line}`,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    fontSize: 35,
                    fontFamily: FONT.mono,
                  }}
                >
                  <TypeText text={MOCK_CHANNEL.url} start={INPUT_TIMING.typeStart} end={INPUT_TIMING.typeEnd} />
                </div>
                <div
                  style={{
                    height: 102,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    background: frame > INPUT_TIMING.analyzeActive ? P.cyan : P.panel2,
                    color: frame > INPUT_TIMING.analyzeActive ? 'white' : P.muted,
                    fontSize: 25,
                    fontWeight: 950,
                  }}
                >
                  Analyze
                </div>
              </div>
            </AnimatedEntry>

            <div
              style={{
                opacity: compactOpacity,
                marginTop: 34,
              }}
            >
              <div
                style={{
                  opacity: loadingOpacity,
                  display: loadingOpacity < 0.02 ? "none" : "grid",
                  gridTemplateColumns: "1fr 220px",
                  gap: 20,
                }}
              >
                <div style={panel({ padding: 26, boxShadow: "none" })}>
                  <div style={{ ...labelStyle, color: P.cyan, fontSize: 14 }}>
                    Reading channel signals{dots}
                  </div>
                  <div style={{ marginTop: 16, fontSize: 42, fontWeight: 950, letterSpacing: 0 }}>
                    {MOCK_CHANNEL.handle}
                  </div>
                  <div style={{ marginTop: 18, height: 12, borderRadius: 999, background: "rgba(148,163,184,0.16)", overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${interpolate(
                          frame,
                          [ANALYSIS_TIMING.loadingStart, ANALYSIS_TIMING.loadingEnd - 6],
                          [8, 94],
                          easeOut,
                        )}%`,
                        height: "100%",
                        borderRadius: 999,
                        background: `linear-gradient(90deg, ${P.cyan}, ${P.mint})`,
                        boxShadow: "0 0 22px rgba(34,211,238,0.35)",
                      }}
                    />
                  </div>
                </div>
                <div style={panel({ padding: 24, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "none" })}>
                  <div style={{ width: 58, height: 58, borderRadius: 999, border: `6px solid rgba(34,211,238,0.18)`, borderTopColor: P.cyan, transform: `rotate(${frame * 9}deg)` }} />
                </div>
              </div>

              <div
                style={{
                  opacity: statsOpacity,
                  display: statsOpacity < 0.02 ? "none" : "grid",
                  gridTemplateColumns: "1.05fr 0.95fr",
                  gap: 20,
                }}
              >
                <div style={panel({ padding: 24, boxShadow: "none" })}>
                  <div style={{ ...labelStyle, color: loading ? P.cyan : P.mint, fontSize: 14 }}>
                    {loading ? `Reading channel signals${dots}` : "Channel profile ready"}
                  </div>
                  <div style={{ marginTop: 13, fontSize: 43, fontWeight: 950, letterSpacing: 0 }}>
                    {frame < ANALYSIS_TIMING.loadingEnd ? MOCK_CHANNEL.handle : MOCK_CHANNEL.name}
                  </div>
                  <div style={{ marginTop: 8, color: P.muted, fontSize: 20 }}>{MOCK_CHANNEL.niche}</div>
                  <div style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {MOCK_CHANNEL.topTopics.slice(0, 4).map((topic) => (
                      <div
                        key={topic}
                        style={{
                          border: `1px solid ${P.line}`,
                          borderRadius: 8,
                          padding: "8px 12px",
                          color: P.cyan,
                          background: "rgba(34,211,238,0.07)",
                          fontSize: 15,
                          fontWeight: 750,
                        }}
                      >
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <MiniStat label="Subscribers" value={MOCK_CHANNEL.subscribers} color={P.cyan} />
                  <MiniStat label="Avg views" value={MOCK_CHANNEL.avgViews} color={P.mint} />
                  <MiniStat label="Videos" value={String(MOCK_CHANNEL.videoCount)} />
                  <MiniStat label="Total views" value={MOCK_CHANNEL.totalViews} />
                </div>
              </div>

              <div
                style={{
                  opacity: ideasOpacity,
                  transform: `translateY(${ideasY}px)`,
                  marginTop: 22,
                  display: "grid",
                  gap: 14,
                }}
              >
                <div style={{ ...labelStyle, color: P.amber, fontSize: 14 }}>Next: generated video ideas</div>
                {MOCK_IDEAS.slice(0, 3).map((idea) => <IdeaCard key={idea.id} idea={idea} compact />)}
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              left: 84,
              right: 84,
              top: 106,
              opacity: reviewOpacity,
            }}
          >
            <div style={{ ...labelStyle, color: P.mint, fontSize: 14 }}>Channel profile ready</div>
            <div style={{ marginTop: 13, fontSize: 48, fontWeight: 950, letterSpacing: 0 }}>{MOCK_CHANNEL.name}</div>
            <div style={{ marginTop: 8, color: P.muted, fontSize: 20 }}>{MOCK_CHANNEL.niche}</div>

            <div style={{ marginTop: 26, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <MiniStat label="Subscribers" value={MOCK_CHANNEL.subscribers} color={P.cyan} />
              <MiniStat label="Avg views" value={MOCK_CHANNEL.avgViews} color={P.mint} />
            </div>

            <div style={{ marginTop: 32, display: "grid", gap: 14 }}>
              <div style={{ ...labelStyle, color: P.amber, fontSize: 14 }}>Generated video ideas</div>
              {MOCK_IDEAS.map((idea) => <IdeaCard key={idea.id} idea={idea} showScoreBadge />)}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 92,
          width: 720,
          opacity: rightOpacity,
          transform: `translateX(${rightX}px)`,
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h2 style={{ margin: 0, fontSize: 62, lineHeight: 1.02, fontWeight: 950, letterSpacing: 0 }}>
          Replicate any social media account in just one click.
        </h2>
      </div>
    </SceneFade>
  );
};
