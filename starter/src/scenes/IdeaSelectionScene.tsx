import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { APP_CHROME, FONT, P, SCENE_FRAMES, SPRING, easeOut, labelStyle, panel } from "../design/tokens";
import { MOCK_CHANNEL, MOCK_IDEAS, SELECTED_IDEA_ID } from "../mock";
import { AppHeader } from "../components/AppHeader";
import { CursorPointer } from "../components/CursorPointer";
import { IdeaCard } from "../components/IdeaCard";
import { MiniStat } from "../components/MiniStat";
import { SceneFade } from "../components/SceneFade";

const CENTER_TIMING = {
  start: 0,
  duration: 58,
  rightTextOut: 50,
};

const REVIEW_TIMING = {
  scrollStart: 70,
  scrollEnd: 126,
  cursorStart: 118,
  cursorArrive: 154,
  clickStart: 158,
  selectStart: 164,
  selectEnd: 188,
};

const CONTINUITY_APP = {
  scale: [0.55, 0.86],
  x: [-400, 0],
  y: [-200, 0],
  top: [74, 76],
  side: [74, 254],
  bottom: [-290, 76],
};

const APP_SCROLL = {
  y: [0, -420],
};

const CURSOR_MOTION = {
  x: [1510, 1426],
  y: [600, 386],
};

export const IdeaSelectionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const selected = MOCK_IDEAS.find((idea) => idea.id === SELECTED_IDEA_ID);
  const center = spring({
    frame: frame - CENTER_TIMING.start,
    fps,
    config: SPRING.zoom,
    durationInFrames: CENTER_TIMING.duration,
  });
  const appScale = interpolate(center, [0, 1], CONTINUITY_APP.scale);
  const appX = interpolate(center, [0, 1], CONTINUITY_APP.x);
  const appY = interpolate(center, [0, 1], CONTINUITY_APP.y);
  const appTop = interpolate(center, [0, 1], CONTINUITY_APP.top);
  const appSide = interpolate(center, [0, 1], CONTINUITY_APP.side);
  const appBottom = interpolate(center, [0, 1], CONTINUITY_APP.bottom);
  const rightTextX = interpolate(frame, [0, CENTER_TIMING.rightTextOut], [0, 920], easeOut);
  const rightTextOpacity = interpolate(frame, [0, CENTER_TIMING.rightTextOut - 10], [1, 0], easeOut);
  const contentY = interpolate(frame, [REVIEW_TIMING.scrollStart, REVIEW_TIMING.scrollEnd], APP_SCROLL.y, easeOut);
  const cursorX = interpolate(frame, [REVIEW_TIMING.cursorStart, REVIEW_TIMING.cursorArrive], CURSOR_MOTION.x, easeOut);
  const cursorY = interpolate(frame, [REVIEW_TIMING.cursorStart, REVIEW_TIMING.cursorArrive], CURSOR_MOTION.y, easeOut);
  const cursorOpacity = interpolate(
    frame,
    [REVIEW_TIMING.cursorStart - 12, REVIEW_TIMING.cursorStart, SCENE_FRAMES.ideas - 24, SCENE_FRAMES.ideas],
    [0, 1, 1, 0],
    easeOut,
  );
  const pressed = interpolate(frame, [REVIEW_TIMING.clickStart, REVIEW_TIMING.clickStart + 5, REVIEW_TIMING.clickStart + 13], [0, 1, 0], easeOut);
  const selectedGlow = interpolate(frame, [REVIEW_TIMING.selectStart, REVIEW_TIMING.selectEnd], [0, 1], easeOut);
  const dots = ".".repeat((Math.floor(frame / 9) % 3) + 1);

  return (
    <SceneFade duration={SCENE_FRAMES.ideas} fadeIn={false} fadeOut={false}>
      <div
        style={{
          position: "absolute",
          top: appTop,
          left: appSide,
          right: appSide,
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
          <AppHeader label="Idea review" />

          <div
            style={{
              position: "absolute",
              left: 84,
              right: 84,
              top: 106,
              zIndex: 1,
              transform: `translateY(${contentY}px)`,
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
              {MOCK_IDEAS.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  selected={idea.id === SELECTED_IDEA_ID && frame >= REVIEW_TIMING.selectStart}
                  selectedGlow={selectedGlow}
                />
              ))}
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
          opacity: rightTextOpacity,
          transform: `translateX(${rightTextX}px)`,
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h2 style={{ margin: 0, fontSize: 62, lineHeight: 1.02, fontWeight: 950, letterSpacing: 0 }}>
          MrBeast has repeatable signals TubeGen can turn into a video system.
        </h2>
      </div>

      <CursorPointer x={cursorX} y={cursorY} pressed={pressed} opacity={cursorOpacity} />
      
    </SceneFade>
  );
};
