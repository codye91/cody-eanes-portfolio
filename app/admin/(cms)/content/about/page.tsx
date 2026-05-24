import type { Metadata } from 'next'
import { getSiteContent } from '@/lib/content'
import ContentFormAbout from '@/components/ContentFormAbout'

export const metadata: Metadata = { title: 'About' }

export default function AdminContentAboutPage() {
  const content = getSiteContent()
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">About</h1>
          <p className="admin-page-sub">Hero, bio, facts, human stuff, what sets me apart, how I work</p>
        </div>
      </div>
      <ContentFormAbout initialContent={content} />
    </div>
  )
}
