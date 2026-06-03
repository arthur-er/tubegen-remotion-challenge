import React from "react";
import { Composition } from "remotion";
import { VIDEO_CONFIG, Video } from "./Video";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TubeGenVideo"
        component={Video}
        fps={VIDEO_CONFIG.fps}
        durationInFrames={VIDEO_CONFIG.durationInFrames}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />
    </>
  );
};
