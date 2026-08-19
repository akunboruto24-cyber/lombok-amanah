import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createAdminToken } from '@/lib/admin-auth';

const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 menit

function getClientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') || 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const record = loginAttempts.get(ip);
  if (!record) return { allowed: true };

  const elapsed = Date.now() - record.lastAttempt;
  if (elapsed > LOCKOUT_MS) {
    loginAttempts.delete(ip);
    return { allowed: true };
  }

  if (record.count >= MAX_ATTEMPTS) {
    return { allowed: false, retryAfter: Math.ceil((LOCKOUT_MS - elapsed) / 1000) };
  }

  return { allowed: true };
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: `Terlalu banyak percobaan. Coba lagi dalam ${rateCheck.retryAfter} detik.` },
      { status: 429 }
    );
  }

  const { password } = await req.json();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error('[Auth] ADMIN_PASSWORD not set');
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }

  if (password !== adminPassword) {
    const record = loginAttempts.get(ip) || { count: 0, lastAttempt: 0 };
    record.count++;
    record.lastAttempt = Date.now();
    loginAttempts.set(ip, record);

    console.warn(`[Auth] Failed login from ${ip} (attempt ${record.count})`);
    return NextResponse.json({ error: 'Password salah' }, { status: 401 });
  }

  loginAttempts.delete(ip);

  const token = createAdminToken();

  const cookieStore = await cookies();
  cookieStore.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 1 hari (reduced from 7)
    path: '/',
  });

  return NextResponse.json({ success: true });
}
