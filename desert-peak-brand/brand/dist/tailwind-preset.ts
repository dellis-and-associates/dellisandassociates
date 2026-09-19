/* GENERATED from brand/design-tokens.json (v2.2.0) by scripts/build-tokens.ts. Do not edit by hand. */
/**
 * Tailwind preset: semantic roles -> utility names. Every value is a CSS variable from tokens.css,
 * so dark mode is a token swap, not a rebuild. The default colour palette is replaced (not extended)
 * on purpose: the site never hardcodes a hex.
 *
 *   // tailwind.config.ts (v3)         // app.css (v4)
 *   presets: [desertPeak]              @config "@desert-peak/brand/tailwind-preset";
 */
const desertPeak = {
  "theme": {
    "colors": {
      "transparent": "transparent",
      "current": "currentColor",
      "surface": {
        "DEFAULT": "var(--dp-surface)",
        "raised": "var(--dp-surface-raised)",
        "sunken": "var(--dp-surface-sunken)",
        "inverse": "var(--dp-surface-inverse)"
      },
      "ink": {
        "DEFAULT": "var(--dp-ink)",
        "secondary": "var(--dp-ink-secondary)",
        "muted": "var(--dp-ink-muted)",
        "inverse": "var(--dp-ink-inverse)"
      },
      "border": {
        "DEFAULT": "var(--dp-border)",
        "strong": "var(--dp-border-strong)"
      },
      "brand": {
        "DEFAULT": "var(--dp-brand)",
        "hover": "var(--dp-brand-hover)",
        "active": "var(--dp-brand-active)",
        "ink": "var(--dp-brand-ink)",
        "subtle": "var(--dp-brand-subtle)",
        "subtle-ink": "var(--dp-brand-subtle-ink)"
      },
      "accent": {
        "DEFAULT": "var(--dp-accent)",
        "strong": "var(--dp-accent-strong)"
      },
      "focus": {
        "ring": "var(--dp-focus-ring)",
        "ring-offset": "var(--dp-focus-ring-offset)"
      },
      "positive": {
        "DEFAULT": "var(--dp-positive)",
        "surface": "var(--dp-positive-surface)",
        "border": "var(--dp-positive-border)",
        "ink": "var(--dp-positive-ink)"
      },
      "notice": {
        "DEFAULT": "var(--dp-notice)",
        "surface": "var(--dp-notice-surface)",
        "border": "var(--dp-notice-border)",
        "ink": "var(--dp-notice-ink)"
      },
      "critical": {
        "DEFAULT": "var(--dp-critical)",
        "surface": "var(--dp-critical-surface)",
        "border": "var(--dp-critical-border)",
        "ink": "var(--dp-critical-ink)"
      }
    },
    "fontFamily": {
      "sans": [
        "var(--dp-font-sans)"
      ],
      "serif": [
        "var(--dp-font-serif)"
      ],
      "display": [
        "var(--dp-font-display)"
      ],
      "text": [
        "var(--dp-font-text)"
      ],
      "mono": [
        "var(--dp-font-mono)"
      ]
    },
    "fontSize": {
      "caption": [
        "var(--dp-text-caption-size)",
        {
          "lineHeight": "var(--dp-text-caption-line-height)",
          "letterSpacing": "var(--dp-text-caption-letter-spacing)",
          "fontWeight": "var(--dp-text-caption-weight)"
        }
      ],
      "small": [
        "var(--dp-text-small-size)",
        {
          "lineHeight": "var(--dp-text-small-line-height)",
          "letterSpacing": "var(--dp-text-small-letter-spacing)",
          "fontWeight": "var(--dp-text-small-weight)"
        }
      ],
      "body": [
        "var(--dp-text-body-size)",
        {
          "lineHeight": "var(--dp-text-body-line-height)",
          "letterSpacing": "var(--dp-text-body-letter-spacing)",
          "fontWeight": "var(--dp-text-body-weight)"
        }
      ],
      "lead": [
        "var(--dp-text-lead-size)",
        {
          "lineHeight": "var(--dp-text-lead-line-height)",
          "letterSpacing": "var(--dp-text-lead-letter-spacing)",
          "fontWeight": "var(--dp-text-lead-weight)"
        }
      ],
      "title-sm": [
        "var(--dp-text-title-sm-size)",
        {
          "lineHeight": "var(--dp-text-title-sm-line-height)",
          "letterSpacing": "var(--dp-text-title-sm-letter-spacing)",
          "fontWeight": "var(--dp-text-title-sm-weight)"
        }
      ],
      "title": [
        "var(--dp-text-title-size)",
        {
          "lineHeight": "var(--dp-text-title-line-height)",
          "letterSpacing": "var(--dp-text-title-letter-spacing)",
          "fontWeight": "var(--dp-text-title-weight)"
        }
      ],
      "title-lg": [
        "var(--dp-text-title-lg-size)",
        {
          "lineHeight": "var(--dp-text-title-lg-line-height)",
          "letterSpacing": "var(--dp-text-title-lg-letter-spacing)",
          "fontWeight": "var(--dp-text-title-lg-weight)"
        }
      ],
      "headline": [
        "var(--dp-text-headline-size)",
        {
          "lineHeight": "var(--dp-text-headline-line-height)",
          "letterSpacing": "var(--dp-text-headline-letter-spacing)",
          "fontWeight": "var(--dp-text-headline-weight)"
        }
      ],
      "display": [
        "var(--dp-text-display-size)",
        {
          "lineHeight": "var(--dp-text-display-line-height)",
          "letterSpacing": "var(--dp-text-display-letter-spacing)",
          "fontWeight": "var(--dp-text-display-weight)"
        }
      ],
      "display-lg": [
        "var(--dp-text-display-lg-size)",
        {
          "lineHeight": "var(--dp-text-display-lg-line-height)",
          "letterSpacing": "var(--dp-text-display-lg-letter-spacing)",
          "fontWeight": "var(--dp-text-display-lg-weight)"
        }
      ],
      "display-xl": [
        "var(--dp-text-display-xl-size)",
        {
          "lineHeight": "var(--dp-text-display-xl-line-height)",
          "letterSpacing": "var(--dp-text-display-xl-letter-spacing)",
          "fontWeight": "var(--dp-text-display-xl-weight)"
        }
      ],
      "display-l": [
        "var(--dp-text-display-l-size)",
        {
          "lineHeight": "var(--dp-text-display-l-line-height)",
          "letterSpacing": "var(--dp-text-display-l-letter-spacing)",
          "fontWeight": "var(--dp-text-display-l-weight)"
        }
      ],
      "display-m": [
        "var(--dp-text-display-m-size)",
        {
          "lineHeight": "var(--dp-text-display-m-line-height)",
          "letterSpacing": "var(--dp-text-display-m-letter-spacing)",
          "fontWeight": "var(--dp-text-display-m-weight)"
        }
      ],
      "lede": [
        "var(--dp-text-lede-size)",
        {
          "lineHeight": "var(--dp-text-lede-line-height)",
          "letterSpacing": "var(--dp-text-lede-letter-spacing)",
          "fontWeight": "var(--dp-text-lede-weight)"
        }
      ],
      "subhead": [
        "var(--dp-text-subhead-size)",
        {
          "lineHeight": "var(--dp-text-subhead-line-height)",
          "letterSpacing": "var(--dp-text-subhead-letter-spacing)",
          "fontWeight": "var(--dp-text-subhead-weight)"
        }
      ],
      "copy": [
        "var(--dp-text-copy-size)",
        {
          "lineHeight": "var(--dp-text-copy-line-height)",
          "letterSpacing": "var(--dp-text-copy-letter-spacing)",
          "fontWeight": "var(--dp-text-copy-weight)"
        }
      ],
      "meta": [
        "var(--dp-text-meta-size)",
        {
          "lineHeight": "var(--dp-text-meta-line-height)",
          "letterSpacing": "var(--dp-text-meta-letter-spacing)",
          "fontWeight": "var(--dp-text-meta-weight)"
        }
      ],
      "label": [
        "var(--dp-text-label-size)",
        {
          "lineHeight": "var(--dp-text-label-line-height)",
          "letterSpacing": "var(--dp-text-label-letter-spacing)",
          "fontWeight": "var(--dp-text-label-weight)"
        }
      ],
      "stat": [
        "var(--dp-text-stat-size)",
        {
          "lineHeight": "var(--dp-text-stat-line-height)",
          "letterSpacing": "var(--dp-text-stat-letter-spacing)",
          "fontWeight": "var(--dp-text-stat-weight)"
        }
      ]
    },
    "spacing": {
      "0": "var(--dp-space-0)",
      "1": "var(--dp-space-1)",
      "2": "var(--dp-space-2)",
      "3": "var(--dp-space-3)",
      "4": "var(--dp-space-4)",
      "5": "var(--dp-space-5)",
      "6": "var(--dp-space-6)",
      "8": "var(--dp-space-8)",
      "10": "var(--dp-space-10)",
      "12": "var(--dp-space-12)",
      "16": "var(--dp-space-16)",
      "20": "var(--dp-space-20)",
      "24": "var(--dp-space-24)",
      "32": "var(--dp-space-32)",
      "px": "var(--dp-space-px)",
      "band-y": "var(--dp-space-band-y)",
      "band-gap": "var(--dp-space-band-gap)",
      "gutter": "var(--dp-space-gutter)"
    },
    "borderRadius": {
      "none": "0px",
      "control": "var(--dp-radius-control)",
      "surface": "var(--dp-radius-surface)",
      "pill": "var(--dp-radius-pill)"
    },
    "boxShadow": {
      "0": "var(--dp-shadow-0)",
      "1": "var(--dp-shadow-1)",
      "2": "var(--dp-shadow-2)",
      "3": "var(--dp-shadow-3)",
      "none": "none"
    },
    "transitionDuration": {
      "fast": "var(--dp-duration-fast)",
      "base": "var(--dp-duration-base)",
      "slow": "var(--dp-duration-slow)",
      "deliberate": "var(--dp-duration-deliberate)",
      "entrance": "var(--dp-duration-entrance)",
      "stagger": "var(--dp-duration-stagger)"
    },
    "transitionTimingFunction": {
      "standard": "var(--dp-ease-standard)",
      "enter": "var(--dp-ease-enter)",
      "exit": "var(--dp-ease-exit)",
      "out": "var(--dp-ease-out)"
    },
    "extend": {
      "maxWidth": {
        "measure-page": "var(--dp-measure-page)",
        "measure-narrow": "var(--dp-measure-narrow)",
        "measure-body": "var(--dp-measure-body)",
        "measure-wide": "var(--dp-measure-wide)",
        "measure-shell": "var(--dp-measure-shell)",
        "measure-editorial": "var(--dp-measure-editorial)"
      }
    }
  }
} as const;

export default desertPeak;
