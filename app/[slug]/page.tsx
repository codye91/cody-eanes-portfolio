/**
 * Root-level case study routes: /wegovy, /wendys, etc.
 * Re-exports everything from app/work/[slug]/page.tsx so both URL patterns work.
 */
export { default, generateStaticParams, generateMetadata } from '@/app/work/[slug]/page'
