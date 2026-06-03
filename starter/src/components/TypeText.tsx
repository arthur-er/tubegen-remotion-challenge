import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { clamp } from "../design/tokens";

export const TypeText: React.FC<{ text: string; start: number; end: number; style?: React.CSSProperties }> = ({
  text,
  start,
  end,
  style,
}) => {
  const frame = useCurrentFrame();
  const chars = Math.floor(interpolate(frame, [start, end], [0, text.length], clamp));
  const cursor = frame >= start && frame <= end && Math.floor(frame / 10) % 2 === 0 ? "|" : "";

  return <span style={style}>{text.slice(0, chars)}{cursor}</span>;
};
