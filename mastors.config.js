// mastors.config.js
// ─────────────────────────────────────────────────────────────
// Mastors Design System — Configuration File
// Edit this file to customise every design token, theme, and
// feature flag in your project.
// After changes run:  npx mastors build  (or rebuild your SCSS)
// Docs: https://mastorscdn.kehem.com/docs/config
// ─────────────────────────────────────────────────────────────

/** @type {import('@mastors/core').MastorsConfig} */
module.exports = {

  // ── General ────────────────────────────────────────────────
  // Class prefix applied to all utility classes.
  // e.g. "m-" → .m-flex, .m-grid-cols-3
  prefix: "",

  // Append !important to every generated utility rule.
  important: false,

  // Dark-mode strategy:
  //   "class"          → .dark .bg-primary   (toggle a class on <html>)
  //   "media"          → @media (prefers-color-scheme: dark)
  //   "data-attribute" → [data-theme="dark"] .bg-primary
  darkMode: "class",

  // Enable right-to-left utilities (.ms-*, .me-*, logical props…)
  rtl: false,

  // ── Colors ─────────────────────────────────────────────────
  colors: {
    // Primary brand color — 11-shade scale (50 … 950)
    primary: {
      50:  "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",   // ← default accent
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
      950: "#172554",
    },

    // Secondary / complementary brand color
    secondary: {
      50:  "#f5f3ff",
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#8b5cf6",
      600: "#7c3aed",
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95",
      950: "#2e1065",
    },

    // Accent color (optional — falls back to primary-500 if null)
    accent: null,

    // Semantic palette overrides (null = use built-in defaults)
    success: null,
    warning: null,
    error:   null,
    info:    null,

    // Add any custom palette keys here:
    // brand: { 500: "#ff6b35", ... },
  },

  // ── Typography ─────────────────────────────────────────────
  typography: {
    // Base HTML font size in px — all rem values are relative to this
    baseFontSize: 16,

    // Default line-height on <body>
    baseLineHeight: 1.5,

    // Default letter-spacing on <body>
    baseLetterSpacing: "normal",

    // Font-family stacks  (keys: "sans" | "serif" | "mono" | any custom name)
    fontFamilies: {
      sans:  "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      serif: "Georgia, Cambria, 'Times New Roman', Times, serif",
      mono:  "ui-monospace, 'SFMono-Regular', Menlo, Monaco, Consolas, monospace",
    },

    // Body font key — must match a key in fontFamilies above
    defaultFont: "sans",

    // Heading font key — can differ from body
    headingFont: "sans",

    // Heading font weight
    headingFontWeight: "700",

    // Smooth anti-aliasing for headings
    headingSmoothing: true,

    // Font-size scale overrides (merges with the built-in scale)
    // e.g. { "2xl": "1.625rem", "display": "5rem" }
    fontSizeOverrides: {},

    // Font-weight overrides
    // e.g. { bold: "800" }
    fontWeightOverrides: {},

    // Line-height overrides
    // e.g. { tight: "1.2" }
    lineHeightOverrides: {},
  },

  // ── Spacing ────────────────────────────────────────────────
  spacing: {
    // Unit for the spacing scale: "rem" | "px" | "em"
    unit: "rem",

    // Base spacing unit (px).
    // 1 step = baseUnit / baseFontSize  rem
    // e.g. baseUnit 4 → step-4 = 1rem, step-8 = 2rem  (Tailwind-compatible)
    baseUnit: 4,

    // Merge extra custom steps into the scale
    // e.g. { "128": "32rem", "144": "36rem" }
    extend: {},
  },

  // ── Border Radius ──────────────────────────────────────────
  radius: {
    // Default radius applied to buttons, cards, inputs, etc.
    default: "0.375rem",   // maps to the "md" step

    // Override individual scale steps
    // e.g. { none: "0", sm: "0.125rem", lg: "0.75rem", full: "9999px" }
    overrides: {},
  },

  // ── Borders ────────────────────────────────────────────────
  borders: {
    // Default border width
    defaultWidth: "1px",
    // Default border style
    defaultStyle: "solid",
    // Default border color key (resolves from semantic theme tokens)
    defaultColor: "border",
  },

  // ── Shadows ────────────────────────────────────────────────
  shadows: {
    // Override individual shadow scale steps
    // e.g. { md: "0 4px 12px 0 rgb(0 0 0 / 15%)" }
    overrides: {},
  },

  // ── Breakpoints ────────────────────────────────────────────
  breakpoints: {
    xs:    "475px",
    sm:    "640px",
    md:    "768px",
    lg:    "1024px",
    xl:    "1280px",
    "2xl": "1536px",
  },

  // ── Z-Index Scale ──────────────────────────────────────────
  zIndex: {
    overrides: {
      // e.g. modal: "500", tooltip: "700", toast: "900"
    },
  },

  // ── Opacity Scale ──────────────────────────────────────────
  opacity: {
    overrides: {
      // e.g. { "10": "0.10", "15": "0.15" }
    },
  },

  // ── Transitions ────────────────────────────────────────────
  transitions: {
    // Default duration for all transition utilities
    defaultDuration: "200ms",
    // Default easing curve
    defaultEasing: "cubic-bezier(0.4, 0, 0.2, 1)",   // "ease-in-out"
    // Additional named durations merged into the scale
    // e.g. { slow: "500ms", instant: "0ms" }
    durationOverrides: {},
  },

  // ── Container ──────────────────────────────────────────────
  container: {
    // Centre the container block by default
    center: true,
    // Horizontal padding inside the container
    padding: "1rem",
    // Per-breakpoint horizontal padding (overrides `padding` above)
    // e.g. { md: "2rem", lg: "4rem" }
    paddingPerBreakpoint: {},
    // Max-widths per breakpoint (null = no max-width at that bp)
    maxWidths: {
      sm:    "640px",
      md:    "768px",
      lg:    "1024px",
      xl:    "1280px",
      "2xl": "1536px",
    },
  },

  // ── Theme Tokens (semantic CSS custom properties) ──────────
  // These map to CSS variables: --mastors-<key>
  // Use them in your SCSS as var(--mastors-bg), var(--mastors-text), etc.
  theme: {
    light: {
      // Surface & background
      // bg:             "#ffffff",
      // bg-subtle:      "#f9fafb",
      // surface:        "#ffffff",

      // Text
      // text:           "#111827",
      // text-muted:     "#6b7280",
      // text-subtle:    "#9ca3af",

      // Borders
      // border:         "#e5e7eb",
      // border-strong:  "#9ca3af",

      // Accent (defaults to primary-600)
      // accent:         "#2563eb",
      // accent-hover:   "#1d4ed8",
      // accent-subtle:  "#eff6ff",
      // accent-text:    "#ffffff",
    },
    dark: {
      // Surface & background
      // bg:             "#0f172a",
      // bg-subtle:      "#111827",
      // surface:        "#111827",

      // Text
      // text:           "#f9fafb",
      // text-muted:     "#9ca3af",

      // Accent (defaults to primary-400 in dark)
      // accent:         "#60a5fa",
      // accent-hover:   "#93c5fd",
    },
  },

  // ── Feature Flags ──────────────────────────────────────────
  // Set to false to completely tree-shake that module from the build.
  features: {
    flexer:     true,   // flexbox utilities
    gridder:    true,   // CSS grid utilities
    typography: true,   // type-scale utilities
    themes:     true,   // light/dark theme vars
    animator:   true,   // animation/transition utilities
    responsive: true,   // responsive modifier prefixes
    utilities:  true,   // general utility classes
    helpers:    true,   // helper classes (sr-only, truncate…)
    a11y:       true,   // accessibility utilities
  },

  // ── Plugins / Extensions ───────────────────────────────────
  // Array of paths (relative to this config) to extra SCSS files
  // appended after the Mastors core layer.
  // e.g. ["./src/scss/custom-components.scss"]
  plugins: [],
}
