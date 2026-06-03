import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRING, easeOut } from "../design/tokens";

export const AnimatedEntry: React.FC<{
  delay: number;
  children: React.ReactNode;
  x?: number;
  y?: number;
  style?: React.CSSProperties;
}> = ({ delay, children, x = 0, y = 34, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING.smooth,
    durationInFrames: 24,
  });
  const opacity = interpolate(frame, [delay, delay + 18], [0, 1], easeOut);

  return (
    <div
      style={{
        opacity,
        transform: `translate(${interpolate(progress, [0, 1], [x, 0])}px, ${interpolate(
          progress,
          [0, 1],
          [y, 0],
        )}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
