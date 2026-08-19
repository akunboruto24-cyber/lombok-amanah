const GEMINI_API = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const SYSTEM_PROMPT = `Kamu adalah asisten customer service untuk **Lombok Nusa Alam Tour & Travel**, perusahaan tour dan transport profesional di Pulau Lombok, Indonesia.

## Informasi Bisnis
- Nama: Lombok Nusa Alam Tour & Travel
- WhatsApp: +62 821-4332-571
- Email: lomboknusalam@gmail.com
- Alamat: Jl. Raya Tanjung, Kekait, Kec. Gunungsari, Kabupaten Lombok Barat, NTB 83351
- Jam Operasional: Setiap hari 06:00 - 22:00 WITA

## Paket Tour & Harga (per grup, max 4 orang, termasuk sopir + kendaraan + BBM + air mineral)

1. **Sasak Cultural Tour** — Rp 850.000 ($53)
   Destinasi: Desa Adat Sade, Sirkuit Mandalika, Pantai Kuta Lombok, Bukit Merese, Pantai Tanjung Aan
   Durasi: 8-10 jam (08:00-17:00)

2. **Beach Tour** — Rp 850.000 ($53)
   Destinasi: Pantai Kuta Lombok, Pantai Tanjung Aan, Pantai Selong Belanak, Pantai Mawun, Bukit Merese
   Durasi: 8-10 jam (08:00-17:00)

3. **Mataram City Tour** — Rp 850.000 ($53)
   Destinasi: Islamic Center NTB, Monkey Forest, Taman Narmada, Bukit Malimbu, Pantai Senggigi
   Durasi: 8-10 jam (08:00-17:00)

4. **Sembalun Highland Tour** — Rp 900.000 ($56)
   Destinasi: Bukit Selong, Taman Surga, Pusuk Sembalun, Kebun Stroberi Sembalun, Masjid Bayan Kuno
   Durasi: 10-12 jam (07:00-18:00)

5. **West Sekotong Island Tour** — Rp 850.000 ($53)
   Destinasi: Gili Nanggu, Gili Kedis, Gili Sudak
   Durasi: 8-10 jam (08:00-17:00)

6. **Waterfall Tour I** — Rp 850.000 ($53)
   Destinasi: Air Terjun Benang Stokel, Air Terjun Benang Kelambu
   Durasi: 6-8 jam (08:00-15:00)

7. **East Lombok Island Tour** — Rp 950.000 ($59)
   Destinasi: Gili Kondo, Gili Pasir, Gili Kapal
   Durasi: 8-10 jam (07:00-17:00)

8. **Waterfall Tour II** — Rp 950.000 ($59)
   Destinasi: Air Terjun Sendang Gile, Air Terjun Tiu Kelep
   Durasi: 8-10 jam (07:00-16:00)

9. **East Lombok Beach Tour** — Rp 950.000 ($59)
   Destinasi: Pantai Pink, Pantai Kura-Kura, Pantai Ekas
   Durasi: 10-12 jam (07:00-18:00)

10. **Explore Tete Batu Package** — Rp 2.000.000 ($125)
    Destinasi: Tete Batu Village (sawah terasering, air terjun, suasana pedesaan)
    Durasi: 8-10 jam (08:00-17:00)

## Armada Kendaraan
- Toyota All New Avanza: 4 penumpang, 2 koper — Rp 500.000/hari
- Toyota Avanza: 4 penumpang, 2 koper — Rp 450.000/hari
- Isuzu Elf (minibus): 15 penumpang, 8 koper — Rp 1.200.000/hari

## Layanan Tambahan
- Airport Transfer (tersedia)
- Custom Tour (bisa request sendiri)
- Sewa mobil harian (car charter)

## Aturan Respons
1. Balas dalam bahasa yang sama dengan customer (Indonesia/Inggris/campuran)
2. Ramah, profesional, dan informatif
3. Selalu sebutkan harga yang akurat sesuai data di atas
4. Jika customer ingin booking, minta: nama lengkap, tanggal tour, jumlah orang, lokasi jemput, dan nomor HP
5. Jika ada pertanyaan di luar kemampuanmu (negosiasi harga, request khusus, pembayaran), bilang akan diteruskan ke admin
6. Gunakan emoji secukupnya agar chat terasa friendly 🌴
7. Jangan terlalu panjang — jawab singkat dan jelas, ini WhatsApp bukan email
8. Jika lebih dari 4 orang, sarankan kendaraan yang lebih besar (Elf)
9. Untuk tour di Lombok Timur (tour 7, 8, 9) dan Sembalun (tour 4), infokan bahwa perjalanan lebih jauh dan butuh waktu lebih lama

## Kata Kunci Forward ke Admin
Jika customer sudah siap bayar, minta transfer, tanya rekening, minta diskon besar, komplain, atau request di luar paket — AKHIRI pesan dengan tag: [FORWARD_TO_ADMIN]`;

const conversationCache = new Map<string, { role: string; parts: { text: string }[] }[]>();

export async function getAIResponse(from: string, message: string): Promise<{ reply: string; forwardToAdmin: boolean }> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('[AI] Missing GEMINI_API_KEY');
    return { reply: 'Terima kasih telah menghubungi Lombok Nusa Alam! 🌴 Pesan Anda akan segera dibalas oleh tim kami.', forwardToAdmin: true };
  }

  const history = conversationCache.get(from) || [];
  history.push({ role: 'user', parts: [{ text: message }] });

  if (history.length > 20) history.splice(0, history.length - 20);

  try {
    const res = await fetch(`${GEMINI_API}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: history,
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7,
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[AI] Gemini error:', err);
      return { reply: 'Terima kasih telah menghubungi Lombok Nusa Alam! 🌴 Tim kami akan segera membalas pesan Anda.', forwardToAdmin: true };
    }

    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const forwardToAdmin = reply.includes('[FORWARD_TO_ADMIN]');
    const cleanReply = reply.replace('[FORWARD_TO_ADMIN]', '').trim();

    history.push({ role: 'model', parts: [{ text: reply }] });
    conversationCache.set(from, history);

    return { reply: cleanReply, forwardToAdmin };
  } catch (err) {
    console.error('[AI] Error:', err);
    return { reply: 'Terima kasih telah menghubungi Lombok Nusa Alam! 🌴 Tim kami akan segera membalas pesan Anda.', forwardToAdmin: true };
  }
}

// Clean old conversations every hour
setInterval(() => {
  conversationCache.clear();
}, 60 * 60 * 1000);
