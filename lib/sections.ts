/**
 * lib/sections.ts  —  Section (block) registry for case study pages
 *
 * This is the central map of section type strings → React components.
 *
 * HOW TO ADD A NEW SECTION TYPE:
 *   1. Define the TypeScript type in lib/content.ts (extend SectionBase)
 *   2. Add the type to the ProjectSection union in lib/content.ts
 *   3. Build the component in components/sections/YourSection.tsx
 *   4. Add an entry here in SECTION_REGISTRY
 *   5. Add a default data object in SECTION_DEFAULTS
 *   6. Add a display label in SECTION_LABELS
 *
 * Components are lazy-loaded so the public bundle stays lean.
 */

import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'
import type { ProjectSection } from './content'

// ─── Registry ────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySectionComponent = ComponentType<{ s: any }>

export const SECTION_REGISTRY: Record<string, AnySectionComponent> = {
  projectOverview: dynamic(() => import('@/components/sections/ProjectOverviewSection')),
  problemCards:    dynamic(() => import('@/components/sections/ProblemCardsSection')),
  journeyStages:   dynamic(() => import('@/components/sections/JourneyStagesSection')),
  bigStat:         dynamic(() => import('@/components/sections/BigStatSection')),
  executionGrid:   dynamic(() => import('@/components/sections/ExecutionGridSection')),
  pocketsGrid:     dynamic(() => import('@/components/sections/PocketsGridSection')),
  brandsGrid:      dynamic(() => import('@/components/sections/BrandsGridSection')),
  swBrandsGrid:    dynamic(() => import('@/components/sections/BrandsGridSection')),
  contextCards:    dynamic(() => import('@/components/sections/ContextCardsSection')),
  audienceGrid:    dynamic(() => import('@/components/sections/AudienceGridSection')),
  archGrid:        dynamic(() => import('@/components/sections/ArchGridSection')),
  briefCallout:    dynamic(() => import('@/components/sections/BriefCalloutSection')),
  findingsGrid:    dynamic(() => import('@/components/sections/FindingsGridSection')),
  outcomes:        dynamic(() => import('@/components/sections/OutcomesSection')),
  // ── Add your sections here ────────────────────────────────────────────────
}

// ─── Labels ───────────────────────────────────────────────────────────────────

const SECTION_LABELS: Record<string, string> = {
  projectOverview: 'Project Overview',
  problemCards:    'Problem Cards',
  journeyStages:   'Journey Stages',
  bigStat:         'Big Stat',
  executionGrid:   'Execution Grid',
  pocketsGrid:     'Pockets Grid',
  brandsGrid:      'Brands Grid',
  swBrandsGrid:    'SW Brands Grid',
  contextCards:    'Context Cards',
  audienceGrid:    'Audience Grid',
  archGrid:        'Architecture Grid',
  briefCallout:    'Brief Callout',
  findingsGrid:    'Findings Grid',
  outcomes:        'Outcomes',
}

/** Returns all registered section types with their display labels. */
export function getSectionOptions(): { type: string; label: string }[] {
  return Object.keys(SECTION_REGISTRY).map(type => ({
    type,
    label: SECTION_LABELS[type] ?? type,
  }))
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

/**
 * When a section is added in the admin, these defaults pre-populate
 * the section's data so it renders something meaningful immediately.
 */
export const SECTION_DEFAULTS: Record<string, Omit<ProjectSection, 'type'>> = {
  projectOverview: {
    background: 'default',
    eyebrow: 'Overview',
    paragraphs: ['Project overview paragraph.'],
    image: '/images/placeholder.png',
    imageAlt: 'Project overview image',
  },
  problemCards: {
    background: 'surface',
    eyebrow: 'The Problem',
    heading: 'What we were solving',
    cards: [
      { label: 'Problem 1', title: 'Title here', body: 'Description.' },
      { label: 'Problem 2', title: 'Title here', body: 'Description.' },
    ],
  },
  journeyStages: {
    background: 'default',
    eyebrow: 'The Journey',
    heading: 'How we got there',
    body: '',
    stages: [
      { number: '01', title: 'Discovery', subtitle: 'Understanding the landscape.' },
      { number: '02', title: 'Define', subtitle: 'Framing the problem.' },
      { number: '03', title: 'Design', subtitle: 'Building solutions.' },
      { number: '04', title: 'Deliver', subtitle: 'Shipping and measuring.' },
    ],
  },
  bigStat: {
    background: 'surface',
    eyebrow: '',
    heading: '',
    number: '0',
    numberStrong: 'Key metric',
    numberSub: 'Supporting context',
    bodyTexts: ['Body copy explaining the stat.'],
    pullquote: '',
    details: [
      { heading: 'Detail heading', body: 'Detail body.' },
    ],
  },
  executionGrid: {
    background: 'default',
    eyebrow: 'Execution',
    heading: 'How we built it',
    bodyTexts: [],
    columns: [
      { title: 'Column 1', items: ['Item one', 'Item two'] },
      { title: 'Column 2', items: ['Item one', 'Item two'] },
    ],
  },
  pocketsGrid: {
    background: 'surface',
    eyebrow: '',
    heading: 'Key opportunities',
    body: '',
    pockets: [
      { number: '01', title: 'Pocket title', problem: 'The problem.', solution: 'The solution.', impact: 'The impact.' },
    ],
  },
  brandsGrid: {
    background: 'default',
    eyebrow: '',
    heading: 'Brands',
    body: '',
    brands: [
      { number: '01', name: 'Brand Name', audience: 'Target audience', description: 'Description.' },
    ],
  },
  swBrandsGrid: {
    background: 'surface',
    eyebrow: '',
    heading: 'SW Brands',
    body: '',
    brands: [
      { number: '01', name: 'Brand Name', audience: 'Target audience', description: 'Description.' },
    ],
  },
  contextCards: {
    background: 'surface-alt',
    eyebrow: 'Context',
    heading: 'What we found',
    body: '',
    cards: [
      { label: 'Finding 1', title: 'Card title', body: 'Card body.' },
      { label: 'Finding 2', title: 'Card title', body: 'Card body.' },
    ],
  },
  audienceGrid: {
    background: 'default',
    eyebrow: 'Audience',
    heading: 'Who we designed for',
    bigNumber: '0',
    bigNumberStrong: 'Total reach',
    bigNumberSub: 'Supporting context',
    body: '',
    audiences: [
      { number: '01', title: 'Segment name', note: 'Description.' },
    ],
    pullquote: '',
    details: [],
  },
  archGrid: {
    background: 'surface',
    eyebrow: 'Architecture',
    heading: 'System design',
    body: '',
    items: [
      { number: '01', title: 'Component', body: 'What it does.', impact: 'Why it matters.' },
    ],
  },
  briefCallout: {
    background: 'surface-alt',
    eyebrow: '',
    heading: '',
    quote: '"Quote text here."',
    source: 'Source',
    bodyTexts: ['Supporting body copy.'],
  },
  findingsGrid: {
    background: 'default',
    eyebrow: 'Research',
    heading: 'What we learned',
    body: '',
    findings: [
      { title: 'Finding category', items: ['Item one', 'Item two'] },
    ],
  },
  outcomes: {
    background: 'surface',
    eyebrow: 'Outcomes',
    heading: 'Results',
    stats: [
      { value: '0%', label: 'Metric label' },
    ],
    list: ['Key outcome one.', 'Key outcome two.'],
  },
}
