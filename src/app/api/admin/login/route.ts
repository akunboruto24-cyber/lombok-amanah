import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const adminPassword = process.env.ADMIN_PASSWORD || 'lombokAmanah2026!';

  if (password !== adminPassword) {
    return NextResponse.json({ error: 'Password salah' }, { status: 401 });
  }

  const token = Buffer.from(`admin:${Date.now()}`).toString('base64');

  const cookieStore = await cookies();
  cookieStore.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 hari
    path: '/',
  });

  return NextResponse.json({ success: true });
}
