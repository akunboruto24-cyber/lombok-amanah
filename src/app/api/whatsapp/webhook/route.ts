import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { sendWhatsAppMessage, markAsRead } from '@/lib/whatsapp';
import { getAIResponse } from '@/lib/ai-assistant';

const OWNER_PHONE = process.env.OWNER_PHONE || '628214332571';

function verifySignature(body: string, signature: string | null): boolean {
  const appSecret = process.env.META_APP_SECRET;
  if (!appSecret) return true; // skip if not configured yet

  if (!signature) return false;
  const expected = createHmac('sha256', appSecret).update(body).digest('hex');
  return signature === `sha256=${expected}`;
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const mode = params.get('hub.mode');
  const token = params.get('hub.verify_token');
  const challenge = params.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();

    const signature = req.headers.get('x-hub-signature-256');
    if (!verifySignature(rawBody, signature)) {
      console.warn('[Webhook] Invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const body = JSON.parse(rawBody);

    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    if (!value?.messages?.[0]) {
      return NextResponse.json({ status: 'no message' });
    }

    const msg = value.messages[0];
    const from = msg.from;
    const messageId = msg.id;
    const contactName = value.contacts?.[0]?.profile?.name || 'Customer';

    if (msg.type !== 'text') {
      await sendWhatsAppMessage(from, 'Terima kasih! 🌴 Saat ini kami hanya bisa membalas pesan teks. Silakan kirim pertanyaan Anda dalam bentuk teks.');
      return NextResponse.json({ status: 'non-text' });
    }

    const text = msg.text.body;

    if (text.length > 2000) {
      await sendWhatsAppMessage(from, 'Pesan terlalu panjang. Mohon kirim pesan yang lebih singkat.');
      return NextResponse.json({ status: 'too-long' });
    }

    await markAsRead(messageId);

    const { reply, forwardToAdmin } = await getAIResponse(from, text);

    await sendWhatsAppMessage(from, reply);

    if (forwardToAdmin) {
      const adminMsg = `📩 *Pesan perlu ditindaklanjuti*\n\n👤 ${contactName} (${from})\n💬 "${text.substring(0, 300)}"\n\n🤖 AI sudah balas:\n"${reply.substring(0, 200)}${reply.length > 200 ? '...' : ''}"`;
      await sendWhatsAppMessage(OWNER_PHONE, adminMsg);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error('[Webhook] Error:', err);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
