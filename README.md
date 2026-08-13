# Silvia Castillo Angulo — Portfolio

Implementation of the `Desktop - 3` frame from the *Babe-portfolioo* Figma file.

## Run it

```bash
npm install
npm run dev
```

## Before it goes live: swap the images

Every image currently points at a **temporary Figma export URL that expires about
7 days after it was generated**. Nothing else in the project references an asset
path — `src/data/assets.ts` is the single swap point.

1. In Figma, export each node listed in `FIGMA_NODES` (SVG for the wordmark,
   PNG or WebP at 2x for the photographs).
2. Save them into `public/images/` using the filenames in `LOCAL_PATHS`.
3. Set `USE_LOCAL_ASSETS = true`.

Also drop a 1200x630 social preview at `public/images/og-cover.jpg` — it's
referenced by the Open Graph tag in `index.html`.

## Project content

All copy in `src/data/projects.ts` is taken verbatim from the five detail frames
in Figma (`7:23`, `2:17`, `2:35`, `2:756`, `2:787`). Nothing is invented. Each
record notes its source frame in `figmaNode`.

**One thing needs the designer's attention:** the description on the Cetaphil
frame (`2:756`) is a duplicate of the poster project's text and does not
describe the Cetaphil work. It is carried over as-is with a comment marking it,
rather than being rewritten here.

A grid tile can be in one of three states, set in `homeGrid`:

| Entry | Behaviour |
|---|---|
| `{ kind: 'project', slug }` | Links to `/work/<slug>` |
| `{ kind: 'image', href }` | Opens an external site in a new tab |
| `{ kind: 'image' }` | Plain image, not interactive |

The SILVI building wrap has no detail frame and no external link, so it is a
plain image. The A-List Festival tile links to the campaign site. To promote
either into a full project, add a detail frame in Figma, add the record to
`projects`, and switch its entry to `{ kind: 'project', slug: '...' }`.

**Nature-Inspired Poster** (`2:35`) has no image of its own on the home frame,
so its tile uses the same four-poster artwork as its detail hero, placed in the
empty band the frame leaves after the last image (`wideC`). A distinct
photograph for the grid would be better than repeating the hero.

## Deploying

The app uses real URLs (`/work/metasphere`), so the host must serve
`index.html` for unknown paths or a direct link will 404. Config for the two
common hosts is included: `public/_redirects` (Netlify) and `vercel.json`
(Vercel). For Apache or nginx, add the equivalent fallback rule.

Note that this is a client-rendered app: crawlers that do not run JavaScript
see only the shell. If organic search matters, prerender the routes at build
time (`vite-plugin-ssg` or similar) — the data is all static, so it is a
straightforward addition.

## Structure

```
src/
├── components/
│   ├── Navbar.tsx          sticky 60px nav, active-section underline
│   ├── Hero.tsx            SILVI wordmark + tagline
│   ├── WorkGrid.tsx        project pair + optional wide plate
│   ├── ProjectCard.tsx     grid image that links to its project
│   ├── ProjectInfoBand.tsx the two grey cards: disciplines | description
│   ├── ProjectMedia.tsx    pair / full / quad image blocks
│   ├── About.tsx           statement + education footnote
│   ├── Contact.tsx         black rounded contact block
│   └── ui/
│       ├── Container.tsx   1200px frame, 48px gutters
│       ├── Reveal.tsx      scroll reveal, reduced-motion aware
│       └── WorkImage.tsx   aspect-ratio box + crop + hover
├── pages/
│   ├── Home.tsx            the Desktop - 3 frame
│   ├── ProjectDetail.tsx   /work/:slug, built from the 01-04 detail frames
│   └── NotFound.tsx
├── hooks/
│   ├── useScrollBehaviour.ts  all scroll positioning, one place
│   ├── useActiveSection.ts    which section the nav should underline
│   └── useDocumentTitle.ts    per-route tab title
└── data/
    ├── assets.ts           asset registry (the swap point)
    ├── projects.ts         project records + home grid order
    └── content.ts          nav, hero, about and contact copy
```

## Responsive behaviour

Breakpoints are Tailwind defaults: `sm` 640, `md` 768, `lg` 1024.

- **Navigation.** Below `md` the inline links are replaced by a full-screen
  panel: body scroll locks while it is open, Escape closes it and returns focus
  to the toggle, Tab is trapped inside it, and any navigation closes it. The
  panel is a *sibling* of the header, not a child — `backdrop-blur` creates a
  containing block, so a fixed element nested inside the header would position
  against the header rather than the viewport.
- **Grid.** Pairs stack to one column below `md`. The 8px horizontal gap from
  the frame is kept; vertical spacing opens to 32px so two stacked projects do
  not read as one.
- **Images.** Every image is sized by `aspect-ratio`, so crops hold at every
  width without media queries.
- **Type.** Headlines use `clamp()` with a `vw` middle term. The hero tagline's
  281px cap and the education column's right alignment only apply from `lg` and
  `md` respectively — both produce bad rags on a phone.
- **Overflow.** The contact email is one 30-character token and was pushing the
  black panel past the viewport; it now breaks mid-word, and a base rule allows
  wrapping in text elements generally.
- **Touch targets.** Interactive controls that were smaller than 44px — the menu
  toggle, the back link, prev/next — meet that minimum.

## How the scroll works

Anchor scrolling is handled in `useScrollBehaviour`, not by the browser:

- The sticky navbar is 60px tall, so a target aligned to the top of the viewport
  lands underneath it. `[id] { scroll-margin-top: 76px }` in `index.css` offsets
  every target, and `scrollIntoView` respects it.
- Nav links point at `/#about` rather than `#about`, so they work from a project
  page too. The scroll runs in a `requestAnimationFrame` after the home route
  has painted, because the element does not exist at click time.
- Routes without a hash reset to the top, which is what you want when opening a
  project.
- `prefers-reduced-motion` switches smooth scrolling off.

## Notes on the translation from Figma

- The frame is absolutely positioned with no auto-layout. Positions became flow
  layout; the fixed image heights became `aspect-ratio` so crops hold at every
  width.
- Figma's crop offsets (`h-[150.47%] top-[-22.36%]` and friends) were converted
  to `object-position` percentages, stored per image in `content.ts`.
- The frame leaves ~1412px of empty canvas between the last image and the
  contact block. `ReservedSlot` renders 160px instead; raise `HEIGHT_PX` to 1412
  to match the frame exactly.
- Gutters in the frame vary between 45px and 50px. Standardised to 48px.
- Gaps inside the image pairs are 8px and 10px in the frame. Standardised to 8px.

## The detail-page template

The four detail frames share one structure, which is why they are one component
driven by data rather than four pages:

| Band | Source |
|---|---|
| Nav | 32px "Work" replaces the three inline links |
| Title | 48px, project name bold + optional qualifier in regular |
| Hero | Wide plate, ratio varies per project |
| Info band | Two columns at a 373 / 767 split: disciplines + effort, description |
| Media | One or more blocks: two-up, full width, or a 2x2 of brochure spreads |
| Footer | The same black contact block used on the landing page |

Three things depart from the frames, all on request:

- **Colour.** The frames set detail-page text and the footer panel in `#ff2e31`.
  Text now runs black and the footer matches the landing page.
- **Info band fills.** The frames put both columns on filled `#ededed` cards.
  Those panels are removed; the columns sit on the page with a hairline rule
  above them instead.
- **Description weight.** Semibold in the frames, regular here, with the
  discipline list dropped from bold to medium to match.

Not every frame fills every field: the typography project has no time figure and
no second title line, so `effort` and `titleTrail` are optional and their markup
is skipped when absent.

## Deliberate additions beyond the frames

- **Grid captions.** The frame shows images with no labels. A 12px caption line
  was added under each so a visitor can tell what a piece is; it uses the same
  size and weight as the education note so it reads as a footnote.
- **The empty band.** The home frame leaves ~1412px of blank canvas after the
  last image. It holds the Nature-Inspired Poster tile rather than dead space.
- **Active-section underline** in the navbar.
- **Previous / next** navigation at the foot of each project. The frames have no
  route onward from a detail page except the "Work" label in the nav.
