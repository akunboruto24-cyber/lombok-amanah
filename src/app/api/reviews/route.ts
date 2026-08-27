import { NextRequest, NextResponse } from 'next/server';
import { addReview, getReviewsForTour } from '@/lib/reviews-store';

const reviewRateLimit = new Map<string, { count: number; resetTime: number }>();
const REVIEW_LIMIT = 5;
const REVIEW_WINDOW = 60 * 60 * 1000;

function getClientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') || 'unknown';
}

function sanitize(str: string, maxLen: number): string {
  return str.replace(/[<>]/g, '').trim().slice(0, maxLen);
}

export async function GET(req: NextRequest) {
  const tourId = req.nextUrl.searchParams.get('tour_id');
  if (!tourId) {
    return NextResponse.json({ error: 'tour_id required' }, { status: 400 });
  }
  const reviews = getReviewsForTour(tourId);
  return NextResponse.json({ reviews });
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const now = Date.now();
  const record = reviewRateLimit.get(ip);

  if (record && now < record.resetTime) {
    if (record.count >= REVIEW_LIMIT) {
      return NextResponse.json(
        { error: 'Terlalu banyak review. Coba lagi nanti.' },
        { status: 429 }
      );
    }
    record.count++;
  } else {
    reviewRateLimit.set(ip, { count: 1, resetTime: now + REVIEW_WINDOW });
  }

  const body = await req.json();
  const { tour_id, name, country, rating, comment } = body;

  if (!tour_id || !name || !rating || !comment) {
    return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
  }

  const cleanName = sanitize(String(name), 60);
  const cleanCountry = country ? sanitize(String(country), 40) : '';
  const cleanComment = sanitize(String(comment), 800);
  const cleanRating = Math.max(1, Math.min(5, parseInt(String(rating)) || 5));

  if (cleanName.length < 2) {
    return NextResponse.json({ error: 'Nama tidak valid' }, { status: 400 });
  }
  if (cleanComment.length < 10) {
    return NextResponse.json({ error: 'Komentar terlalu pendek (min 10 karakter)' }, { status: 400 });
  }

  const review = addReview(String(tour_id), {
    customer_id: null,
    tour_id: String(tour_id),
    rating: cleanRating,
    comment: cleanComment,
    photos: [],
    customer: {
      id: `guest-${Date.now()}`,
      name: cleanName,
      email: null,
      phone: '',
      country: cleanCountry || null,
      language: 'id',
    },
  });

  return NextResponse.json({ success: true, review });
}
