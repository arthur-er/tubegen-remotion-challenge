import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { clamp, sceneShell } from "../design/tokens";

export const SceneFade: React.FC<{
  duration: number;
  children: React.ReactNode;
  fadeIn?: boolean;
  fadeOut?: boolean;
}> = ({
  duration,
  children,
  fadeIn = true,
  fadeOut = true,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 14, duration - 18, duration],
    [fadeIn ? 0 : 1, 1, 1, fadeOut ? 0 : 1],
    clamp,
  );

  return <AbsoluteFill style={{ ...sceneShell, opacity }}>{children}</AbsoluteFill>;
};
