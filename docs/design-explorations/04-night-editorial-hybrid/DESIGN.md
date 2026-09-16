# Byulmaru — Night Editorial Hybrid

## Approved Figma amendments — 2026-09-16

These user-approved decisions supersede the corresponding original rules below. They describe the Figma target; they do not claim frontend implementation is complete.

### Implementation order and deferred background effect

- Implement the approved FINAL Figma pages first, using the existing React application. Review the running pages before proposing or adding further visual effects. Do not modify Figma for the background effect.
- Deferred direction: one continuous site-wide background behind the scrolling content, combining a slowly flowing silk-like band with sparse, faint star points. Keep the silk concentrated around a broad, softly feathered central band rather than covering the entire canvas uniformly. Use muted purple, minimal twinkling and readable contrast behind copy; no AI-generated imagery.
- This effect is not part of the initial Figma implementation. Choose its renderer and tune density, speed and brightness against the running pages later. Mobile quality limits, reduced-motion fallback and actual GPU performance must be checked before enabling it.
- Implementation starts with the shared header/footer, approved color tokens and responsive content rails, then Home, About Us and Our Work. Email persistence and bulk email delivery remain a separate backend decision; never display a successful reservation without a real submission.

### Approved layout amendments

- FINAL About/Work fidelity correction: desktop About hero/name/introduction headings are 64/32/32px; Work hero is 48px and feature headings/body are 52/19px (body line height 32px). Tablet About hero/closing/name use 24px with 112px avatars; Work headings use 40px. Non-profile tablet sections use content-driven height and 48px vertical padding; member sections retain 64px padding. Mobile brief background tags belong below identity and before the introduction. Restore Hehez's FINAL mobile summary and “건축공학 전공 · 인프라 운영” tags. Preserve approved snap centering, carousel timing and official-account CTA.

- Home/Our Work hero galleries: shorten the initial advance wait from 4s to 2s; retain subsequent 4s reading intervals. Reduce movement, opacity and blur transitions from 650ms to approximately two-thirds (433ms). Preserve shared pause/resume and reduced-motion behavior.

- About Us snap composition: center the content-sized introduction/interview grid row vertically within each snap viewport, with the two columns bottom-aligned. Preserve existing gutters, copy and motion; do not stretch short interviews. Glass-like grouped text panels and gentle floating motion remain deferred until the site background is implemented and reviewed together.

- About Us desktop motion: Hero and the three member sections settle at section boundaries over 1100ms with cubic ease-in-out. Introduction moves 48px vertically over 850ms; interview moves 120px over 1450ms with longer deceleration, reversing direction for upward navigation. Keep content visible on initial entry; release normal scrolling into closing CTA/footer. Retain natural scrolling for tablet/mobile, reduced motion and any profile content taller than the available viewport. Keyboard, pointer, touch, resize and motion-setting changes cancel the movement. No extra decorative effects.

- FINAL font/color mapping correction: map Gothic A1 display text to SUIT and Noto Sans KR body/UI text to Pretendard, preserving SemiBold/Bold/ExtraBold as 600/700/800 instead of a blanket 750. Shared footer statements and Home roster numbers use SUIT. Home roster roles are coral and numbers cyan; About Us Shasha keeps pink roles with coral background tags/disclosure, while Hehez uses lime. Active About Us/Our Work navigation is coral; Home remains lime. Preserve approved layout, type sizes and motion.

- Intro snap pacing: replace browser-defined smooth scrolling with a 1100ms requestAnimationFrame movement using cubic ease-in-out in both directions. Keep the momentum guard through completion; keyboard, pointer, touch, resize, reduced-motion changes and unmount cancel the movement rather than fighting the user.

- Approved intro wheel handling supersedes the earlier no-interception rule only for the first two desktop screens: a vertical wheel/trackpad gesture smoothly moves Hero to Origin or Origin back to the page top. Accumulate 32px-equivalent intent and absorb transition momentum (750ms minimum, ending after 180ms quiet, bounded at 1800ms). A fresh downward gesture on Origin scrolls normally into the rest of the page. Native mandatory snapping is disabled to avoid fighting this controller. Preserve zoom gestures, editable fields, keyboard/touch scrolling, reduced motion, content-fit checks and mobile/tablet fallbacks. Journey retains passive, non-intercepting scroll selection.

- Intro snap correction: independent from Journey's 768px-height requirement, enable native mandatory snapping for the first two scenes on desktop widths from 1280px and heights from 640px only when content fits. Fit the hero carousel window to the viewport while retaining its controls and scroll cue; Origin uses 64px vertical padding and a viewport minimum height. Release snapping as soon as scrolling proceeds past Origin's top so the remaining page remains freely scrollable. Mobile/tablet, reduced-motion and oversized content keep ordinary scrolling.

- First Journey scene entrance refinement: keep text and mockup fully visible without an opacity gate. On the first desktop entry (section top reaches 55% of viewport height), animate only the discovery mockup from 72px right to its resting position over 800ms. Play once; later scene transitions and reverse navigation retain their existing choreography. Reduced-motion and linear-layout fallbacks do not run this entrance.

- Journey motion tuning supersedes the uniform durations below: title moves 110px over 800ms with quick settling; body fades with only 16px vertical movement over 650ms; mockup travels 55vw over 1500ms with a longer deceleration; background art drifts 24px over 1800ms with a 1400ms fade. Only the body has an 80ms entrance delay. Initial scene setup has no transitions; animation is enabled only after the first scene change. Load the first scene's images eagerly and reserve all mockup aspect ratios using intrinsic dimensions, avoiding lazy-loading delay and layout shifts on first entry.

- Motion refinement: both hero post carousels advance every 4 seconds. Home's desktop Journey follows the approved Codrops-inspired scene-transition direction: the first scene is already visible as the section enters. A 400svh sticky sequence switches scenes at one-viewport scroll boundaries; each switch starts a time-based 1.3-second horizontal transition with 0/100/180/240ms offsets for heading, description, mockup and art. Scrolling backward reverses the arrangement; scrolling within a scene does not scrub or restart its transition. Keep natural scrolling (no wheel interception), release the pin before Team, and preserve normal vertical flow on mobile/tablet, reduced motion, insufficient height and overflowing content. No new animation dependency; native CSS transitions own motion, a passive scroll listener selects the scene. Inactive scenes are inert and hidden from assistive technology only while this enhancement is enabled.

- Official account preview refinement: replace the handmade text/post card with a real cropped profile screenshot linking as a whole to `https://kos.moe/@kosmo`. Place the existing KOSMO logo slightly tilted across its lower-right edge without covering profile text. This is a static screenshot, not a live feed; no intermediary server is required.

- Our Work no longer offers email pre-registration. Hero and closing CTAs link to `https://kos.moe/@kosmo` with “코스모 소식 보기”. The closing section previews that KOSMO account, not its X account. Until a supported live embed is available, display an explicitly static profile/introduction-post card with source links; do not imply live updates or collect email.

- Follow-up: apply the same automatic, single lower-right icon play/pause control to Our Work as Home. No previous/next controls or counter on either hero; both share playback and reduced-motion behavior.

- Home hero control refinement: the vertical gallery auto-advances independently of page scrolling. Replace Home's previous/next buttons and counter with one icon-only play/pause button aligned below the gallery at its right edge. Keep a 44px target and accessible action label. Home playback is controlled by this button rather than hover/focus; reduced-motion starts stopped but permits explicit play. Our Work controls are unchanged.

- Home copy and user-edited desktop line breaks are approved. Preserve them during implementation; do not copy desktop hard breaks indiscriminately to mobile. Use `word-break: keep-all` with `overflow-wrap: anywhere` for unbroken URLs or unusually long tokens; allow intentional phrase breaks in headings to vary by breakpoint.
- Across FINAL Home, About Us and Our Work at desktop, tablet and mobile widths, hero and section headlines (including closing CTA headings and the Origin quote) use 130% line height. Preserve existing font sizes, copy and intentional line breaks; let Auto Layout accommodate the height change. This supersedes the tighter display/heading line-height values below.
- Mobile typography refinement: all three FINAL mobile pages use 28px/130% hero titles, 22px/130% section/CTA headings, 18px/140% names and interview questions, 15px/160% body copy, and 13px/150% role/background metadata. Navigation and action labels use 15px/140% with existing accessible targets retained. Email input text stays 16px; embedded product mockup typography stays unchanged. This supersedes preservation of the previous mobile font sizes above; desktop and tablet are unchanged. Apply the same typography to the expanded mobile profile reference states.
- Tablet/mobile copy line breaks are fitted to the current text column and font size: headings group meaningful phrases, while prose wraps at spaces and preserves paragraph boundaries. Figma's measured hard wraps are reference-only; do not reproduce every line as a web `<br>`. Preserve intentional heading phrase breaks selectively and let prose reflow with `word-break: keep-all` at intermediate widths. Copy, typography, gutters and embedded mockup text remain unchanged by this pass.
- Home first-screen Figma targets: 1440×768 desktop (114px header + 654px hero) and 375×812 mobile (72px header + 740px hero), including the scroll cue. The large stacked hero illustration is hidden, not deleted. These are reference viewports, not fixed web heights: preserve readable content and permit scrolling on shorter viewports or increased text sizes.
- Home hero mockups use a vertical carousel, matching Our Work: the centered post is sharp, adjacent posts are dimmed and blurred, and the cards translate vertically rather than sliding sideways or only crossfading. The Figma cycle is 18 seconds, with three approximately 5.35-second reading holds and 0.65-second transitions; spacing accounts for different post heights. Web implementation still needs functional previous/next/pause controls, reduced-motion handling, and focus/hover pause behavior. The Figma control appearance is not proof those interactions are implemented.
- Home desktop scroll choreography: the first hero (including header) and Origin are two viewport-sized introductory scenes with gentle vertical snapping limited to that introduction. Journey Intro scrolls normally. Discovery, Expression and Connection form one pinned viewport: downward scroll advances the three complete scenes horizontally, with readable holds before each transition and reverse motion when scrolling upward. Release the pin before Team; Team, closing CTA and footer scroll normally. Do not intercept wheel/touch or trap keyboard focus. The hero's independently rotating mockups remain vertical, not horizontal. Figma presents equal-height scene layouts and a horizontal storyboard; real scroll linkage remains frontend work.
- Mobile keeps every Home section in normal vertical document flow, without snapping or pinned horizontal transitions. Reduced motion, insufficient viewport height and increased text size also fall back to a readable vertical flow on desktop. Never clip copy or shrink body text merely to fit a viewport; account for any visible sticky header during implementation.
- Desktop Home illustrations reduced during viewport fitting use 520px decorative backgrounds at 50% opacity, following the user's bottom-aligned Origin placement: Origin behind its right-hand explanations; Discovery, Expression and Connection behind their respective copy columns. Anchor the illustrations near the section bottom instead of vertically centering them. Keep text above artwork, retain the 768px reference scene heights and mirror the treatment in the horizontal storyboard. Mobile illustrations are unchanged by this desktop adjustment.
- Header and footer navigation order: **Home → About Us → Our Work**. The current FINAL canvas already uses this page order.
- Responsive reference widths are 375px mobile, 1024px tablet landscape and 1440px desktop. Tablet uses 64px page gutters and readable two-column groups where they fit; long profiles and interviews remain content-height driven. Do not scale the whole desktop page or body typography down. Use the existing header/footer navigation and approved mockup content at every width. For implementation, switch each group to one column when its readable minimum widths plus gap no longer fit; the three Figma widths are reference states, not proof of intermediate-width behavior.
- Every FINAL page uses one shared outer content rail per breakpoint, including header, hero, section headings, body groups, section rules, CTA and footer: desktop 96px (x=96–1344), tablet 64px (x=64–960), mobile 24px (x=24–351), approximately 6–7% of each reference viewport. Full-bleed section wrappers keep zero padding; their inner content container owns the gutter exactly once. Do not retain section-specific gutter overrides. Figma column guides are attached to all nine page frames. Card-internal padding, intentionally smaller buttons, artwork silhouettes and carousel edge previews are not outer content rails.
- Tablet and mobile use normal vertical document scrolling. Reserve the Home snapping/pinned horizontal sequence for wide, sufficiently tall desktop viewports; reduced motion and enlarged text retain the linear reading order. Decorative art must not determine section height or obstruct copy.
- Tablet density refinement: major sections use content-driven height and 48px top/bottom padding (Home hero retains 88px bottom padding for its scroll cue), retaining 64px horizontal gutters. Remove the former 654px/640px Home minimum heights. Home timeline/thread previews are 360px wide with their full aspect ratio retained. About Us retains its original 24px hero/introduction headings and a compact 112px avatar beside name/role before each introduction. Its three member sections are exceptions: use 64px top/bottom padding and top-align introduction/interview columns, retaining alternating two-column profiles and full interviews. The trial 40px hero/28px introduction enlargement and vertically centered profile columns were reverted; improve density through arrangement rather than larger text. Section rules stay at the section bottom. These tablet-only changes do not alter desktop or mobile layouts.
- “소식 받기” and “개발 소식 받기” link to `https://kos.moe/@kosmo`; they are not newsletter signup or pre-registration actions.
- Reuse the approved Home footer on all three pages, using the existing mobile Home footer layout for narrow screens. Keep email, GitHub, and official KOSMO/X contact entries. Remove the redundant standalone email below the About Us closing CTA.
- About Us desktop profiles retain the 720px, two-column layout with the middle profile reversed, but start content 64px from the section top and align both columns to the top. On the web, treat a one-screen section as a minimum-height preference, never clip longer text to force it into one viewport. Mobile profiles continue to use content-driven height.
- About Us mobile profiles start with an 80px avatar beside the name and role, followed by the existing taste/identity line. Then show the introduction heading, summary, background and interview, in that reading order. Keep these groups in Auto Layout; desktop and tablet profile arrangements are unchanged.
- Mobile About Us compact trial: keep the profile and heading visible, use a two-sentence introduction, collect brief background details below the identity, and show the interview question plus an opening excerpt with a 44px-minimum “인터뷰 더 읽기” control. Full original introductions and answers are preserved in the separate expanded-profile Figma board. These are static design states, not a working disclosure; frontend implementation must preserve the full text and provide keyboard-accessible expand/collapse behavior.
- Do not use AI-generated artwork in product mockups. Use the user's approved original drawings without generative alteration.
- All FINAL shared footers use `#191329` (Night Plum), replacing the lighter `#241B30` surface. Retain the existing top hairline, typography and links; do not change the shared surface token used by other components.
- About Us desktop section rules belong to the section bottom edge, not to the text stack. Keep the 64px horizontal inset and anchor the 1px line to the bottom as content or viewport height changes. The closing CTA uses the shared footer's top border instead of a duplicate line. Its buttons use content-driven width and the Home button's 52px minimum height, 24px horizontal padding, 16px/24px label and 8px radius. Actual scroll snapping remains frontend work; account for header height and permit normal scrolling for content taller than the viewport.

- Final Figma cleanup: tablet About Us introduction and interview columns align at their bottom edges (superseding the top-alignment trial), retaining 64px vertical padding. Remove the three tablet avatar outline strokes. Remove layout grids from all nine FINAL page frames while preserving their 96/64/24px content gutters; guides are no longer part of the final presentation.

> Status: approved canonical design system for the Byulmaru team site under PROD-349. This direction combines the strongest parts of Night First and Creator Color Blocks. Dark is the primary brand mode; Light is a complete alternate mode.

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
- The target navigation order is `Home`, `Our Work`, `About Us`.
- This intentionally differs from the current implementation, which shares one navigation collection between the Header and Footer. Frontend implementation must define separate Header and Footer navigation collections so the Footer can preserve its existing order.
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

- Confirm the final Korean copy and `Our Work` pre-registration page content.
- Confirm exact footer copyright, license attribution, and national-project support wording.
- Replace Figma substitute fonts with production SUIT and Pretendard during implementation and recheck Korean line breaks.
- Validate final foreground/background pairs with an automated contrast audit once implementation tokens exist.
