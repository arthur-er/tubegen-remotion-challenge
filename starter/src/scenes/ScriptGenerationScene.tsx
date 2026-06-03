import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { APP_CHROME, APP_LAYOUT, P, SCENE_FRAMES, easeOut, labelStyle, panel } from "../design/tokens";
import { MOCK_IDEAS, MOCK_SCRIPT, MOCK_SCRIPT_PROMPTS, SELECTED_IDEA_ID } from "../mock";
import { AppHeader } from "../components/AppHeader";
import { ControlField } from "../components/ControlField";
import { CursorPointer } from "../components/CursorPointer";
import { IdeaCard } from "../components/IdeaCard";
import { MiniStat } from "../components/MiniStat";
import { SceneFade } from "../components/SceneFade";
import { ScriptSectionCard, wordCountForProgress } from "../components/ScriptSectionCard";

const TRANSITION_TIMING = {
  ideaOutStart: 18,
  ideaOutEnd: 54,
  scriptInStart: 44,
  scriptInEnd: 78,
};

const SCRIPT_TIMING = {
  cursorIn: 82,
  clicks: [96, 136, 176, 216],
  ranges: [
    [104, 132],
    [144, 172],
    [184, 212],
    [224, 252],
  ],
  complete: 252,
};

const CURSOR_POINTS = [
  { x: 910, y: 190 },
  { x: 910, y: 330 },
  { x: 910, y: 470 },
  { x: 910, y: 610 },
];

export const ScriptGenerationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const selectedIdea = MOCK_IDEAS.find((idea) => idea.id === SELECTED_IDEA_ID) ?? MOCK_IDEAS[0];
  const ideaOpacity = interpolate(frame, [TRANSITION_TIMING.ideaOutStart, TRANSITION_TIMING.ideaOutEnd], [1, 0], easeOut);
  const ideaY = interpolate(frame, [TRANSITION_TIMING.ideaOutStart, TRANSITION_TIMING.ideaOutEnd], [0, -44], easeOut);
  const scriptOpacity = interpolate(frame, [TRANSITION_TIMING.scriptInStart, TRANSITION_TIMING.scriptInEnd], [0, 1], easeOut);
  const scriptY = interpolate(frame, [TRANSITION_TIMING.scriptInStart, TRANSITION_TIMING.scriptInEnd], [52, 0], easeOut);
  const headerIdeaOpacity = interpolate(frame, [18, 38], [1, 0], easeOut);
  const headerScriptOpacity = interpolate(frame, [32, 52], [0, 1], easeOut);
  const complete = frame > SCRIPT_TIMING.complete;
  const cursorSegment = SCRIPT_TIMING.clicks.findIndex((click, index) => {
    const nextClick = SCRIPT_TIMING.clicks[index + 1] ?? SCENE_FRAMES.script;
    return frame < nextClick;
  });
  const activeCursorIndex = Math.max(0, cursorSegment);
  const previousCursor = CURSOR_POINTS[Math.max(0, activeCursorIndex - 1)];
  const nextCursor = CURSOR_POINTS[activeCursorIndex];
  const cursorMoveStart = activeCursorIndex === 0 ? SCRIPT_TIMING.cursorIn : SCRIPT_TIMING.clicks[activeCursorIndex - 1] + 10;
  const cursorMoveEnd = SCRIPT_TIMING.clicks[activeCursorIndex];
  const cursorX = interpolate(frame, [cursorMoveStart, cursorMoveEnd], [previousCursor.x, nextCursor.x], easeOut);
  const cursorY = interpolate(frame, [cursorMoveStart, cursorMoveEnd], [previousCursor.y, nextCursor.y], easeOut);
  const cursorOpacity = interpolate(frame, [SCRIPT_TIMING.cursorIn - 12, SCRIPT_TIMING.cursorIn, SCRIPT_TIMING.complete, SCENE_FRAMES.script], [0, 1, 1, 0], easeOut);
  const pressed = Math.max(...SCRIPT_TIMING.clicks.map((click) => interpolate(frame, [click, click + 5, click + 12], [0, 1, 0], easeOut)));

  return (
    <SceneFade duration={SCENE_FRAMES.script} fadeIn={false} fadeOut={false}>
      <div
        style={{
          position: "absolute",
          top: APP_LAYOUT.handoff.top,
          left: APP_LAYOUT.handoff.side,
          right: APP_LAYOUT.handoff.side,
          bottom: APP_LAYOUT.handoff.bottom,
          transform: `perspective(1600px) scale(${APP_LAYOUT.handoff.scale})`,
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
          <AppHeader label="Idea review" nextLabel="Script writer" labelOpacity={headerIdeaOpacity} nextLabelOpacity={headerScriptOpacity} labelWidth={140} />

          <div
            style={{
              position: "absolute",
              left: 84,
              right: 84,
              top: 106,
              zIndex: 1,
              opacity: ideaOpacity,
              transform: `translateY(${-420 + ideaY}px)`,
            }}
          >
            <div style={{ ...labelStyle, color: P.mint, fontSize: 14 }}>Channel profile ready</div>
            <div style={{ marginTop: 13, fontSize: 48, fontWeight: 950, letterSpacing: 0 }}>MrBeast</div>
            <div style={{ marginTop: 8, color: P.muted, fontSize: 20 }}>Challenge & Philanthropy</div>

            <div style={{ marginTop: 26, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <MiniStat label="Subscribers" value="248M" color={P.cyan} />
              <MiniStat label="Avg views" value="89M" color={P.mint} />
            </div>

            <div style={{ marginTop: 32, display: "grid", gap: 14 }}>
              <div style={{ ...labelStyle, color: P.amber, fontSize: 14 }}>Generated video ideas</div>
              {MOCK_IDEAS.map((idea) => <IdeaCard key={idea.id} idea={idea} selected={idea.id === SELECTED_IDEA_ID} />)}
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              left: APP_LAYOUT.workspace.left,
              right: APP_LAYOUT.workspace.right,
              top: APP_LAYOUT.workspace.top,
              bottom: APP_LAYOUT.workspace.bottom,
              opacity: scriptOpacity,
              transform: `translateY(${scriptY}px)`,
              display: "grid",
              gridTemplateColumns: `1fr ${APP_LAYOUT.workspace.sidebarWidth}px`,
              gap: APP_LAYOUT.workspace.gap,
            }}
          >
            <div style={panel({ padding: 24, height: "100%", overflow: "hidden", boxShadow: "none", background: APP_CHROME.contentBackground })}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <div style={{ ...labelStyle, color: P.amber, fontSize: 14 }}>Script builder</div>
                  <h2 style={{ margin: "8px 0 0", fontSize: 28, lineHeight: 1, letterSpacing: 0 }}>Build each section from prompt to draft</h2>
                </div>
                <div style={{ color: complete ? P.mint : P.cyan, fontWeight: 900, fontSize: 18 }}>{complete ? "Script complete" : "Generating"}</div>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {MOCK_SCRIPT.sections.map((section, index) => {
                  const [start, end] = SCRIPT_TIMING.ranges[index];
                  const outputProgress = interpolate(frame, [start, end], [0, 1], easeOut);
                  const generated = frame >= start;
                  const generating = frame >= start && frame < end;

                  return (
                    <ScriptSectionCard
                      key={section.label}
                      section={section}
                      prompt={MOCK_SCRIPT_PROMPTS[index]}
                      outputProgress={outputProgress}
                      generated={generated}
                      generating={generating}
                      typeStart={start}
                      typeEnd={end}
                    />
                  );
                })}
              </div>
            </div>

            <aside style={panel({ padding: 24, height: "100%", boxShadow: "none", background: APP_CHROME.sidebarBackground })}>
              <div style={{ ...labelStyle, color: P.cyan, fontSize: 14 }}>Script inputs</div>
              <div style={{ marginTop: 18, display: "grid", gap: 16 }}>
                <ControlField label="Video title" active>{selectedIdea.title}</ControlField>
                <ControlField label="Target runtime">{MOCK_SCRIPT.estimatedRuntime}</ControlField>
                <ControlField label="Tone">Energetic ranking</ControlField>
              </div>
              <div style={{ marginTop: 22, borderRadius: 8, padding: "15px 18px", textAlign: "center", background: P.cyan, color: "white", fontSize: 16, fontWeight: 500 }}>
                Start building script
              </div>
              <div style={{ marginTop: 22, display: "grid", gap: 10 }}>
                {MOCK_SCRIPT.sections.map((section, index) => {
                  const [start, end] = SCRIPT_TIMING.ranges[index];
                  const body = section.lines.join(" ");
                  const progress = interpolate(frame, [start, end], [0, 1], easeOut);
                  const count = wordCountForProgress(body, progress);
                  return (
                    <div key={section.label} style={{ display: "flex", justifyContent: "space-between", color: P.muted, fontSize: 14, fontWeight: 850 }}>
                      <span>{section.label}</span>
                      <span style={{ color: frame >= end ? P.mint : frame >= start ? P.cyan : P.muted }}>{count}w</span>
                    </div>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </div>

      <CursorPointer x={cursorX} y={cursorY} pressed={pressed} opacity={cursorOpacity} accent />
    </SceneFade>
  );
};
