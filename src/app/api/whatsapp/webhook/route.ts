import { NextRequest, NextResponse } from 'next/server';
import { sendWhatsAppMessage, markAsRead } from '@/lib/whatsapp';
import { getAIResponse } from '@/lib/ai-assistant';

const OWNER_PHONE = '628214332571';

// GET — Meta webhook verification
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

// POST — incoming messages
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    if (!value?.messages?.[0]) {
      return NextResponse.json({ status: 'no message' });
    }

    const msg = value.messages[0];
    const from = msg.from; // sender phone number
    const messageId = msg.id;
    const contactName = value.contacts?.[0]?.profile?.name || 'Customer';

    // Only handle text messages
    if (msg.type !== 'text') {
      await sendWhatsAppMessage(from, 'Terima kasih! 🌴 Saat ini kami hanya bisa membalas pesan teks. Silakan kirim pertanyaan Anda dalam bentuk teks.');
      return NextResponse.json({ status: 'non-text' });
    }

    const text = msg.text.body;

    // Mark as read
    await markAsRead(messageId);

    // Get AI response
    const { reply, forwardToAdmin } = await getAIResponse(from, text);

    // Send AI reply to customer
    await sendWhatsAppMessage(from, reply);

    // Forward to admin if needed
    if (forwardToAdmin) {
      const adminMsg = `📩 *Pesan perlu ditindaklanjuti*\n\n👤 ${contactName} (${from})\n💬 "${text}"\n\n🤖 AI sudah balas:\n"${reply.substring(0, 200)}${reply.length > 200 ? '...' : ''}"`;
      await sendWhatsAppMessage(OWNER_PHONE, adminMsg);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error('[Webhook] Error:', err);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
