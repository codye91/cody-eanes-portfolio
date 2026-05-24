import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getSiteContent, saveSiteContent } from '@/lib/content'
import type { SiteContent } from '@/lib/content'

export async function GET() {
  const authed = await getSession()
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  return NextResponse.json(getSiteContent())
}

export async function PUT(req: NextRequest) {
  const authed = await getSession()
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let content: SiteContent
  try {
    content = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  try {
    await saveSiteContent(content)
    return NextResponse.json({ ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to save site content.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
