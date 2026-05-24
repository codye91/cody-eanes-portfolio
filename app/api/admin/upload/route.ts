import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { getSession } from '@/lib/auth'

const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']

export async function POST(req: NextRequest) {
  const authed = await getSession()
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData().catch(() => null)
  if (!formData) return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 })

  const file = formData.get('file') as File | null
  const folder = (formData.get('folder') as string) ?? 'uploads'

  if (!file) return NextResponse.json({ error: 'No file provided.' }, { status: 400 })

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: 'File type not allowed. Use JPEG, PNG, GIF, WebP, or SVG.' },
      { status: 400 }
    )
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File exceeds 5 MB limit.' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const ext = path.extname(file.name) || '.png'
  const baseName = file.name
    .replace(/[^a-z0-9.-]/gi, '-')
    .toLowerCase()
    .replace(/-+/g, '-')

  const uploadDir = path.join(process.cwd(), 'public', 'images', folder)
  await mkdir(uploadDir, { recursive: true })

  const filePath = path.join(uploadDir, baseName)
  await writeFile(filePath, buffer)

  const publicPath = `/images/${folder}/${baseName}`
  return NextResponse.json({ ok: true, path: publicPath }, { status: 201 })
}
