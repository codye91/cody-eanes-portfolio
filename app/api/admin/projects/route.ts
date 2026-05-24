import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getAllProjectsAdmin, saveProject } from '@/lib/content'
import type { Project } from '@/lib/content'

export async function GET() {
  const authed = await getSession()
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const projects = getAllProjectsAdmin()
  return NextResponse.json(projects)
}

export async function POST(req: NextRequest) {
  const authed = await getSession()
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let project: Project
  try {
    project = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  if (!project.slug) {
    return NextResponse.json({ error: 'slug is required.' }, { status: 400 })
  }

  const existing = getAllProjectsAdmin()
  if (existing.find(p => p.slug === project.slug)) {
    return NextResponse.json({ error: 'A project with that slug already exists.' }, { status: 409 })
  }

  saveProject(project)
  return NextResponse.json({ ok: true }, { status: 201 })
}
