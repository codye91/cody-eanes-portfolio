import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Settings' }

export default function AdminSettingsPage() {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Settings</h1>
      </div>
      <div className="admin-form">
        <section className="admin-form-section">
          <h2 className="admin-form-section-title">Authentication</h2>
          <p className="admin-field-hint">
            The admin password is set via the <code>ADMIN_PASSWORD</code> environment variable
            in your Vercel project settings (or <code>.env.local</code> for local development).
            To change it, update that variable and redeploy.
          </p>
          <div className="admin-settings-info">
            <div className="admin-settings-row">
              <span className="admin-settings-label">Auth method</span>
              <span className="admin-settings-value">httpOnly cookie · JWT · 7 days</span>
            </div>
            <div className="admin-settings-row">
              <span className="admin-settings-label">Protected routes</span>
              <span className="admin-settings-value">/admin/* · /api/admin/*</span>
            </div>
          </div>
        </section>

        <section className="admin-form-section">
          <h2 className="admin-form-section-title">Content Storage</h2>
          <p className="admin-field-hint">
            Content is stored as JSON files in the <code>/content</code> directory.
            In local development, the API routes write directly to the filesystem.
            On Vercel, the filesystem is read-only — see <code>CMS_README.md</code> for
            the recommended production content strategy.
          </p>
          <div className="admin-settings-info">
            <div className="admin-settings-row">
              <span className="admin-settings-label">projects.json</span>
              <span className="admin-settings-value">content/projects.json</span>
            </div>
            <div className="admin-settings-row">
              <span className="admin-settings-label">site.json</span>
              <span className="admin-settings-value">content/site.json</span>
            </div>
            <div className="admin-settings-row">
              <span className="admin-settings-label">Images</span>
              <span className="admin-settings-value">public/images/</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
