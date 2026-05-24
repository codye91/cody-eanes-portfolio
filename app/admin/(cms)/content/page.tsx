import type { Metadata } from 'next'
import { getSiteContent } from '@/lib/content'
import ContentForm from '@/components/ContentForm'

export const metadata: Metadata = { title: 'Content' }

export default function AdminContentPage() {
  const content = getSiteContent()
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Home</h1>
          <p className="admin-page-sub">Hero, ticker, work section, footer</p>
        </div>
      </div>
      <ContentForm initialContent={content} />
    </div>
  )
}
