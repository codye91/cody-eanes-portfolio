import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getProjectBySlug, saveProject, deleteProject } from '@/lib/content'
import type { Project } from '@/lib/content'

type Params = { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  const authed = await getSession()
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const project = getProjectBySlug(id)
  if (!project) return NextResponse.json({ error: 'Not found.' }, { status: 404 })

  return NextResponse.json(project)
}

export async function PUT(req: NextRequest, { params }: Params) {
  const authed = await getSession()
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const existing = getProjectBySlug(id)
  if (!existing) return NextResponse.json({ error: 'Not found.' }, { status: 404 })

  let updated: Project
  try {
    updated = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  // Preserve the original slug — don't allow slug changes via PUT
  updated.slug = id
  saveProject(updated)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const authed = await getSession()
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const existing = getProjectBySlug(id)
  if (!existing) return NextResponse.json({ error: 'Not found.' }, { status: 404 })

  deleteProject(id)
  return NextResponse.json({ ok: true })
}
