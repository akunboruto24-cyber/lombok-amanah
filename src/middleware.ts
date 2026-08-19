import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';

function verifyTokenInMiddleware(token: string, secret: string): boolean {
  const lastDot = token.lastIndexOf('.');
  if (lastDot === -1) return false;

  const payload = token.slice(0, lastDot);
  const sig = token.slice(lastDot + 1);

  const expected = createHmac('sha256', secret).update(payload).digest('hex');

  if (sig.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
}

const securityHeaders: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://images.pexels.com https://images.unsplash.com",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://wa.me https://api.whatsapp.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
};

const apiRateLimit = new Map<string, { count: number; resetTime: number }>();
const API_RATE_LIMIT = 30;
const API_RATE_WINDOW = 60 * 1000; // 1 menit

function checkApiRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = apiRateLimit.get(ip);

  if (!record || now > record.resetTime) {
    apiRateLimit.set(ip, { count: 1, resetTime: now + API_RATE_WINDOW });
    return true;
  }

  record.count++;
  return record.count <= API_RATE_LIMIT;
}

function getClientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') || 'unknown';
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = getClientIp(request);

  if (pathname.startsWith('/api/') && !checkApiRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }

  if (pathname === '/admin/login') {
    const response = NextResponse.next();
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  }

  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token');
    const secret = process.env.ADMIN_PASSWORD;

    if (!token?.value || !secret || !verifyTokenInMiddleware(token.value, secret)) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  if (pathname.startsWith('/api/admin/') && pathname !== '/api/admin/login') {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    if (origin && host && !origin.includes(host)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  const response = NextResponse.next();
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
