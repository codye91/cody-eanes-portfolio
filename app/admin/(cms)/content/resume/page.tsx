import type { Metadata } from 'next'
import { getSiteContent } from '@/lib/content'
import ContentFormResume from '@/components/ContentFormResume'

export const metadata: Metadata = { title: 'Resume' }

export default function AdminContentResumePage() {
  const content = getSiteContent()
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Resume Link-Out</h1>
          <p className="admin-page-sub">Google Drive URL used throughout the site</p>
        </div>
      </div>
      <ContentFormResume initialContent={content} />
    </div>
  )
}
