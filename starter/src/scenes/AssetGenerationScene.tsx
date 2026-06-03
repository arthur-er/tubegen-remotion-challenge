import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { APP_CHROME, APP_LAYOUT, P, SCENE_FRAMES, easeOut, labelStyle, panel } from "../design/tokens";
import { MOCK_IDEAS, MOCK_SCRIPT, MOCK_SCRIPT_PROMPTS, SELECTED_IDEA_ID } from "../mock";
import { AppHeader } from "../components/AppHeader";
import { AssetPackageList } from "../components/AssetPackageList";
import { ControlField } from "../components/ControlField";
import { SceneFade } from "../components/SceneFade";
import { ScriptSectionCard, wordCountForProgress } from "../components/ScriptSectionCard";

const TRANSITION_TIMING = {
  scriptOutStart: 18,
  scriptOutEnd: 54,
  assetsInStart: 44,
  assetsInEnd: 78,
};

const ASSET_TIMING = {
  revealStart: 84,
  revealGap: 22,
  exportMoveStart: 204,
  exportClick: 224,
  ready: 252,
};

const ScriptHandoff: React.FC = () => {
  const selectedIdea = MOCK_IDEAS.find((idea) => idea.id === SELECTED_IDEA_ID) ?? MOCK_IDEAS[0];

  return (
    <WorkspaceShell>
      <div style={panel({ padding: 24, height: "100%", overflow: "hidden", boxShadow: "none", background: APP_CHROME.contentBackground })}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ ...labelStyle, color: P.amber, fontSize: 14 }}>Script builder</div>
            <h2 style={{ margin: "8px 0 0", fontSize: 28, lineHeight: 1, letterSpacing: 0 }}>Build each section from prompt to draft</h2>
          </div>
          <div style={{ color: P.mint, fontWeight: 900, fontSize: 18 }}>Script complete</div>
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          {MOCK_SCRIPT.sections.map((section, index) => (
            <ScriptSectionCard
              key={section.label}
              section={section}
              prompt={MOCK_SCRIPT_PROMPTS[index]}
              outputProgress={1}
              generated
              staticOutput
            />
          ))}
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
          {MOCK_SCRIPT.sections.map((section) => (
            <div key={section.label} style={{ display: "flex", justifyContent: "space-between", color: P.muted, fontSize: 14, fontWeight: 850 }}>
              <span>{section.label}</span>
              <span style={{ color: P.mint }}>{wordCountForProgress(section.lines.join(" "), 1)}w</span>
            </div>
          ))}
        </div>
      </aside>
    </WorkspaceShell>
  );
};

export const AssetGenerationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const selectedIdea = MOCK_IDEAS.find((idea) => idea.id === SELECTED_IDEA_ID) ?? MOCK_IDEAS[0];
  const scriptOpacity = interpolate(frame, [TRANSITION_TIMING.scriptOutStart, TRANSITION_TIMING.scriptOutEnd], [1, 0], easeOut);
  const scriptY = interpolate(frame, [TRANSITION_TIMING.scriptOutStart, TRANSITION_TIMING.scriptOutEnd], [0, -40], easeOut);
  const assetsOpacity = interpolate(frame, [TRANSITION_TIMING.assetsInStart, TRANSITION_TIMING.assetsInEnd], [0, 1], easeOut);
  const assetsY = interpolate(frame, [TRANSITION_TIMING.assetsInStart, TRANSITION_TIMING.assetsInEnd], [46, 0], easeOut);
  const headerScriptOpacity = interpolate(frame, [18, 38], [1, 0], easeOut);
  const headerAssetsOpacity = interpolate(frame, [32, 52], [0, 1], easeOut);
  const exporting = frame >= ASSET_TIMING.exportClick && frame < ASSET_TIMING.ready;
  const ready = frame >= ASSET_TIMING.ready;

  return (
    <SceneFade duration={SCENE_FRAMES.assets} fadeIn={false} fadeOut={false}>
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
          <AppHeader label="Script writer" nextLabel="Asset studio" labelOpacity={headerScriptOpacity} nextLabelOpacity={headerAssetsOpacity} />

          <div style={{ position: "absolute", inset: 0, opacity: scriptOpacity, transform: `translateY(${scriptY}px)` }}>
            <ScriptHandoff />
          </div>

          <WorkspaceShell style={{ opacity: assetsOpacity, transform: `translateY(${assetsY}px)` }}>
            <div style={panel({ padding: 24, height: "100%", overflow: "hidden", boxShadow: "none", background: APP_CHROME.contentBackground })}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <div style={{ ...labelStyle, color: P.amber, fontSize: 14 }}>Asset generation</div>
                  <h2 style={{ margin: "8px 0 0", fontSize: 28, lineHeight: 1, letterSpacing: 0 }}>Build the production package</h2>
                </div>
                <div style={{ color: ready ? P.mint : P.cyan, fontWeight: 900, fontSize: 18 }}>{ready ? "Video ready" : "Generating assets"}</div>
              </div>

              <AssetPackageList frame={frame} revealStart={ASSET_TIMING.revealStart} revealGap={ASSET_TIMING.revealGap} />
            </div>

            <aside style={panel({ padding: 24, height: "100%", boxShadow: "none", background: APP_CHROME.sidebarBackground, display: "flex", flexDirection: "column" })}>
              <div style={{ ...labelStyle, color: P.cyan, fontSize: 14 }}>Asset controls</div>
              <div style={{ marginTop: 18, display: "grid", gap: 16 }}>
                <ControlField label="Thumbnail generation prompt" active>
                  High contrast YouTube thumbnail for: {selectedIdea.title}. Big ranking energy, shocked expression, bold yellow number badge.
                </ControlField>
                <ControlField label="Voice">Adam</ControlField>
                <ControlField label="Tone">Energetic documentary</ControlField>
                <ControlField label="Language">English US</ControlField>
              </div>
              <div style={{ flex: 1 }} />
              <div
                style={{
                  borderRadius: 8,
                  padding: "15px 18px",
                  textAlign: "center",
                  background: ready ? P.mint : P.cyan,
                  color: "white",
                  fontSize: 16,
                  fontWeight: 900,
                  boxShadow: ready ? "0 0 28px rgba(52,211,153,0.34)" : "none",
                }}
              >
                {exporting ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 999,
                        border: "3px solid rgba(255,255,255,0.35)",
                        borderTopColor: "white",
                        transform: `rotate(${frame * 12}deg)`,
                      }}
                    />
                    Exporting
                  </span>
                ) : ready ? "Video ready" : "Export"}
              </div>
            </aside>
          </WorkspaceShell>
        </div>
      </div>
    </SceneFade>
  );
};

const WorkspaceShell: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div
    style={{
      position: "absolute",
      left: APP_LAYOUT.workspace.left,
      right: APP_LAYOUT.workspace.right,
      top: APP_LAYOUT.workspace.top,
      bottom: APP_LAYOUT.workspace.bottom,
      display: "grid",
      gridTemplateColumns: `1fr ${APP_LAYOUT.workspace.sidebarWidth}px`,
      gap: APP_LAYOUT.workspace.gap,
      ...style,
    }}
  >
    {children}
  </div>
);
