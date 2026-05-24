import type { Metadata } from 'next'
import { getSiteContent } from '@/lib/content'
import ContentFormMyProcess from '@/components/ContentFormMyProcess'

export const metadata: Metadata = { title: 'My Process' }

export default function AdminContentMyProcessPage() {
  const content = getSiteContent()
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">My Process</h1>
          <p className="admin-page-sub">Phases and principles</p>
        </div>
      </div>
      <ContentFormMyProcess initialContent={content} />
    </div>
  )
}
