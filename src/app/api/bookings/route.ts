import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

const bookingRateLimit = new Map<string, { count: number; resetTime: number }>();
const BOOKING_LIMIT = 5;
const BOOKING_WINDOW = 10 * 60 * 1000; // 10 menit

function getClientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') || 'unknown';
}

function sanitize(str: string, maxLen: number): string {
  return str.replace(/[<>"'&]/g, '').trim().slice(0, maxLen);
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const now = Date.now();
  const record = bookingRateLimit.get(ip);

  if (record && now < record.resetTime) {
    if (record.count >= BOOKING_LIMIT) {
      return NextResponse.json(
        { error: 'Terlalu banyak booking. Coba lagi nanti.' },
        { status: 429 }
      );
    }
    record.count++;
  } else {
    bookingRateLimit.set(ip, { count: 1, resetTime: now + BOOKING_WINDOW });
  }

  const data = await req.json();
  const { name, phone, email, country, tour, date, time, pickup, passengers, notes, lang } = data;

  if (!name || !phone || !tour || !date) {
    return NextResponse.json({ error: lang === 'en' ? 'Incomplete data' : 'Data tidak lengkap' }, { status: 400 });
  }

  const cleanName = sanitize(String(name), 100);
  const cleanPhone = sanitize(String(phone), 20).replace(/[^0-9+\- ]/g, '');
  const cleanEmail = email ? sanitize(String(email), 100) : '';
  const cleanCountry = country ? sanitize(String(country), 50) : '';
  const cleanTour = sanitize(String(tour), 200);
  const cleanDate = sanitize(String(date), 20);
  const cleanTime = time ? sanitize(String(time), 10) : '';
  const cleanPickup = pickup ? sanitize(String(pickup), 200) : '';
  const cleanPassengers = Math.max(1, Math.min(15, parseInt(String(passengers)) || 1));
  const cleanNotes = notes ? sanitize(String(notes), 500) : '';

  if (cleanName.length < 2) {
    return NextResponse.json({ error: lang === 'en' ? 'Invalid name' : 'Nama tidak valid' }, { status: 400 });
  }

  if (!/^[0-9+\- ]{6,20}$/.test(cleanPhone)) {
    return NextResponse.json({ error: lang === 'en' ? 'Invalid phone number' : 'Nomor telepon tidak valid' }, { status: 400 });
  }

  const dateObj = new Date(cleanDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (isNaN(dateObj.getTime()) || dateObj < today) {
    return NextResponse.json({ error: lang === 'en' ? 'Invalid date' : 'Tanggal tidak valid' }, { status: 400 });
  }

  const bookingCode = `LA-${cleanDate.replace(/-/g, '')}-${randomBytes(3).toString('hex').toUpperCase()}`;

  const whatsappNumber = process.env.WHATSAPP_BUSINESS_NUMBER || '628214332571';

  const whatsappMessage = lang === 'en'
    ? [
        `*New Booking — ${bookingCode}*`,
        `Name: ${cleanName}`,
        `Phone: ${cleanPhone}`,
        cleanEmail ? `Email: ${cleanEmail}` : null,
        cleanCountry ? `Country: ${cleanCountry}` : null,
        `Tour: ${cleanTour}`,
        `Date: ${cleanDate}`,
        cleanTime ? `Pickup Time: ${cleanTime}` : null,
        cleanPickup ? `Pickup Location: ${cleanPickup}` : null,
        `Passengers: ${cleanPassengers}`,
        cleanNotes ? `Notes: ${cleanNotes}` : null,
      ].filter(Boolean).join('\n')
    : [
        `*Booking Baru — ${bookingCode}*`,
        `Nama: ${cleanName}`,
        `Phone: ${cleanPhone}`,
        cleanEmail ? `Email: ${cleanEmail}` : null,
        cleanCountry ? `Negara: ${cleanCountry}` : null,
        `Tour: ${cleanTour}`,
        `Tanggal: ${cleanDate}`,
        cleanTime ? `Waktu Jemput: ${cleanTime}` : null,
        cleanPickup ? `Lokasi Jemput: ${cleanPickup}` : null,
        `Penumpang: ${cleanPassengers}`,
        cleanNotes ? `Catatan: ${cleanNotes}` : null,
      ].filter(Boolean).join('\n');

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return NextResponse.json({
    success: true,
    bookingCode,
    whatsappUrl,
  });
}
