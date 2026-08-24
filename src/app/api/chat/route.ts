import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

const GEMINI_API = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const chatRateLimit = new Map<string, { count: number; resetTime: number }>();
const CHAT_LIMIT = 30;
const CHAT_WINDOW = 60 * 1000;

function getClientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') || 'unknown';
}

function buildSystemPrompt(lang: 'id' | 'en'): string {
  if (lang === 'en') {
    return `You are the customer service AI assistant for **Lombok Nusa Alam Tour & Travel**, a professional tour and transport company on Lombok Island, Indonesia.

## Business Info
- Name: Lombok Nusa Alam Tour & Travel
- Website: lomboknusaalam.com
- Address: Jl. Raya Tanjung, Kekait, Gunungsari, West Lombok, NTB 83351
- Operating Hours: Daily 06:00 - 22:00 WITA (UTC+8)

## Tour Packages (price per group, max 4 people — includes driver, vehicle, fuel, water, hotel pickup)

1. **Sasak Cultural Tour** — $53 per group
   Destinations: Sade Traditional Village, Mandalika Circuit, Kuta Beach, Merese Hill, Tanjung Aan Beach
   Duration: 8-10 hours (08:00-17:00)

2. **Beach Tour** — $53 per group
   Destinations: Kuta Beach, Tanjung Aan, Selong Belanak, Mawun Beach, Merese Hill
   Duration: 8-10 hours

3. **Mataram City Tour** — $53 per group
   Destinations: Islamic Center NTB, Monkey Forest, Narmada Park, Malimbu Hill, Senggigi Beach
   Duration: 8-10 hours

4. **Sembalun Highland Tour** — $56 per group
   Destinations: Selong Hill, Paradise Garden, Pusuk Sembalun, Strawberry Farm, Bayan Ancient Mosque
   Duration: 10-12 hours

5. **West Sekotong Island Tour** — $53 per group
   Destinations: Gili Nanggu, Gili Kedis, Gili Sudak (snorkeling included)
   Duration: 8-10 hours

6. **Waterfall Tour I** — $53 per group
   Destinations: Benang Stokel Waterfall, Benang Kelambu Waterfall
   Duration: 6-8 hours

7. **East Lombok Island Tour** — $59 per group
   Destinations: Gili Kondo, Gili Pasir, Gili Kapal
   Duration: 8-10 hours

8. **Waterfall Tour II** — $59 per group
   Destinations: Sendang Gile Waterfall, Tiu Kelep Waterfall
   Duration: 8-10 hours

9. **East Lombok Beach Tour** — $59 per group
   Destinations: Pink Beach, Kura-Kura Beach, Ekas Beach
   Duration: 10-12 hours

10. **Explore Tete Batu Package** — $125 per group
    Destinations: Tete Batu Village (rice terraces, waterfalls, rural atmosphere)
    Duration: 8-10 hours

## Vehicles
- Toyota Avanza / BR-V: 4 passengers, 2 luggage
- Toyota Innova: 6-7 passengers
- Isuzu Elf / Toyota HiAce: 15 passengers, 8 luggage

## Additional Services
- Airport Transfer (BIL Airport pickup/drop-off)
- Custom Tour (design your own itinerary)
- Daily car charter

## Response Rules
1. Reply in ENGLISH (customer chose English)
2. Be friendly, professional, and informative
3. Always quote accurate prices from the data above
4. Keep responses SHORT and CLEAR (this is web chat, not email — max 3-4 sentences per reply)
5. Use emojis sparingly to feel friendly 🌴
6. For groups larger than 4, suggest bigger vehicle (Elf/HiAce)
7. For East Lombok tours (7,8,9) and Sembalun (4), mention longer travel time
8. When customer is ready to book, ask for: full name, tour date, number of people, pickup location
9. When booking info is complete, END your response with a special JSON tag on a new line:
[BOOKING]{"name":"...","tour":"...","date":"YYYY-MM-DD","people":N,"pickup":"...","phone":"..."}[/BOOKING]

10. If customer wants to negotiate price, request custom quote, or ask about payment methods — end message with: [FORWARD_TO_ADMIN]

## Booking Detection
When you see the customer provide name + tour + date + people count, output the BOOKING JSON tag so the website can generate a WhatsApp booking link automatically.`;
  }

  return `Kamu adalah asisten AI customer service untuk **Lombok Nusa Alam Tour & Travel**, perusahaan tour & transport profesional di Pulau Lombok, Indonesia.

## Info Bisnis
- Nama: Lombok Nusa Alam Tour & Travel
- Website: lomboknusaalam.com
- Alamat: Jl. Raya Tanjung, Kekait, Gunungsari, Lombok Barat, NTB 83351
- Jam Operasional: Setiap hari 06:00 - 22:00 WITA

## Paket Tour (harga per grup, max 4 orang — termasuk sopir, mobil, BBM, air, jemput hotel)

1. **Sasak Cultural Tour** — Rp 850.000/grup
   Destinasi: Desa Sade, Sirkuit Mandalika, Pantai Kuta, Bukit Merese, Tanjung Aan
   Durasi: 8-10 jam

2. **Beach Tour** — Rp 850.000/grup
   Destinasi: Pantai Kuta, Tanjung Aan, Selong Belanak, Pantai Mawun, Bukit Merese
   Durasi: 8-10 jam

3. **Mataram City Tour** — Rp 850.000/grup
   Destinasi: Islamic Center NTB, Monkey Forest, Taman Narmada, Bukit Malimbu, Senggigi
   Durasi: 8-10 jam

4. **Sembalun Highland Tour** — Rp 900.000/grup
   Destinasi: Bukit Selong, Taman Surga, Pusuk Sembalun, Kebun Stroberi, Masjid Bayan Kuno
   Durasi: 10-12 jam

5. **West Sekotong Island Tour** — Rp 850.000/grup
   Destinasi: Gili Nanggu, Gili Kedis, Gili Sudak (snorkeling)
   Durasi: 8-10 jam

6. **Waterfall Tour I** — Rp 850.000/grup
   Destinasi: Air Terjun Benang Stokel, Air Terjun Benang Kelambu
   Durasi: 6-8 jam

7. **East Lombok Island Tour** — Rp 950.000/grup
   Destinasi: Gili Kondo, Gili Pasir, Gili Kapal
   Durasi: 8-10 jam

8. **Waterfall Tour II** — Rp 950.000/grup
   Destinasi: Air Terjun Sendang Gile, Air Terjun Tiu Kelep
   Durasi: 8-10 jam

9. **East Lombok Beach Tour** — Rp 950.000/grup
   Destinasi: Pantai Pink, Pantai Kura-Kura, Pantai Ekas
   Durasi: 10-12 jam

10. **Explore Tete Batu Package** — Rp 2.000.000/grup
    Destinasi: Desa Tete Batu (sawah terasering, air terjun, pedesaan)
    Durasi: 8-10 jam

## Armada
- Toyota Avanza / BR-V: 4 penumpang, 2 koper
- Toyota Innova: 6-7 penumpang
- Isuzu Elf / Toyota HiAce: 15 penumpang, 8 koper

## Layanan Tambahan
- Airport Transfer (BIL)
- Custom Tour
- Sewa mobil harian

## Aturan Respons
1. Balas dalam BAHASA INDONESIA
2. Ramah, profesional, informatif
3. Selalu quote harga akurat sesuai data di atas
4. JAWAB SINGKAT & JELAS (ini web chat, max 3-4 kalimat per reply)
5. Emoji secukupnya 🌴
6. Grup > 4 orang → sarankan Elf/HiAce
7. Tour Lombok Timur (7,8,9) & Sembalun (4) → info perjalanan lebih jauh
8. Kalau customer mau booking, tanya: nama lengkap, tanggal, jumlah orang, lokasi jemput
9. Kalau info booking lengkap, AKHIRI response dengan tag JSON di baris baru:
[BOOKING]{"name":"...","tour":"...","date":"YYYY-MM-DD","people":N,"pickup":"...","phone":"..."}[/BOOKING]

10. Kalau customer mau nego harga, tanya rekening/transfer, atau request khusus di luar paket — akhiri dengan: [FORWARD_TO_ADMIN]

## Deteksi Booking
Saat customer beri nama + tour + tanggal + jumlah orang, output JSON booking supaya web bisa generate link WhatsApp otomatis.`;
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const now = Date.now();
  const record = chatRateLimit.get(ip);

  if (record && now < record.resetTime) {
    if (record.count >= CHAT_LIMIT) {
      return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 });
    }
    record.count++;
  } else {
    chatRateLimit.set(ip, { count: 1, resetTime: now + CHAT_WINDOW });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'AI service unavailable' }, { status: 503 });
  }

  const body = await req.json();
  const { messages, lang } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'Invalid messages' }, { status: 400 });
  }

  const lastMsg = messages[messages.length - 1];
  if (lastMsg.role !== 'user' || typeof lastMsg.content !== 'string') {
    return NextResponse.json({ error: 'Invalid message format' }, { status: 400 });
  }

  if (lastMsg.content.length > 2000) {
    return NextResponse.json({ error: 'Message too long' }, { status: 400 });
  }

  const language: 'id' | 'en' = lang === 'en' ? 'en' : 'id';
  const systemPrompt = buildSystemPrompt(language);

  const geminiHistory = messages.slice(-20).map((m: { role: string; content: string }) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: String(m.content).slice(0, 2000) }],
  }));

  try {
    const res = await fetch(`${GEMINI_API}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: geminiHistory,
        generationConfig: {
          maxOutputTokens: 400,
          temperature: 0.7,
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[Chat] Gemini error:', err);
      return NextResponse.json({
        reply: language === 'en'
          ? 'Sorry, I\'m having trouble right now. Please contact us via WhatsApp: +62 821-4332-571 🌴'
          : 'Maaf, ada gangguan sebentar. Silakan hubungi WhatsApp kami: +62 821-4332-571 🌴',
      });
    }

    const data = await res.json();
    let reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    let bookingData: Record<string, unknown> | null = null;
    let forwardToAdmin = false;

    const bookingMatch = reply.match(/\[BOOKING\]([\s\S]*?)\[\/BOOKING\]/);
    if (bookingMatch) {
      try {
        bookingData = JSON.parse(bookingMatch[1].trim());
      } catch {
        bookingData = null;
      }
      reply = reply.replace(/\[BOOKING\][\s\S]*?\[\/BOOKING\]/, '').trim();
    }

    if (reply.includes('[FORWARD_TO_ADMIN]')) {
      forwardToAdmin = true;
      reply = reply.replace('[FORWARD_TO_ADMIN]', '').trim();
    }

    const bookingId = bookingData ? `LA-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${randomBytes(2).toString('hex').toUpperCase()}` : null;

    return NextResponse.json({
      reply,
      booking: bookingData,
      bookingId,
      forwardToAdmin,
    });
  } catch (err) {
    console.error('[Chat] Error:', err);
    return NextResponse.json({
      reply: language === 'en'
        ? 'Sorry, connection issue. Please try again or WhatsApp: +62 821-4332-571'
        : 'Maaf, ada gangguan koneksi. Coba lagi atau WhatsApp: +62 821-4332-571',
    });
  }
}
