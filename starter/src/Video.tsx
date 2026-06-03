import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { AssetGenerationScene } from "./scenes/AssetGenerationScene";
import { ChannelAnalysisScene } from "./scenes/ChannelAnalysisScene";
import { IdeaSelectionScene } from "./scenes/IdeaSelectionScene";
import { ScriptGenerationScene } from "./scenes/ScriptGenerationScene";
import { VideoEditorScene } from "./scenes/VideoEditorScene";
import { P, SCENE_FRAMES } from "./design/tokens";

/**
 * PROTOTYPE - throwaway composition for validating the four required scenes.
 *
 * Question: Does the scoped TubeGen workflow feel compelling when reduced to
 * channel analysis -> idea selection -> script generation -> publish forecast?
 */

export const VIDEO_CONFIG = {
  fps: 30,
  width: 1920,
  height: 1080,
  durationInFrames:
    SCENE_FRAMES.input + SCENE_FRAMES.ideas + SCENE_FRAMES.script + SCENE_FRAMES.assets + SCENE_FRAMES.editor,
};

export const Video: React.FC = () => (
  <AbsoluteFill style={{ background: P.bg }}>
    <Series>
      <Series.Sequence durationInFrames={SCENE_FRAMES.input}>
        <ChannelAnalysisScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_FRAMES.ideas}>
        <IdeaSelectionScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_FRAMES.script}>
        <ScriptGenerationScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_FRAMES.assets}>
        <AssetGenerationScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_FRAMES.editor}>
        <VideoEditorScene />
      </Series.Sequence>
    </Series>
  </AbsoluteFill>
);
