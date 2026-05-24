import { NextRequest, NextResponse } from 'next/server'
import { createSessionToken, cookieName, cookieOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  let body: { username?: string; password?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { username, password } = body
  const adminUsername = process.env.ADMIN_USERNAME
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    console.error('ADMIN_PASSWORD env var is not set')
    return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 })
  }

  const usernameMatch = adminUsername ? username === adminUsername : true
  const passwordMatch = password === adminPassword

  if (!usernameMatch || !passwordMatch) {
    return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 })
  }

  const token = await createSessionToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(cookieName(), token, cookieOptions())
  return res
}
