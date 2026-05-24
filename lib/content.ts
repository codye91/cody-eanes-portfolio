import fs from 'fs'
import path from 'path'

const CONTENT_DIR = path.join(process.cwd(), 'content')

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CardMetric {
  value: string
  label: string
}

export interface ProjectCard {
  role: string
  brand: string
  title: string
  description: string
  metrics: CardMetric[]
  image: string
  imageAlt: string
}

export interface HeroMeta {
  label: string
  value: string
}

export interface ProjectHero {
  title: string
  subtitle: string
  meta: HeroMeta[]
}

export interface SectionBase {
  type: string
  background: 'default' | 'surface' | 'surface-alt'
  eyebrow?: string | null
  heading?: string | null
}

export interface ProjectOverviewSection extends SectionBase {
  type: 'projectOverview'
  paragraphs: string[]
  image: string
  imageAlt: string
}

export interface ProblemCard {
  label: string
  title: string
  body: string
}

export interface ProblemCardsSection extends SectionBase {
  type: 'problemCards'
  cards: ProblemCard[]
}

export interface JourneyStage {
  number: string
  title: string
  subtitle: string
}

export interface JourneyStagesSection extends SectionBase {
  type: 'journeyStages'
  body: string
  stages: JourneyStage[]
}

export interface StatDetail {
  heading: string
  body: string
  toolTags?: string[]
}

export interface BigStatSection extends SectionBase {
  type: 'bigStat'
  number: string
  numberStrong: string
  numberSub: string
  bodyTexts: string[]
  pullquote: string
  details: StatDetail[]
}

export interface ExecutionColumn {
  title: string
  items: string[]
}

export interface ExecutionGridSection extends SectionBase {
  type: 'executionGrid'
  bodyTexts?: string[]
  columns: ExecutionColumn[]
}

export interface Pocket {
  number: string
  title: string
  problem: string | null
  solution: string
  impact: string
}

export interface PocketsGridSection extends SectionBase {
  type: 'pocketsGrid'
  body: string
  pockets: Pocket[]
}

export interface Brand {
  number: string
  name: string
  audience: string
  description: string
}

export interface BrandsGridSection extends SectionBase {
  type: 'brandsGrid'
  body: string
  brands: Brand[]
}

export interface SwBrandsGridSection extends SectionBase {
  type: 'swBrandsGrid'
  body: string
  brands: Brand[]
}

export interface ContextCard {
  label: string
  title: string
  body: string
}

export interface ContextCardsSection extends SectionBase {
  type: 'contextCards'
  body: string
  cards: ContextCard[]
}

export interface AudienceItem {
  number: string
  title: string
  note: string
}

export interface AudienceGridSection extends SectionBase {
  type: 'audienceGrid'
  bigNumber: string
  bigNumberStrong: string
  bigNumberSub: string
  body: string
  audiences: AudienceItem[]
  pullquote: string
  details: StatDetail[]
}

export interface ArchItem {
  number: string
  title: string
  body: string
  impact: string
}

export interface ArchGridSection extends SectionBase {
  type: 'archGrid'
  body: string
  items: ArchItem[]
}

export interface BriefCalloutSection extends SectionBase {
  type: 'briefCallout'
  quote: string
  source: string
  bodyTexts: string[]
}

export interface FindingItem {
  title: string
  items: string[]
}

export interface FindingsGridSection extends SectionBase {
  type: 'findingsGrid'
  body: string
  findings: FindingItem[]
}

export interface OutcomeStat {
  value: string
  label: string
}

export interface OutcomesSection extends SectionBase {
  type: 'outcomes'
  stats: OutcomeStat[]
  list: string[]
}

export type ProjectSection =
  | ProjectOverviewSection
  | ProblemCardsSection
  | JourneyStagesSection
  | BigStatSection
  | ExecutionGridSection
  | PocketsGridSection
  | BrandsGridSection
  | SwBrandsGridSection
  | ContextCardsSection
  | AudienceGridSection
  | ArchGridSection
  | BriefCalloutSection
  | FindingsGridSection
  | OutcomesSection

export interface Reflection {
  quote: string
  followUp: string | null
}

export interface NextProject {
  slug: string
  title: string
  blurb: string | null
}

export interface Project {
  slug: string
  order: number
  visible: boolean
  reversed: boolean
  card: ProjectCard
  hero: ProjectHero
  sections: ProjectSection[]
  reflection: Reflection
  nextProject: NextProject | null
}

export interface SiteHero {
  eyebrow: string
  headline: string
  subtext: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

export interface SiteContent {
  hero: SiteHero
  ticker: { testimonials: string[] }
  workSection: { eyebrow: string; heading: string; description: string }
  about: Record<string, unknown>
  contact: { email: string; resumeUrl: string }
  footer: Record<string, unknown>
  footerCaseStudy: Record<string, unknown>
}

// ─── Readers ─────────────────────────────────────────────────────────────────

function readJSON<T>(filename: string): T {
  const filePath = path.join(CONTENT_DIR, filename)
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as T
}

export function getAllProjects(): Project[] {
  const projects = readJSON<Project[]>('projects.json')
  return projects
    .filter(p => p.visible)
    .sort((a, b) => a.order - b.order)
}

export function getAllProjectsAdmin(): Project[] {
  return readJSON<Project[]>('projects.json').sort((a, b) => a.order - b.order)
}

export function getProjectBySlug(slug: string): Project | null {
  const projects = readJSON<Project[]>('projects.json')
  return projects.find(p => p.slug === slug) ?? null
}

export function getSiteContent(): SiteContent {
  return readJSON<SiteContent>('site.json')
}

// ─── Writers (local filesystem — dev only; see CMS_README for production) ───

export function saveProjects(projects: Project[]): void {
  const filePath = path.join(CONTENT_DIR, 'projects.json')
  fs.writeFileSync(filePath, JSON.stringify(projects, null, 2), 'utf-8')
}

export function saveProject(project: Project): void {
  const projects = readJSON<Project[]>('projects.json')
  const idx = projects.findIndex(p => p.slug === project.slug)
  if (idx >= 0) {
    projects[idx] = project
  } else {
    projects.push(project)
  }
  saveProjects(projects)
}

export function deleteProject(slug: string): void {
  const projects = readJSON<Project[]>('projects.json')
  saveProjects(projects.filter(p => p.slug !== slug))
}

export function saveSiteContent(content: SiteContent): void {
  const filePath = path.join(CONTENT_DIR, 'site.json')
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8')
}
