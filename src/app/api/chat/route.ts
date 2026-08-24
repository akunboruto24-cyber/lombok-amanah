import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

const LLM_MODEL = process.env.LLM_MODEL || 'gemini/gemini-2.5-flash';
const LLM_API_URL = process.env.LLM_API_URL || 'https://lite.koboillm.com/v1/chat/completions';

const chatRateLimit = new Map<string, { count: number; resetTime: number }>();
const CHAT_LIMIT = 30;
const CHAT_WINDOW = 60 * 1000;

function getClientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') || 'unknown';
}

const BUSINESS_KNOWLEDGE = `## Lombok Nusa Alam Tour & Travel
Website: lomboknusaalam.com | WhatsApp: +62 821-4332-571 | Email: lomboknusalam@gmail.com
Address: Jl. Raya Tanjung, Kekait, Gunungsari, Lombok Barat, NTB 83351
Hours: Daily 06:00-22:00 WITA. Payment: transfer/QRIS/cash, 30% deposit. Cancel free 24h before.

## TOUR PACKAGES (price per group, max 4 people, includes: driver, AC vehicle, fuel, water, parking)
1. **Sasak Cultural Tour** — Rp 850k / $53. Sade Village, Mandalika Circuit, Kuta Beach, Merese Hill, Tanjung Aan. 8-10h.
2. **Beach Tour** — Rp 850k / $53. Selong Belanak, Mawun, Kuta, Tanjung Aan, Merese. 8-10h.
3. **Mataram City Tour** — Rp 850k / $53. Islamic Center, Monkey Forest, Narmada, Malimbu, Senggigi. 8-10h.
4. **Sembalun Highland** — Rp 900k / $56. Bukit Selong, Taman Surga, Pusuk Sembalun, Kebun Stroberi, Masjid Bayan. 10-12h.
5. **West Sekotong (3 Gili)** — Rp 850k / $53. Gili Nanggu, Kedis, Sudak. 8-10h. + boat fee ~Rp 300-500k.
6. **Waterfall Tour I** — Rp 850k / $53. Benang Stokel, Benang Kelambu. 6-8h.
7. **East Lombok Island** — Rp 950k / $59. Gili Kondo, Pasir, Kapal. 8-10h. + boat ~Rp 500-800k.
8. **Waterfall Tour II** — Rp 950k / $59. Sendang Gile, Tiu Kelep (Senaru). 8-10h.
9. **East Lombok Beach** — Rp 950k / $59. Pink Beach, Kura-Kura, Ekas. 10-12h.
10. **Tete Batu Package** — Rp 2jt / $125. Tete Batu Village (rice terraces, waterfalls). 8-10h.

## NOT INCLUDED (biaya terpisah)
- **Hotel pickup fee**: Rp 50k-100k (area Kuta/Mataram/Senggigi/Airport BIL), Rp 150k-300k (Sembalun/Senaru/East Lombok)
- Entrance tickets (~Rp 20k/person)
- Meals (customer choose, or arrange custom lunch with driver)
- Boat fees for island tours
- Snorkel rental (~Rp 50k), costume rental Sade (~Rp 50-100k)
- Tips (optional), travel insurance

## VEHICLES
- Avanza/BR-V: 4 pax (standard, included in tour price)
- Innova: 6-7 pax (+Rp 200-300k)
- Elf/HiAce: 12-15 pax (+Rp 350-500k)

## SERVICES
- Airport Transfer: Rp 200k-500k depending on hotel location
- Custom Tour: design your own, price by destination/duration
- Car Charter: Rp 450k-1.2jt/day
- Multi-day discount: 5-10% for 3+ days

## FAQ
- Custom tour: YES available
- Kids friendly: YES, car seat on request
- Halal food: YES, majority Muslim area
- Language: driver bilingual ID/EN, other languages need 3-day advance
- Pickup from Bali: NO, only Lombok. Use fast boat from Padang Bai
- Weather cancel: full refund or free reschedule
- Combined tour possible (Sasak+Beach in 1 day)`;

function buildSystemPrompt(lang: 'id' | 'en'): string {
  const langRule = lang === 'en'
    ? `Default: English. AUTO-DETECT customer's language per message and reply in same language (ID/EN/mixed/others).`
    : `Default: Indonesia. AUTO-DETECT bahasa customer per pesan dan balas bahasa yang sama (ID/EN/campur/lainnya).`;

  return `You are AI customer service for Lombok Nusa Alam Tour & Travel (licensed local operator in Lombok).

LANGUAGE: ${langRule}

${BUSINESS_KNOWLEDGE}

RESPONSE RULES:
1. POLITE & PROFESSIONAL. Use "Anda" (ID) or "Sir/Madam" (EN).
2. ACCURATE — only quote prices/info from data above. Never invent.
3. CONCISE — max 4-5 sentences, use bullets for lists. This is web chat, not email.
4. ALWAYS mention pickup fee separately when quoting price ("belum termasuk biaya jemput Rp 50-300k").
5. Use 1-2 emojis max (🌴 ☀️ 🏖️).
6. After answering, suggest next step ("Mau saya bantu booking?").

FOR BOOKING: collect systematically — name, tour, date, people, pickup location, phone.
When ALL collected, end message with JSON on new line:
[BOOKING]{"name":"...","tour":"...","date":"YYYY-MM-DD","people":N,"pickup":"...","phone":"..."}[/BOOKING]

FOR NEGOTIATION/PAYMENT/COMPLAINT: end with [FORWARD_TO_ADMIN]

NEVER: invent prices, argue with customer, share unrelated info.`;
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

  const apiKey = process.env.LLM_API_KEY || process.env.GROQ_API_KEY || process.env.GEMINI_API_KEY;
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

  const chatMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.slice(-10).map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: String(m.content).slice(0, 1500),
    })),
  ];

  try {
    const res = await fetch(LLM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: LLM_MODEL,
        messages: chatMessages,
        max_tokens: 2000,
        temperature: 0.6,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[Chat] LLM API error', {
        status: res.status,
        url: LLM_API_URL,
        model: LLM_MODEL,
        keyPrefix: apiKey.substring(0, 6),
        error: err.substring(0, 500),
      });
      return NextResponse.json({
        reply: language === 'en'
          ? 'Sorry, I\'m having trouble right now. Please contact us via WhatsApp: +62 821-4332-571 🌴'
          : 'Maaf, ada gangguan sebentar. Silakan hubungi WhatsApp kami: +62 821-4332-571 🌴',
      });
    }

    const data = await res.json();
    let reply = data.choices?.[0]?.message?.content || '';

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
