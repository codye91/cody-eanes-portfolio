# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.3.1] — 2025-05-27

### Fixed
- Favicon now loads correctly — moved to `public/` and declared via `metadata.icons` (Next.js App Router requires the metadata API, not a manual `<link>` tag)
- API routes now surface real error messages instead of a generic "Save failed." fallback — unhandled exceptions from `saveProject`/`deleteProject` now return JSON with the actual error

---

## [1.3.0] — 2025-05-24

### Added
- **Git-backed CMS writes** — content saves now commit changes directly to the GitHub repository via the GitHub Contents API, bypassing Vercel's read-only serverless filesystem
- `lib/github.ts` — standalone GitHub API client (fetches file SHA, commits updated content)
- Automatic Vercel rebuild triggered on every CMS save
- Local filesystem fallback when `GITHUB_TOKEN` is not set (offline dev mode)

### Changed
- `saveProject`, `deleteProject`, `saveProjects`, `saveSiteContent` in `lib/content.ts` are now async
- All four admin API routes updated to `await` the async save functions

---

## [1.2.0] — 2025-05-23

### Added
- **Visual Section Builder** — replaces the raw JSON textarea in the project editor with a collapsible card-based UI for each section; supports add, reorder, and remove
- `components/SectionBuilder.tsx` — field editors per type (string, string[], object[]) with special handling for nested arrays
- `lib/sections.ts` — section registry (`SECTION_REGISTRY`), scaffold defaults (`SECTION_DEFAULTS`), and picker options (`getSectionOptions()`)
- 13 standalone section components in `components/sections/`:
  - `ProjectOverviewSection`, `ProblemCardsSection`, `JourneyStagesSection`, `BigStatSection`
  - `ExecutionGridSection`, `PocketsGridSection`, `BrandsGridSection`, `SwBrandsGridSection`
  - `ContextCardsSection`, `AudienceGridSection`, `ArchGridSection`, `BriefCalloutSection`
  - `FindingsGridSection`, `OutcomesSection`
- `components/sections/shared.tsx` — shared primitives: `bgClass`, `SectionEyebrow`, `SectionHeadline`, `SectionBody`, `InlineLines`

### Changed
- `app/work/[slug]/page.tsx` reduced from ~800 lines to ~110 lines — all inline section renderers removed, replaced by registry dispatch
- `components/ProjectForm.tsx` now uses `SectionBuilder` for the sections field

---

## [1.1.0] — 2025-05-22

### Added
- **Admin CMS** at `/admin` (JWT auth, HttpOnly cookie session)
- `lib/auth.ts` — session creation, validation, and destruction helpers
- `middleware.ts` — protects all `/admin/*` and `/api/admin/*` routes
- Admin project list, project editor, and new project form
- Admin site content editor (homepage, about, contact, footer)
- `AdminSidebar.tsx` — config-driven collapsible sidebar with active state detection
- Content sub-pages: About, My Process, Resume (admin editors)
- Collapsible sub-nav groups in sidebar
- Mobile drawer navigation for admin

---

## [1.0.0] — 2025-05-20

### Added
- Initial portfolio site launch
- Next.js 15 App Router with TypeScript
- Homepage with hero, work grid, ticker, about, and contact sections
- Case study pages (`/work/[slug]`) with `generateStaticParams`
- Case studies: Walgreens, Southwest Airlines, Wegovy
- `FadeUp` scroll-triggered animation component
- Responsive navigation with mobile support
- SEO metadata, Open Graph, and Twitter card tags
- Accessibility improvements
- Vercel deployment configuration
