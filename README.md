# Cody Eanes — Portfolio

Personal portfolio and case study site for [codyeanes.com](https://codyeanes.com), built with Next.js 15 App Router and a custom git-backed CMS.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Custom CSS (globals.css) |
| Auth | JWT via `jose`, HttpOnly cookies |
| CMS storage | JSON files in `content/`, written via GitHub API |
| Deployment | Vercel (static + serverless) |
| Fonts | Roboto + DM Sans (Google Fonts) |

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site, [http://localhost:3000/admin](http://localhost:3000/admin) for the CMS.

### Environment Variables

Create a `.env.local` file in the project root (never committed to git):

```
GITHUB_TOKEN=ghp_...
GITHUB_OWNER=codye91
GITHUB_REPO=cody-eanes-portfolio
GITHUB_BRANCH=main
ADMIN_PASSWORD=your-admin-password
```

| Variable | Description |
|---|---|
| `GITHUB_TOKEN` | Fine-grained PAT with Contents read+write on this repo |
| `GITHUB_OWNER` | GitHub username |
| `GITHUB_REPO` | Repository name |
| `GITHUB_BRANCH` | Branch CMS writes target (typically `main`) |
| `ADMIN_PASSWORD` | Password to log into `/admin` |

Without `GITHUB_TOKEN`, content writes fall back to the local filesystem (useful for offline dev).

## Project Structure

```
app/
  layout.tsx            # Root layout, metadata, fonts
  page.tsx              # Homepage
  work/[slug]/          # Case study pages (statically generated)
  about/                # About page
  my-process/           # My Process page
  admin/                # CMS admin (auth-protected)
    login/
    (cms)/
      projects/         # Project list + editor
      content/          # Site content editor
components/
  Nav.tsx
  Footer.tsx
  FadeUp.tsx            # Scroll-triggered fade animation
  ProjectForm.tsx       # Project create/edit form
  SectionBuilder.tsx    # Visual section editor
  AdminSidebar.tsx      # Config-driven collapsible sidebar
  sections/             # 13 standalone section components
    shared.tsx          # Shared helpers (bgClass, SectionEyebrow, etc.)
    ProjectOverviewSection.tsx
    ProblemCardsSection.tsx
    ... (11 more)
lib/
  content.ts            # All types + read/write functions
  sections.ts           # Section registry, defaults, picker options
  auth.ts               # JWT session helpers
  github.ts             # GitHub API write client
content/
  projects.json         # All case study data
  site.json             # Homepage + global content
public/
  favicon.svg
  images/
```

## CMS

The admin is accessible at `/admin` (password-protected). It manages:

- **Projects** — Create, edit, and reorder case studies. Each project is composed of typed sections (Overview, Problem Cards, Outcomes, etc.) built with the visual Section Builder.
- **Site Content** — Homepage hero, ticker, work section copy, about, contact, and footer text.

### How saves work in production

Vercel's serverless filesystem is read-only, so content saves commit changes directly to this repository via the GitHub API. Each save:

1. Fetches the current file SHA from GitHub
2. Commits the updated JSON to `content/` on `GITHUB_BRANCH`
3. Vercel detects the push and triggers a rebuild (~1–2 min)

The "Saved successfully" message confirms the commit went through. The public site updates after the rebuild completes.

### Adding a new section type

1. Add the TypeScript interface to `lib/content.ts` and add it to the `ProjectSection` union
2. Create `components/sections/YourSection.tsx`
3. Register it in `lib/sections.ts` — add to `SECTION_REGISTRY`, `SECTION_DEFAULTS`, and `getSectionOptions()`

## Deployment

The site deploys automatically to Vercel on every push to `main`. No manual steps required.

Required environment variables must be set in the Vercel dashboard under **Project → Settings → Environment Variables**.
