# Byulmaru — Night Editorial Hybrid

> Status: decision candidate for PROD-349. This direction combines the strongest parts of Night First and Creator Color Blocks. Dark is the primary brand mode; Light is a complete alternate mode. The team must still approve this candidate before it becomes the production design system.

## Direction

Night Editorial Hybrid keeps the immersive, product-first hero of Night First and combines it with the three equal, color-outlined value cards of Creator Color Blocks. The result is a company site for a subculture-focused SNS team: expressive enough to feel culturally specific, restrained enough to introduce the team and one product clearly.

1. Dark is the default brand experience, not an optional decorative theme.
2. Light uses the same semantic system and shared components rather than a separately maintained design.
3. Lime, pink, and lavender identify hierarchy and card boundaries; they do not compete as large simultaneous fills.
4. Product storytelling leads the page, while values and team context explain why the product exists.
5. The current team logos and footer information architecture remain recognizable through the refactor.

## Foundations

### Brand primitives

| Token                        | Value     | Use                                   |
| ---------------------------- | --------- | ------------------------------------- |
| `color/primitive/night-plum` | `#191329` | Primary brand canvas and fixed footer |
| `color/primitive/lime`       | `#C8F05A` | Primary action and connection accent  |
| `color/primitive/pink`       | `#F47DAA` | Creator and team accent               |
| `color/primitive/lavender`   | `#8974C7` | Product surface and secondary accent  |
| `color/primitive/off-white`  | `#FFFDFC` | Logo field and warm light surface     |

### Semantic color modes

| Token                   | Dark · Primary | Light · Alternate | Use                              |
| ----------------------- | -------------- | ----------------- | -------------------------------- |
| `color/canvas`          | `#191329`      | `#F8F7FC`         | Page canvas                      |
| `color/surface`         | `#241A3A`      | `#FFFDFC`         | Default chapter and card surface |
| `color/surface-strong`  | `#302449`      | `#F0ECF6`         | Raised or emphasized surface     |
| `color/canvas-inverse`  | `#FFFDFC`      | `#191329`         | Intentional inversion            |
| `color/text-primary`    | `#FFFFFF`      | `#211A31`         | Heading and high-emphasis text   |
| `color/text-secondary`  | `#CDC6DA`      | `#514A61`         | Body copy                        |
| `color/text-muted`      | `#9F96B0`      | `#777080`         | Supporting labels and metadata   |
| `color/text-inverse`    | `#211A31`      | `#FFFFFF`         | Text on inverted/action surfaces |
| `color/brand-primary`   | `#C8F05A`      | `#C8F05A`         | Primary action and section cue   |
| `color/accent-pink`     | `#F47DAA`      | `#F47DAA`         | Creator/team accent              |
| `color/accent-lavender` | `#8974C7`      | `#8974C7`         | Product/secondary accent         |
| `color/border`          | `#41355B`      | `#DDD6E5`         | Neutral hairline                 |
| `color/border-lime`     | `#C8F05A`      | `#9FCA35`         | First value-card outline         |
| `color/border-pink`     | `#F47DAA`      | `#E45D91`         | Second value-card outline        |
| `color/border-lavender` | `#8974C7`      | `#745DB6`         | Third value-card outline         |

The footer is an intentional exception to page-mode inheritance: it stays Night Plum in both modes and explicitly uses the Dark semantic mode for its text and hairline.

### Spacing and radius

| Token               |  Value | Use                              |
| ------------------- | -----: | -------------------------------- |
| `space/card`        | `24px` | Card internal spacing            |
| `space/container-x` | `64px` | Desktop page gutters             |
| `space/section`     | `96px` | Major chapter padding/separation |
| `radius/button`     |  `8px` | Buttons and compact controls     |
| `radius/container`  | `12px` | Console and grouped surfaces     |
| `radius/card`       | `16px` | Value, product, and team cards   |

Use an 8px base rhythm. A desktop section spans 1280px with a 1152px content region and 64px side gutters.

## Typography

### Production direction

- Display and heading: `SUIT Variable`
- Body, UI, navigation, label, and metadata: `Pretendard Variable`
- Use a single sans-serif visual language; do not introduce a decorative or monospace face.

### Figma comparison substitute

Figma uses `Gothic A1 ExtraBold/Bold` for display and heading and `Noto Sans KR Regular/Medium` for body and UI. This is a comparison-only substitution caused by font availability. It does not replace the production direction above.

| Token        | Size / weight | Line height | Letter spacing | Use                             |
| ------------ | ------------- | ----------- | -------------- | ------------------------------- |
| `display-xl` | `72px / 700`  | `105%`      | `-4%`          | Home hero                       |
| `display-lg` | `56px / 700`  | `110%`      | `-3.5%`        | Featured chapter                |
| `heading-xl` | `44px / 700`  | `115%`      | `-3%`          | Major section heading           |
| `heading-lg` | `32px / 700`  | `120%`      | `-2.5%`        | Group heading                   |
| `heading-md` | `24px / 700`  | `130%`      | `-2%`          | Card heading                    |
| `body-lg`    | `20px / 400`  | `165%`      | `-1%`          | Introductory copy               |
| `body-md`    | `17px / 400`  | `165%`      | `-0.5%`        | Default body                    |
| `body-sm`    | `15px / 400`  | `160%`      | `0`            | Supporting copy                 |
| `label-md`   | `14px / 500`  | `140%`      | `4%`           | Eyebrow, navigation, and button |
| `caption`    | `13px / 500`  | `150%`      | `0`            | Metadata                        |

## Layout

- Desktop Home width: `1280px`
- Content width: `1152px`
- Side gutters: `64px`
- Major section padding: `96px`
- Dark and Light Home frames use the same seven-section order and component structure.
- All related content uses Auto Layout; horizontal chapters use fixed width with vertical HUG sizing.
- The hero is centered and product-led. Product and team chapters use two-column editorial layouts.
- Values use three equal cards with lime, pink, and lavender outlines.

## Header

- Header shape and spacing may evolve, but the logo artwork must remain the current team-site logo.
- Figma uses an exact clone of the original `혼용＿로고 1` node inside an Off White logo field.
- Production source: `src/lib/assets/logo-black-full.svg`.
- Navigation order stays `Home`, `Our Work`, `About Us`.
- Dark and Light modes share the same header structure.

## Footer

The footer structure is fixed even if spacing and typography receive minor implementation refinements.

1. A full-width top hairline separates the footer.
2. The left region contains the current Korean team logo and the existing menu order: `About Team`, `About us`, `Our Work`.
3. The right region is reserved for project metadata.
4. The footer stays Night Plum in both Dark and Light page modes.

Figma uses an exact clone of the original `한글＿로고 1` node. Production source: `src/lib/assets/logo-white-korean.svg`.

The right region currently contains purpose labels only:

- `Copyright information`
- `License notices`
- `Supported project acknowledgement`

These labels are not final legal or funding claims. Replace them only after the exact required wording and links are confirmed.

## Components

### Primary Button

- Lime fill with Night Plum text.
- Minimum interactive height is 44px; the comparison component renders at approximately 48px.
- Use one dominant primary action per chapter.

### Secondary Button

- Transparent fill with a lavender outline.
- Text follows `color/text-primary` in both modes.
- Do not add glow or soft shadow.

### Value Card

- Equal width, 16px radius, 24px internal padding.
- Surface follows the active mode.
- Use exactly one outline token per card: lime, pink, or lavender.
- Accent color supplements the written card title; it is never the only differentiator.

### Product Preview Card

- Raised console-like surface with three discovery tiles for works, characters, and creators.
- It is a product-story abstraction, not a claim about final SNS UI.
- Pink, lime, and lavender tiles express content variety without introducing a rainbow gradient.

### Team Preview Card

- Three equal modules represent planning, design, and development.
- Member imagery can replace the abstract markers later, while module scale and information density remain equal.

### Section Label

- Compact lime dot plus uppercase label.
- Use as a chapter cue, not as a decorative badge on every card.

## Home composition

1. Header: exact current logo, three-item navigation.
2. Hero: centered headline, concise team proposition, two actions, product console.
3. Values: section proposition and three equal outlined cards.
4. Product: one-product message beside the product preview.
5. Team: three-discipline preview beside the team message.
6. CTA: centered follow-up message and one primary action.
7. Footer: fixed left logo/menu structure plus reserved right metadata region.

`Our Work` will become the landing or pre-registration page for the team's single SNS product. The comparison Home intentionally previews the product without defining that future page's final information architecture.

## Accessibility

- Body and interactive text must meet WCAG AA contrast in both modes.
- Interactive targets are at least 44px high.
- Lime is not used for long body copy.
- Muted text is not used for essential instructions.
- Accent outlines are paired with text labels, so color is never the sole carrier of meaning.
- Korean headings keep conservative line breaks; body copy uses generous line height.
- The fixed dark footer uses Dark semantic text tokens in both page modes.

## Do / Don't

### Do

- Let the dark canvas create calm space around bright accents.
- Use Light as a fully supported alternate mode with shared variables and components.
- Keep product, values, and team storytelling in a clear linear order.
- Preserve the current logo artwork and footer information architecture.

### Don't

- Turn the product preview into a terminal, monitoring dashboard, or code-editor motif.
- Fill every section with all three accent colors.
- Maintain separate Dark and Light component copies.
- Invent copyright, license, or government-support wording before it is confirmed.
- Copy proprietary Clay, Sentry, or other reference-product artwork and layouts.

## Figma mapping

- File: [팀 페이지 디자인 파일](https://www.figma.com/design/iy5xJpWFnRg4AxtSYeV17D/?node-id=22-529)
- Comparison overview: [Comparison Overview](https://www.figma.com/design/iy5xJpWFnRg4AxtSYeV17D/?node-id=25-529)
- Top-level wrapper: [04 — Night Editorial Hybrid](https://www.figma.com/design/iy5xJpWFnRg4AxtSYeV17D/?node-id=42-625)
- Foundation board: [04 / Design System Board](https://www.figma.com/design/iy5xJpWFnRg4AxtSYeV17D/?node-id=42-630)
- Dark Home: [04 / Home / Dark — Primary](https://www.figma.com/design/iy5xJpWFnRg4AxtSYeV17D/?node-id=45-625)
- Light Home: [04 / Home / Light — Alternate](https://www.figma.com/design/iy5xJpWFnRg4AxtSYeV17D/?node-id=47-664)
- Variable collection: `Byulmaru / 04 Night Editorial Hybrid`
- Text style prefix: `04 Night Editorial Hybrid/`
- Component prefix: `04 Night Editorial Hybrid/`

The Figma file contains 26 variables in Dark and Light modes, 10 text styles, and these six shared components:

- `04 Night Editorial Hybrid/Button/Primary`
- `04 Night Editorial Hybrid/Button/Secondary`
- `04 Night Editorial Hybrid/Card/Value`
- `04 Night Editorial Hybrid/Card/Product Preview`
- `04 Night Editorial Hybrid/Card/Team Preview`
- `04 Night Editorial Hybrid/Section Label`

## Verified comparison state

- [x] Original page and backup remain at four top-level sections each.
- [x] Candidates 01–03 remain in place and Candidate 04 is added to their right.
- [x] Comparison overview contains the fourth decision summary.
- [x] Dark and Light Home frames are exactly 1280px wide.
- [x] Both Home frames contain seven ordered sections and are 3320px high.
- [x] Direct Home sections have zero overlap.
- [x] Header and footer use exact clones of the current Figma logo artwork.
- [x] Footer structure and menu order are preserved in both modes.
- [x] Light mode footer is explicitly locked to Dark semantic tokens for contrast.
- [x] The foundation board renders without clipped labels or section overlap.

## Open decisions before production

- Confirm whether this fourth candidate becomes the team-site design system.
- Confirm the final Korean copy and `Our Work` pre-registration page content.
- Confirm exact footer copyright, license attribution, and national-project support wording.
- Replace Figma substitute fonts with production SUIT and Pretendard during implementation and recheck Korean line breaks.
- Validate final foreground/background pairs with an automated contrast audit once implementation tokens exist.
