---
name: Modern Culinary Ordering
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#3f493f'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#6f7a6e'
  outline-variant: '#becabc'
  surface-tint: '#006d30'
  primary: '#00652c'
  on-primary: '#ffffff'
  primary-container: '#15803d'
  on-primary-container: '#d3ffd5'
  inverse-primary: '#79db8d'
  secondary: '#1f6c3a'
  on-secondary: '#ffffff'
  secondary-container: '#a4f1b2'
  on-secondary-container: '#24703e'
  tertiary: '#4e5868'
  on-tertiary: '#ffffff'
  tertiary-container: '#667082'
  on-tertiary-container: '#f0f4ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#95f8a7'
  primary-fixed-dim: '#79db8d'
  on-primary-fixed: '#00210a'
  on-primary-fixed-variant: '#005323'
  secondary-fixed: '#a6f4b5'
  secondary-fixed-dim: '#8bd79b'
  on-secondary-fixed: '#00210b'
  on-secondary-fixed-variant: '#005226'
  tertiary-fixed: '#d9e3f7'
  tertiary-fixed-dim: '#bdc7db'
  on-tertiary-fixed: '#121c2a'
  on-tertiary-fixed-variant: '#3d4757'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 3.5rem
    fontWeight: '700'
    lineHeight: 4rem
    letterSpacing: -0.025em
  display-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Inter
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
  price-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.375rem
    fontWeight: '700'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  price-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.0625rem
    fontWeight: '600'
    lineHeight: 1.5rem
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-desktop: 2rem
  margin: 1.5rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system delivers a restrained, high-end digital dining interface tailored for premium culinary establishments. The aesthetic bridges architectural precision with warm, sensory appetite appeal. Visual noise is eliminated; layout clarity, disciplined typographic cadence, and generous negative space elevate dishes into curated exhibits rather than commoditized listings.

The visual style is rooted in modern editorial minimalism:
- **Purity over decoration:** Surface integrity relies on clinical white canvas spaces, muted hairline dividers, and intentional margins.
- **Purposeful action:** Deep forest green accents are deployed strictly for focal interaction points—cart additions, table confirmations, checkout progress—ensuring direct eye tracking.
- **Editorial confidence:** High-contrast charcoal typography provides razor-sharp readability for dish titles, detailed provenance notes, dietary markers, and localized currency valuations.

## Colors

The palette is anchored by extreme neutrals, supported by a deliberate, appetizing green tone that avoids artificial brightness in favor of culinary freshness:

- **Canvas & Surfaces:**
  - Base Background: `#FFFFFF` (pure crisp white canvas)
  - Surface Muted / Alt: `#F9FAFB` (receptive hover fills, passive selection backgrounds)
  - Surface Subdued: `#F3F4F6` (tertiary badges, secondary progress bars)
- **Borders & Dividers:**
  - Hairline Subtle: `#E5E7EB` (card perimeters, grid separators, category dividers)
  - Hairline Light: `#F3F4F6` (internal metadata lines, inner component grouping)
- **Text & Hierarchy:**
  - Primary Content: `#111827` (dish nomenclature, primary totals, impactful headlines)
  - Secondary Content: `#1F2937` (dietary details, culinary ingredients, labels)
  - Tertiary / Supporting: `#4B5563` (preparation times, portion counts, descriptive subtitles)
  - Muted / Placeholders: `#9CA3AF` (search prompts, passive iconography)
- **Brand & Accent:**
  - Primary Action: `#15803D` (active CTA fills, selected states, quantity highlights)
  - Interactive Hover / Focus: `#166534` (pressed buttons, cart badges, active filter tabs)
  - Subtle Accent Wash: `#F0FDF4` (success toast backgrounds, vegetarian indicators, active selection fills)

## Typography

The typography couples the structural clarity of Plus Jakarta Sans for titles, numerical valuations, and interactive markers with Inter's neutral, legible prose rendering for ingredients, menus, and narrative dish descriptions.

- **Currency Treatment:** The Indian Rupee symbol (`₹`) is rendered alongside prices without unnatural spacing (`₹450`, `₹1,250`) using tabular figures (`font-variant-numeric: tabular-nums`) to ensure vertical alignment throughout ordering lists and order summaries.
- **Visual Weighting:** Dish titles use medium-to-semibold weights to maintain presence against crisp photographic elements without crowding the canvas.
- **Metadata Handling:** Preparation times, dietary classifications, and portion notes utilize `label-sm` or `body-sm` with subdued neutral tones to preserve scannability.

## Layout & Spacing

The layout structure is built upon a 12-column fixed-max grid engineered for broad desktop displays, capped at `1440px` width with generous horizontal canvas margins (`3rem`).

- **Grid Distribution:**
  - Menu listing matrices employ a uniform 3-column layout on standard desktop screens (`1024px+`) and expand to 4 columns on widescreen viewports (`1440px+`).
  - Checkout and active order tracking viewports utilize an asymmetric 8:4 column layout: 8 columns dedicated to culinary browsing/customization and 4 sticky columns for live bill calculations and order progress.
- **Spatial Rhythm:**
  - Micro-spacing (`0.25rem` to `0.5rem`) controls item-level associations such as badges, price tags, and ingredient bullets.
  - Intermediate spacing (`1rem` to `1.5rem`) governs card internal padding, item separation in list mode, and input groupings.
  - Macro-spacing (`2.5rem` and greater) demarcates menu category shifts (e.g., Starters to Mains), seasonal carousels, and global site footers.

## Elevation & Depth

This system intentionally departs from aggressive, blurry shadows in favor of low-contrast hairline outlines and subtle, crisp tonal shifts.

- **Level 0 (Flat Canvas):** Neutral `#FFFFFF` background with 1px `#E5E7EB` borders establishing container divisions. No dropshadow.
- **Level 1 (Interactive Hover & Cards):** When hovering over actionable food cards, elevation is communicated through a subtle border color shift to `#D1D5DB` paired with a delicate, tight shadow: `0 4px 12px -2px rgba(17, 24, 39, 0.05)`.
- **Level 2 (Dropdowns & Flyout Cart):** Floating modifiers, search typeaheads, and sidebar order panels utilize a multi-layered, low-opacity ambient drop: `0 10px 25px -5px rgba(17, 24, 39, 0.08), 0 0 0 1px #E5E7EB`.
- **Level 3 (Modal Modifiers & Order Progress Overlays):** Centered modal dialogues apply `0 20px 40px -10px rgba(17, 24, 39, 0.12)` layered above a translucent backing sheet: `rgba(17, 24, 39, 0.4)`.

## Shapes

The interface embraces a restrained geometric curvature (`roundedness: 1`):

- **Interactive Nodes:** Standard action buttons, quantity step controls, input fields, and pill tags implement `0.25rem` to `0.375rem` (`rounded-md`), evoking precision craftsmanship.
- **Containers & Framing:** Food display cards, flyout cart containers, and dialog boxes use `0.5rem` (`rounded-lg`), softening the overall structure while retaining precise edge boundaries.
- **Dietary Badges:** Traditional dietary markers (e.g., green dot inside a square frame for vegetarian cuisine, brown triangle for non-vegetarian) maintain crisp, unrounded 0px borders to honor established culinary iconography standards.

## Components

### Action Buttons
- **Primary CTA ("Add to Order", "Proceed to Payment"):** Background `#15803D`, foreground `#FFFFFF`, border none, border-radius `0.375rem`. Hover state shifts background to `#166534`. Active state compresses slightly (`transform: scale(0.99)`).
- **Secondary CTA ("Customize", "Repeat Previous"):** Background `#FFFFFF`, foreground `#1F2937`, border `1px solid #E5E7EB`. Hover state transitions to background `#F9FAFB` and border `#D1D5DB`.

### Dish Display Cards
- Structured inside a `1px solid #E5E7EB` border with a 0.5rem radius.
- Imagery occupies the top segment with an exact 16:10 aspect ratio and subtle internal border overlay to prevent bright food images from bleeding into the white card frame.
- Dish headline uses `headline-sm`, followed by a 2-line clamped description in `body-sm` (`#4B5563`).
- Bottom row features tabular price formatting (`price-md`) in `#111827` paired with an anchored compact addition button.

### Filter & Category Chips
- Inline horizontal scroll track featuring rounded badges (`rounded-md`).
- Passive state: Background `#FFFFFF`, border `1px solid #E5E7EB`, text `#4B5563`.
- Active state: Background `#111827`, border `1px solid #111827`, text `#FFFFFF`. Count indicators inside chips use `#9CA3AF` on inactive and `#9CA3AF` on active.

### Stepper & Quantity Controls
- Compact inline control: Split three-segment container (`-`, count, `+`) enclosed in a `1px solid #E5E7EB` housing with a `#F9FAFB` background.
- Counters display in `label-md` with strict fixed-width numbers to prevent width jumping when cycling between single and double digits.

### Form Inputs & Dietary Toggles
- Inputs: `#FFFFFF` surface with `1px solid #E5E7EB`, padding `0.625rem 0.875rem`, text `body-md` in `#111827`. Focus ring: `2px solid #15803D` with zero offset.
- Checkboxes: `1rem x 1rem` rounded squares (`rounded-xs`), border `1.5px solid #D1D5DB`. Checked state displays `#15803D` fill with crisp white internal check icon.