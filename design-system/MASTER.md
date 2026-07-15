# Byulmaru — Midnight Signal

> Status: canonical design system for the Byulmaru team site under DSN-11.
> Generated with `ui-ux-pro-max --design-system --persist`, then reconciled with the approved R1 direction and the repository's actual page structure.

## How to use this system

1. Read this file before changing the team site's Figma design, UI, or frontend.
2. Then read `design-system/pages/[page].md` when it exists. Page rules override this file only where they are explicit.
3. Treat unspecified decoration as off. Add an exception only when the design brief names it and the exception satisfies the guardrails below.

## Direction

Midnight Signal is a dark-only editorial system for a small team building a subculture-focused social product. It combines calm, warm darkness with sharp neon signals and selective narrative illustration. The result should feel authored, modern, and a little kitsch without resembling a generic AI, developer-tool, gaming, or cyberpunk template.

- Dark is the brand environment, not a theme toggle.
- Editorial hierarchy and real content lead; effects support a named story beat.
- Acid, Coral, and Cyan have distinct jobs. They are not a decorative rainbow.
- Rectilinear composition, visible hairlines, and controlled asymmetry take priority over soft card grids.
- Product previews must remain honest abstractions, not fake working interfaces.

## Design dials

| Dial     |  Value | Meaning                                                         |
| -------- | -----: | --------------------------------------------------------------- |
| Variance | `7/10` | Deliberate asymmetry and editorial scale shifts are welcome.    |
| Motion   | `4/10` | Feedback is clear and restrained; no ambient motion by default. |
| Density  | `4/10` | Spacious chapters with compact, information-bearing modules.    |

## Token architecture

Use three layers: primitive values, semantic roles, then component tokens. Components must not reach into primitives directly when a semantic token exists.

### Primitive color

| Token                   | Value     | Role                           |
| ----------------------- | --------- | ------------------------------ |
| `--primitive-ink-950`   | `#15111F` | warm near-black                |
| `--primitive-plum-900`  | `#241B30` | raised dark surface            |
| `--primitive-cream-050` | `#F7F3ED` | primary foreground             |
| `--primitive-mauve-200` | `#C9C0CF` | secondary foreground           |
| `--primitive-plum-700`  | `#40344A` | decorative hairline            |
| `--primitive-mauve-500` | `#7A6D84` | interactive boundary           |
| `--primitive-acid-400`  | `#DDF95B` | action signal                  |
| `--primitive-coral-400` | `#FF6F61` | people and editorial signal    |
| `--primitive-cyan-400`  | `#63D8FF` | product and information signal |

### Semantic color

| Token                        | Maps to                 | Use                                      |
| ---------------------------- | ----------------------- | ---------------------------------------- |
| `--color-canvas`             | `--primitive-ink-950`   | global page background                   |
| `--color-surface`            | `--primitive-plum-900`  | grouped content and controls             |
| `--color-text-primary`       | `--primitive-cream-050` | headings and essential text              |
| `--color-text-secondary`     | `--primitive-mauve-200` | body and supporting copy                 |
| `--color-border-decorative`  | `--primitive-plum-700`  | non-interactive dividers only            |
| `--color-border-interactive` | `--primitive-mauve-500` | idle control boundaries                  |
| `--color-action`             | `--primitive-acid-400`  | primary CTA and positive action          |
| `--color-people`             | `--primitive-coral-400` | members, culture, editorial emphasis     |
| `--color-product`            | `--primitive-cyan-400`  | product, information, and focus          |
| `--color-focus`              | `--primitive-cyan-400`  | keyboard focus indicator                 |
| `--color-on-signal`          | `--primitive-ink-950`   | text/icons on Acid, Coral, or Cyan fills |

### Contrast contract

Validated against `#15111F` unless noted.

| Pair                |     Ratio | Allowed use                               |
| ------------------- | --------: | ----------------------------------------- |
| Cream / Canvas      | `16.78:1` | all text                                  |
| Mauve 200 / Canvas  | `10.54:1` | all text                                  |
| Acid / Canvas       | `15.71:1` | actions and concise labels                |
| Ink / Acid          | `15.71:1` | primary button content                    |
| Coral / Canvas      |  `6.80:1` | text and graphic emphasis                 |
| Cyan / Canvas       | `11.31:1` | text, focus, and information              |
| Plum 700 / Canvas   |  `1.60:1` | decorative hairlines only                 |
| Mauve 500 / Canvas  |  `3.84:1` | interactive boundaries and large graphics |
| Mauve 500 / Surface |  `3.41:1` | interactive boundaries and large graphics |

Never use `--color-border-decorative` to communicate a control boundary or state.

## Typography

### Families

- Display and headings: `SUIT Variable`, `SUIT`, sans-serif
- Body, navigation, labels, controls, and metadata: `Pretendard Variable`, `Pretendard`, sans-serif
- Do not add a decorative, monospace, sci-fi, or code-editor typeface to the visual language.
- Numeric tables may use `font-variant-numeric: tabular-nums`; this is not permission to introduce monospace typography.

### Scale

| Token                    | Size / weight                      | Line height | Tracking   | Use                         |
| ------------------------ | ---------------------------------- | ----------- | ---------- | --------------------------- |
| `--type-display-hero`    | `clamp(48px, 7vw, 88px) / 760–780` | `0.98`      | `-0.045em` | Home hero only              |
| `--type-display-section` | `clamp(40px, 5vw, 64px) / 720`     | `1.02`      | `-0.035em` | major chapter               |
| `--type-heading-xl`      | `clamp(32px, 4vw, 48px) / 700`     | `1.10`      | `-0.028em` | page or feature heading     |
| `--type-heading-lg`      | `32px / 700`                       | `1.18`      | `-0.022em` | group heading               |
| `--type-heading-md`      | `24px / 680`                       | `1.28`      | `-0.016em` | module heading              |
| `--type-body-lg`         | `18px / 400`                       | `1.70`      | `-0.008em` | lead copy                   |
| `--type-body-md`         | `17px / 400`                       | `1.70`      | `-0.006em` | default body                |
| `--type-body-sm`         | `15px / 400`                       | `1.62`      | `0`        | supporting copy             |
| `--type-label`           | `14px / 600`                       | `1.40`      | `0.04em`   | navigation, eyebrow, button |
| `--type-caption`         | `13px / 500`                       | `1.50`      | `0`        | metadata                    |

- Keep Korean line breaks semantic; do not create an orphaned particle or one-character final line.
- Body measure is `42–68ch`. Hero measure is `8–12` Korean characters per intentional line where the copy permits it.
- Uppercase is for short Latin eyebrows only, never Korean body copy.

## Space, layout, and shape

Use an 8px base rhythm with 4px only for optical correction.

| Token        |   Value | Use                      |
| ------------ | ------: | ------------------------ |
| `--space-1`  |   `4px` | optical adjustment       |
| `--space-2`  |   `8px` | tight inline gap         |
| `--space-3`  |  `12px` | control internals        |
| `--space-4`  |  `16px` | compact group            |
| `--space-6`  |  `24px` | card/module padding      |
| `--space-8`  |  `32px` | content group            |
| `--space-12` |  `48px` | chapter group            |
| `--space-16` |  `64px` | desktop gutter           |
| `--space-24` |  `96px` | section padding          |
| `--space-32` | `128px` | large chapter separation |

- Maximum content width: `1152px`; wide scene width: `1440px`.
- Desktop gutters: `64px`; tablet: `32px`; mobile: `20px`.
- Default section block padding: `96–128px`; mobile: `64–80px`.
- Prefer editorial split layouts, ruled lists, and content-led modules over repeated equal-card grids.
- Radius tokens: control `8px`, module `12px`, feature `16px`. Pill shapes are reserved for true tags, statuses, and compact filters.
- Borders are usually `1px`; use `2px` only for focus or selected emphasis.

## Component tokens and behavior

### Header

- Preserve the current team logo artwork. Production assets: `app/assets/logo-black-full.svg` and `app/assets/logo-white-korean.svg`.
- Navigation order: `Home`, `Our Work`, `About Us`.
- Keep the header structurally quiet so the current chapter remains dominant.
- A translucent or floating header requires an explicit page brief and must remain readable without backdrop blur.

### Primary button

- Fill: `--color-action`; content: `--color-on-signal`; minimum height: `44px`; radius: `8px`.
- Use one dominant primary action per chapter.
- Hover may translate by at most `-1px`; pressed returns to baseline. Never rely on opacity alone.

### Secondary button

- Transparent fill, `--color-border-interactive` boundary, primary text.
- Hover boundary may switch to the page's assigned signal color.
- Focus uses a `2px` Cyan ring with at least `2px` offset.

### Content module

- Surface and border are optional; grouping must be justified by information architecture.
- Static content must not receive pointer cursor, hover lift, or shadow.
- Interactive modules expose a clear label, target size, keyboard state, and selected/expanded state when applicable.

### Section label

- Pretendard label style with a short ruled marker or one signal-color glyph.
- Use once per chapter at most. It is not a badge to repeat on every card.

### Footer

- Preserve a full-width top hairline, Korean team logo and current information architecture.
- Keep unconfirmed copyright, license, or government-support claims as placeholders until exact wording and links are approved.

## Effects and art direction

### Default effect language

- Use crisp hairlines, print-like texture, hard-edged crops, and sparse signal-color highlights.
- Texture opacity stays subtle and must not reduce text contrast. Prefer one reusable noise asset or CSS mask over generated particle fields.
- Shadows are rare. Use separation through value and boundary first; if needed, use one compact shadow rather than diffuse colored glow.
- Do not apply a site-wide galaxy, star, grain, glow, or vignette layer.

### Narrative scene exception

Only a page-specific rule may opt into a narrative scene. A valid scene combines background texture, a central authored illustration, real UI or editorial fragments, and copy into one composed story beat. It must not collapse into a generic night sky, random star field, wallpaper, or decorative hero backdrop.

### Motion

- Feedback duration: `150–220ms`; content transition: `220–300ms`.
- Default easing: `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Animate `transform` and `opacity`; avoid layout-driven animation.
- No global scroll reveal. Elements are visible without JavaScript.
- `prefers-reduced-motion: reduce` removes non-essential motion and preserves every state change immediately.

## AI-slop guardrails

### Default-off patterns

The following are prohibited unless the user or page brief explicitly requests them. An explicit request allows evaluation, not automatic use.

- Glass cards or floating panels that do not carry real content or narrative context.
- Filler 3D spheres, fluid blobs, abstract rings, or hovering geometric objects.
- A gradient that mixes multiple signal colors inside one element.
- Decorative glow, particles, parallax, or ambient loops without a named story or interaction purpose.
- Repeated bento grids, oversized radii, excessive pill controls, or identical card trios used as a default layout.
- Global scroll-reveal choreography or effects added merely to make the page feel dynamic.

When one is explicitly requested, it must:

1. connect to the page narrative or information architecture;
2. use the defined tokens and remain limited to a named section;
3. preserve contrast, keyboard access, responsive behavior, and reduced-motion behavior;
4. avoid copying proprietary layouts or illustrations;
5. be removed if the same goal works with typography, composition, or real content alone.

### Always prohibited

- Low-contrast text, color-only states, hidden focus, blocked zoom, or blocked keyboard navigation.
- Fake controls or product panels that imply unsupported functionality.
- Copying proprietary Sentry, Clay, Figma, or other product UI and illustration assets.
- Altering the official team logo to fit a trend.
- Emoji used as structural interface icons.
- Effects that obscure content, create continuous distraction, or ignore reduced-motion preferences.

## Responsive and accessibility contract

- Verify at `375px`, `768px`, `1024px`, and `1440px`.
- Touch targets are at least `44×44px`; focus indicators meet 3:1 against adjacent colors.
- No essential content may depend on hover, motion, color, texture, or illustration.
- Narrative illustrations require useful alt text when informative and empty alt text when decorative.
- Reflow scenes into a readable linear order on small screens; do not shrink a desktop collage until text becomes illegible.
- Maintain body text contrast of at least `4.5:1` and large text/non-text UI contrast of at least `3:1`.

## Delivery checklist

- [ ] Read this file and the target page override.
- [ ] Use SUIT Variable and Pretendard Variable only.
- [ ] Map colors through semantic tokens.
- [ ] Validate every new foreground/background pair.
- [ ] Confirm default-off effects have an explicit brief and a named purpose.
- [ ] Distinguish interactive modules from static content without hover-only cues.
- [ ] Verify keyboard, focus, reduced motion, zoom, and responsive reflow.
- [ ] Check Korean line breaks and content measure.
- [ ] Preserve official logos and avoid proprietary reference copying.

## Open decisions

- Final Korean marketing copy and the Our Work pre-registration information architecture.
- Exact footer copyright, license, and supported-project wording.
- Final authored illustration assets for the Home narrative scene.
- Whether a future light mode is needed; it is outside the current dark-only system.
