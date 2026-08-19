import { cookies } from 'next/headers';
import { createHmac, randomBytes, timingSafeEqual } from 'crypto';

const SECRET = process.env.ADMIN_PASSWORD || randomBytes(32).toString('hex');

function signToken(payload: string): string {
  const sig = createHmac('sha256', SECRET).update(payload).digest('hex');
  return `${payload}.${sig}`;
}

function verifyToken(token: string): boolean {
  const lastDot = token.lastIndexOf('.');
  if (lastDot === -1) return false;

  const payload = token.slice(0, lastDot);
  const sig = token.slice(lastDot + 1);

  const expected = createHmac('sha256', SECRET).update(payload).digest('hex');

  if (sig.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
}

export function createAdminToken(): string {
  const payload = `admin:${Date.now()}:${randomBytes(16).toString('hex')}`;
  return signToken(payload);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');
  if (!token?.value) return false;
  return verifyToken(token.value);
}
