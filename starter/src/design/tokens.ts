/**
 * TubeGen AI Design System
 *
 * Start here before writing any scene code. Define your palette, spacing,
 * and spring configs once — then reference them everywhere. This is what
 * makes the video feel like a single coherent product vs. 6 disconnected slides.
 *
 * Every value below is a placeholder. Replace with your own design choices.
 */

import type { CSSProperties } from "react";
import { Easing } from "remotion";

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

export const C = {
  // Backgrounds — dark, layered
  bg: "#080810",           // primary canvas
  bgCard: "rgba(255,255,255,0.04)",   // glass panel fill
  bgCardStrong: "rgba(255,255,255,0.08)",

  // Brand — pick a palette that feels like a modern AI tool
  // Purple/violet is common in AI products; feel free to differentiate
  purple: "#7C3AED",
  violet: "#8B5CF6",
  purpleLight: "#A78BFA",
  pink: "#EC4899",
  pinkLight: "#F472B6",

  // Status / semantic
  gold: "#F59E0B",       // revenue, viral score, highlights
  goldLight: "#FCD34D",
  green: "#10B981",      // success, complete states
  greenLight: "#34D399",
  red: "#EF4444",        // errors, warnings
  blue: "#3B82F6",       // data, analytics

  // Text hierarchy
  textPrimary: "#FFFFFF",
  textSecondary: "#94A3B8",
  textMuted: "#475569",

  // UI chrome
  border: "rgba(255,255,255,0.08)",
  borderStrong: "rgba(255,255,255,0.15)",
};

export const P = {
  bg: "#070A0F",
  panel: "rgba(14, 22, 32, 0.82)",
  panel2: "rgba(18, 29, 42, 0.74)",
  line: "rgba(148, 163, 184, 0.18)",
  cyan: "#22D3EE",
  mint: "#34D399",
  amber: "#F59E0B",
  violet: C.violet,
  ink: "#F8FAFC",
  muted: "#93A4B8",
};

export const APP_CHROME = {
  headerHeight: 74,
  headerPadding: "0 28px",
  headerBackground: "linear-gradient(180deg, rgba(14,22,32,0.99), rgba(12,18,27,0.99))",
  bodyBackground: "linear-gradient(180deg, rgba(14,22,32,0.96), rgba(7,10,15,0.96))",
  contentBackground: "rgba(2,6,23,0.46)",
  sidebarBackground: "rgba(2,6,23,0.56)",
  cardBackground: "rgba(2,6,23,0.38)",
  chipBackground: "rgba(34,211,238,0.09)",
  fieldBackground: "rgba(15,23,42,0.52)",
  fieldActiveBackground: "rgba(34,211,238,0.06)",
  fieldActiveBorder: "rgba(34,211,238,0.28)",
  generatedBorder: "rgba(34,211,238,0.35)",
  selectedBackground: "rgba(245,158,11,0.08)",
  selectedBorder: "rgba(245,158,11,0.77)",
  brandGlow: "0 0 28px rgba(34,211,238,0.22)",
  selectedGlow: "0 0 68px rgba(245,158,11,0.32)",
};

export const APP_LAYOUT = {
  handoff: {
    top: 76,
    side: 254,
    bottom: 76,
    scale: 0.86,
  },
  workspace: {
    left: 54,
    right: 54,
    top: 112,
    bottom: 46,
    gap: 24,
    sidebarWidth: 350,
  },
};

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

export const FONT = {
  // Load a proper font via @remotion/google-fonts or system fallbacks
  // Example: import { loadFont } from "@remotion/google-fonts/Inter";
  //          export const { fontFamily } = loadFont();
  family: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", sans-serif',
  mono: '"SF Mono", "Fira Code", "Consolas", monospace',
};

export const TEXT = {
  hero: { fontSize: 96, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 },
  h1: { fontSize: 64, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 },
  h2: { fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2 },
  h3: { fontSize: 28, fontWeight: 600, letterSpacing: "-0.01em" },
  body: { fontSize: 18, fontWeight: 400, lineHeight: 1.6 },
  sm: { fontSize: 14, fontWeight: 400 },
  label: { fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const },
};

// ---------------------------------------------------------------------------
// Spacing
// ---------------------------------------------------------------------------

export const SPACE = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// ---------------------------------------------------------------------------
// Spring configs
// ---------------------------------------------------------------------------
// Pass these as the `config` argument to Remotion's spring() function.
// Tune stiffness/damping to match the energy of your video.

export const SPRING = {
  // Snappy, immediate — good for UI elements popping in
  snappy: { stiffness: 200, damping: 22, mass: 1 },
  // Smooth, confident — good for panels and cards
  smooth: { stiffness: 80, damping: 20, mass: 1 },
  // Bouncy, playful — good for logo reveals and celebrations
  bouncy: { stiffness: 120, damping: 10, mass: 1 },
  // Gentle, slow — good for background elements
  gentle: { stiffness: 60, damping: 15, mass: 1 },
  // Zoom
  zoom: { stiffness: 58, damping: 18, mass: 1 },
};

export const SCENE_FRAMES = {
  input: 240,
  ideas: 240,
  script: 270,
  assets: 270,
  editor: 270,
  export: 210,
};

export const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const easeOut = {
  ...clamp,
  easing: Easing.bezier(0.16, 1, 0.3, 1),
};

// ---------------------------------------------------------------------------
// Reusable style objects
// ---------------------------------------------------------------------------

export const gradientText = {
  background: `linear-gradient(135deg, ${C.violet}, ${C.pinkLight})`,
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
};

export const glassPanel = {
  background: C.bgCard,
  border: `1px solid ${C.border}`,
  borderRadius: 20,
  backdropFilter: "blur(20px)",
};

export const sceneShell: CSSProperties = {
  background:
    "radial-gradient(circle at 15% 15%, rgba(34,211,238,0.18), transparent 28%), radial-gradient(circle at 84% 18%, rgba(139,92,246,0.18), transparent 24%), linear-gradient(135deg, #070A0F 0%, #0B1017 48%, #05070B 100%)",
  color: P.ink,
  fontFamily: FONT.family,
  overflow: "hidden",
};

export const panel = (extra?: CSSProperties): CSSProperties => ({
  background: P.panel,
  border: `1px solid ${P.line}`,
  borderRadius: 8,
  boxShadow: "0 24px 80px rgba(0,0,0,0.36)",
  backdropFilter: "blur(22px)",
  ...extra,
});

export const labelStyle: CSSProperties = {
  color: P.muted,
  fontSize: 22,
  fontWeight: 700,
  letterSpacing: 0,
  textTransform: "uppercase",
};
