# CMS — codyeanes.com

A custom, password-protected content management system built into the Next.js App Router.

---

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Create local env file
echo 'ADMIN_PASSWORD=yourpassword' > .env.local

# 3. Run dev server
npm run dev

# 4. Visit the CMS
open http://localhost:3000/admin
```

---

## Architecture

### Content Storage

All content lives in two JSON files:

| File | Purpose |
|------|---------|
| `content/projects.json` | All case studies — order, visibility, cards, heroes, sections, reflections |
| `content/site.json` | Global content — hero, ticker testimonials, about page, contact info |

The `lib/content.ts` module exposes typed read and write functions. **Server components** read directly via `fs.readFileSync`. **API routes** write via `fs.writeFileSync`.

### Authentication

Single-user, password-based auth via JWT:

- Password set in `ADMIN_PASSWORD` environment variable
- On login, a signed JWT is issued and stored in an `httpOnly` cookie (`admin_session`)
- Sessions expire after 7 days
- All `/admin/*` and `/api/admin/*` routes are protected by `middleware.ts`
- The JWT secret *is* the `ADMIN_PASSWORD` — changing the password invalidates all existing sessions

### Image Uploads

Images are stored in `public/images/`. The upload API (`/api/admin/upload`) accepts multipart form data and writes files to `public/images/<folder>/<filename>`.

**Allowed types:** JPEG, PNG, GIF, WebP, SVG
**Max size:** 5 MB

Recommended folder naming:
```
public/images/home/        ← card images
public/images/<slug>/      ← case study images
public/images/about/       ← about page images
```

---

## CMS Routes

| Route | Description |
|-------|-------------|
| `/admin/login` | Login page |
| `/admin/projects` | Projects list with reorder, visibility toggle, delete |
| `/admin/projects/new` | Create new project |
| `/admin/projects/[id]` | Edit existing project |
| `/admin/content` | Edit hero, ticker, about, and contact content |
| `/admin/settings` | Auth and storage info |

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/admin/login` | Authenticate and set session cookie |
| POST | `/api/admin/logout` | Clear session cookie |
| GET | `/api/admin/projects` | List all projects |
| POST | `/api/admin/projects` | Create new project |
| GET | `/api/admin/projects/[id]` | Get project by slug |
| PUT | `/api/admin/projects/[id]` | Update project |
| DELETE | `/api/admin/projects/[id]` | Delete project |
| GET | `/api/admin/content` | Get site content |
| PUT | `/api/admin/content` | Save site content |
| POST | `/api/admin/upload` | Upload image |

---

## Project Sections

Case study pages are composed from a typed array of sections. Each section has a `type` discriminator:

| Type | Description |
|------|-------------|
| `projectOverview` | Intro text + full-width image |
| `problemCards` | 2-column problem definition cards |
| `journeyStages` | Numbered stage grid |
| `bigStat` | Large number + supporting content |
| `executionGrid` | Multi-column list grid |
| `pocketsGrid` | Numbered solution cards |
| `brandsGrid` | Brand breakdown grid |
| `swBrandsGrid` | Sherwin-Williams brand grid variant |
| `contextCards` | 3-column context cards |
| `audienceGrid` | Audience breakdown with big number |
| `archGrid` | Architecture/system grid |
| `briefCallout` | Large blockquote callout |
| `findingsGrid` | Research findings grid |
| `outcomes` | Stats + bulleted outcomes list |

All sections have `background: 'default' | 'surface' | 'surface-alt'` to control the section background color.

The sections array in the project edit form is editable as raw JSON. Full TypeScript types are exported from `lib/content.ts`.

---

## Vercel Deployment — Important Limitation

**Vercel's filesystem is read-only at runtime.** The `fs.writeFileSync` calls in the API routes work fine in local development but will fail silently (or throw) on Vercel.

### Recommended Production Strategy

**Option 1 — Edit locally and redeploy (simplest)**
Use the CMS locally. Changes write to the JSON files. Commit and push to trigger a Vercel redeploy. This is the lowest-complexity option.

**Option 2 — GitHub API writes**
Replace the `saveProjects` / `saveSiteContent` functions in `lib/content.ts` with GitHub API calls using a Personal Access Token. The API routes PUT the JSON files directly to the repo, triggering a Vercel rebuild.

```
GITHUB_TOKEN=ghp_...
GITHUB_REPO=yourusername/codyeanes-portfolio
GITHUB_BRANCH=main
```

**Option 3 — Vercel KV (Redis)**
Store content in Vercel KV instead of JSON files. Replace `readJSON` / `saveProjects` with KV get/set calls. Requires a Vercel KV database add-on.

For a personal portfolio, **Option 1** is recommended — you're rarely making content changes, and the local dev experience is instant.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ADMIN_PASSWORD` | Yes | CMS login password and JWT signing secret |
| `NODE_ENV` | Auto | Set to `production` by Vercel — enables secure cookies |

---

## File Structure

```
app/
  layout.tsx                 ← Root layout (fonts, global CSS)
  page.tsx                   ← Homepage
  about/page.tsx             ← About page
  my-process/page.tsx        ← Process page
  work/[slug]/page.tsx       ← Dynamic case study pages
  admin/
    layout.tsx               ← Admin shell with sidebar
    page.tsx                 ← Redirects to /admin/projects
    login/page.tsx           ← Login form
    projects/
      page.tsx               ← Projects list
      new/page.tsx           ← New project form
      [id]/page.tsx          ← Edit project form
    content/page.tsx         ← Site content editor
    settings/page.tsx        ← Auth & storage info
  api/admin/
    login/route.ts
    logout/route.ts
    projects/route.ts
    projects/[id]/route.ts
    content/route.ts
    upload/route.ts
components/
  Nav.tsx                    ← Public navigation
  Footer.tsx                 ← Footer CTA
  FadeUp.tsx                 ← Scroll animation wrapper
  AdminSidebar.tsx           ← Admin sidebar navigation
  AdminProjectsClient.tsx    ← Interactive projects list
  ProjectForm.tsx            ← New/edit project form
  ContentForm.tsx            ← Site content editor form
content/
  projects.json              ← Case study content
  site.json                  ← Global site content
lib/
  content.ts                 ← Types + read/write utilities
  auth.ts                    ← JWT session management
middleware.ts                ← Admin route protection
public/
  images/                    ← All site images
```
