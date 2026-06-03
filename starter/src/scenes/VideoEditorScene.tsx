import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { APP_CHROME, APP_LAYOUT, P, SCENE_FRAMES, easeOut, labelStyle, panel } from "../design/tokens";
import { MOCK_CAPTIONS, MOCK_IDEAS, MOCK_TIMELINE_CLIPS, SELECTED_IDEA_ID } from "../mock";
import { AppHeader } from "../components/AppHeader";
import { AssetPackageList } from "../components/AssetPackageList";
import { ControlField } from "../components/ControlField";
import { SceneFade } from "../components/SceneFade";

const TRANSITION_TIMING = {
  assetsOutStart: 18,
  assetsOutEnd: 54,
  editorInStart: 44,
  editorInEnd: 78,
};

const AssetReadyHandoff: React.FC = () => {
  const selectedIdea = MOCK_IDEAS.find((idea) => idea.id === SELECTED_IDEA_ID) ?? MOCK_IDEAS[0];

  return (
    <div
      style={{
        position: "absolute",
        left: 54,
        right: 54,
        top: 112,
        bottom: 46,
        display: "grid",
        gridTemplateColumns: "1fr 350px",
        gap: 24,
      }}
    >
      <div style={panel({ padding: 24, height: "100%", overflow: "hidden", boxShadow: "none", background: "rgba(2,6,23,0.46)" })}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ ...labelStyle, color: P.amber, fontSize: 14 }}>Asset generation</div>
            <h2 style={{ margin: "8px 0 0", fontSize: 28, lineHeight: 1, letterSpacing: 0 }}>Build the production package</h2>
          </div>
          <div style={{ color: P.mint, fontWeight: 900, fontSize: 18 }}>Video ready</div>
        </div>
        <AssetPackageList completed />
      </div>
      <aside style={panel({ padding: 24, height: "100%", boxShadow: "none", background: "rgba(2,6,23,0.56)", display: "flex", flexDirection: "column" })}>
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
        <div style={{ borderRadius: 8, padding: "15px 18px", textAlign: "center", background: P.mint, color: "white", fontSize: 16, fontWeight: 900, boxShadow: "0 0 28px rgba(52,211,153,0.34)" }}>
          Video ready
        </div>
      </aside>
    </div>
  );
};

export const VideoEditorScene: React.FC = () => {
  const frame = useCurrentFrame();
  const selectedIdea = MOCK_IDEAS.find((idea) => idea.id === SELECTED_IDEA_ID) ?? MOCK_IDEAS[0];
  const assetOpacity = interpolate(frame, [TRANSITION_TIMING.assetsOutStart, TRANSITION_TIMING.assetsOutEnd], [1, 0], easeOut);
  const assetY = interpolate(frame, [TRANSITION_TIMING.assetsOutStart, TRANSITION_TIMING.assetsOutEnd], [0, -40], easeOut);
  const editorOpacity = interpolate(frame, [TRANSITION_TIMING.editorInStart, TRANSITION_TIMING.editorInEnd], [0, 1], easeOut);
  const editorY = interpolate(frame, [TRANSITION_TIMING.editorInStart, TRANSITION_TIMING.editorInEnd], [46, 0], easeOut);
  const headerAssetOpacity = interpolate(frame, [18, 38], [1, 0], easeOut);
  const headerEditorOpacity = interpolate(frame, [32, 52], [0, 1], easeOut);
  const playhead = interpolate(frame, [86, SCENE_FRAMES.editor - 20], [0, 1], easeOut);
  const previewPulse = 0.5 + Math.sin(frame * 0.08) * 0.5;
  const captionIndex = Math.min(MOCK_CAPTIONS.length - 1, Math.max(0, Math.floor(interpolate(frame, [96, 218], [0, MOCK_CAPTIONS.length], easeOut))));

  return (
    <SceneFade duration={SCENE_FRAMES.editor} fadeIn={false}>
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
          <AppHeader label="Asset studio" nextLabel="Video editor" labelOpacity={headerAssetOpacity} nextLabelOpacity={headerEditorOpacity} />

          <div style={{ position: "absolute", inset: 0, opacity: assetOpacity, transform: `translateY(${assetY}px)` }}>
            <AssetReadyHandoff />
          </div>

          <div
            style={{
              position: "absolute",
              left: 54,
              right: 54,
              top: 112,
              bottom: 46,
              opacity: editorOpacity,
              transform: `translateY(${editorY}px)`,
              display: "grid",
              gridTemplateColumns: "1fr 310px",
              gap: 24,
            }}
          >
            <div style={panel({ padding: 24, height: "100%", overflow: "hidden", boxShadow: "none", background: "rgba(2,6,23,0.46)" })}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <div style={{ ...labelStyle, color: P.amber, fontSize: 14 }}>Video editor</div>
                  <h2 style={{ margin: "8px 0 0", fontSize: 28, lineHeight: 1, letterSpacing: 0 }}>Preview generated video</h2>
                </div>
                <div style={{ color: P.mint, fontWeight: 900, fontSize: 18 }}>Playing draft</div>
              </div>

              <div
                style={{
                  height: 318,
                  borderRadius: 10,
                  border: `1px solid ${P.line}`,
                  background:
                    "linear-gradient(135deg, rgba(34,211,238,0.16), rgba(139,92,246,0.18)), radial-gradient(circle at 72% 24%, rgba(245,158,11,0.34), transparent 24%), #050913",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "inset 0 0 80px rgba(0,0,0,0.35)",
                }}
              >
                <div style={{ position: "absolute", left: 28, top: 24, borderRadius: 8, padding: "8px 12px", background: "rgba(0,0,0,0.52)", color: P.ink, fontSize: 15, fontWeight: 900 }}>
                  Generated video preview
                </div>
                <div style={{ position: "absolute", left: 46, bottom: 94, right: 300, color: P.ink, fontSize: 46, lineHeight: 0.95, fontWeight: 950, letterSpacing: 0 }}>
                  Every MrBeast Challenge Ranked
                </div>
                <div style={{ position: "absolute", right: 56, top: 56, width: 178, height: 178, borderRadius: 999, background: `rgba(245,158,11,${0.55 + previewPulse * 0.25})`, color: "#120B02", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 62, fontWeight: 950 }}>
                  88
                </div>
                <div style={{ position: "absolute", left: 120, right: 120, bottom: 32, textAlign: "center", color: P.ink, fontSize: 24, fontWeight: 950, textShadow: "0 4px 18px rgba(0,0,0,0.7)" }}>
                  {MOCK_CAPTIONS[captionIndex].text}
                </div>
                <div style={{ position: "absolute", left: 28, right: 28, bottom: 18, height: 4, borderRadius: 999, background: "rgba(148,163,184,0.2)" }}>
                  <div style={{ width: `${playhead * 100}%`, height: "100%", borderRadius: 999, background: P.cyan }} />
                </div>
              </div>

              <div style={{ marginTop: 18, height: 142, border: `1px solid ${P.line}`, borderRadius: 10, background: "rgba(2,6,23,0.36)", position: "relative", overflow: "hidden", padding: 16 }}>
                <div style={{ display: "grid", gap: 12 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div style={{ width: 72, color: P.muted, fontSize: 12, fontWeight: 900 }}>Video</div>
                    <div style={{ position: "relative", flex: 1, height: 30 }}>
                      {MOCK_TIMELINE_CLIPS.map((clip) => (
                        <div key={clip.id} style={{ position: "absolute", left: clip.start, width: clip.width, top: 0, bottom: 0, borderRadius: 7, background: clip.color, color: "white", display: "flex", alignItems: "center", paddingLeft: 10, fontSize: 12, fontWeight: 900 }}>
                          {clip.label}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div style={{ width: 72, color: P.muted, fontSize: 12, fontWeight: 900 }}>Voice</div>
                    <div style={{ flex: 1, height: 26, borderRadius: 7, background: "rgba(52,211,153,0.16)", display: "flex", alignItems: "center", gap: 4, padding: "0 10px" }}>
                      {Array.from({ length: 58 }, (_, index) => (
                        <div key={index} style={{ width: 4, height: 5 + ((index * 9) % 18), borderRadius: 999, background: P.mint, opacity: 0.38 + playhead * 0.42 }} />
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div style={{ width: 72, color: P.muted, fontSize: 12, fontWeight: 900 }}>Captions</div>
                    <div style={{ flex: 1, height: 26, borderRadius: 7, background: "rgba(34,211,238,0.11)", color: P.cyan, display: "flex", alignItems: "center", padding: "0 10px", fontSize: 12, fontWeight: 900 }}>
                      Bold captions synced to voiceover
                    </div>
                  </div>
                </div>
                <div style={{ position: "absolute", top: 12, bottom: 12, left: 96 + playhead * 620, width: 3, borderRadius: 999, background: P.amber, boxShadow: "0 0 18px rgba(245,158,11,0.5)" }} />
              </div>
            </div>

            <aside style={panel({ padding: 24, height: "100%", boxShadow: "none", background: "rgba(2,6,23,0.56)", display: "flex", flexDirection: "column" })}>
              <div style={{ ...labelStyle, color: P.cyan, fontSize: 14 }}>Preview controls</div>
              <div style={{ marginTop: 18, display: "grid", gap: 16 }}>
                <ControlField label="Video title" active>{selectedIdea.title}</ControlField>
                <ControlField label="Runtime">6:20 draft</ControlField>
                <ControlField label="Format">16:9 YouTube</ControlField>
                <ControlField label="Render status">All assets linked</ControlField>
              </div>
              <div style={{ marginTop: 22, display: "grid", gap: 10 }}>
                {[
                  ["Thumbnail", P.amber],
                  ["Visuals", P.cyan],
                  ["Voiceover", P.mint],
                  ["Music", P.violet],
                  ["Captions", P.cyan],
                ].map(([label, color]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", color: P.muted, fontSize: 14, fontWeight: 850 }}>
                    <span>{label}</span>
                    <span style={{ color }}>Ready</span>
                  </div>
                ))}
              </div>
              <div style={{ flex: 1 }} />
              <div style={{ borderRadius: 8, padding: "15px 18px", textAlign: "center", background: P.cyan, color: "white", fontSize: 16, fontWeight: 900 }}>
                Open final preview
              </div>
            </aside>
          </div>
        </div>
      </div>
    </SceneFade>
  );
};
