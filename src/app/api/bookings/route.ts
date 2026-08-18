import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();

  const { name, phone, email, country, tour, date, time, pickup, passengers, notes, lang } = data;

  if (!name || !phone || !tour || !date) {
    return NextResponse.json({ error: lang === 'en' ? 'Incomplete data' : 'Data tidak lengkap' }, { status: 400 });
  }

  const bookingCode = `LA-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;

  const whatsappMessage = lang === 'en'
    ? [
        `*New Booking — ${bookingCode}*`,
        `Name: ${name}`,
        `Phone: ${phone}`,
        email ? `Email: ${email}` : null,
        country ? `Country: ${country}` : null,
        `Tour: ${tour}`,
        `Date: ${date}`,
        time ? `Pickup Time: ${time}` : null,
        pickup ? `Pickup Location: ${pickup}` : null,
        `Passengers: ${passengers || 1}`,
        notes ? `Notes: ${notes}` : null,
      ].filter(Boolean).join('\n')
    : [
        `*Booking Baru — ${bookingCode}*`,
        `Nama: ${name}`,
        `Phone: ${phone}`,
        email ? `Email: ${email}` : null,
        country ? `Negara: ${country}` : null,
        `Tour: ${tour}`,
        `Tanggal: ${date}`,
        time ? `Waktu Jemput: ${time}` : null,
        pickup ? `Lokasi Jemput: ${pickup}` : null,
        `Penumpang: ${passengers || 1}`,
        notes ? `Catatan: ${notes}` : null,
      ].filter(Boolean).join('\n');

  const whatsappUrl = `https://wa.me/6281907855550?text=${encodeURIComponent(whatsappMessage)}`;

  return NextResponse.json({
    success: true,
    bookingCode,
    whatsappUrl,
  });
}
