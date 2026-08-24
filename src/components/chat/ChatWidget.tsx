'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { useLanguage } from '@/lib/language';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  booking?: BookingData | null;
  bookingId?: string | null;
}

interface BookingData {
  name?: string;
  tour?: string;
  date?: string;
  people?: number;
  pickup?: string;
  phone?: string;
}

const WHATSAPP_NUMBER = '628214332571';

function buildWhatsAppUrl(booking: BookingData, bookingId: string | null, lang: 'id' | 'en'): string {
  const lines = lang === 'en' ? [
    `*New Booking Request${bookingId ? ` — ${bookingId}` : ''}*`,
    booking.name ? `Name: ${booking.name}` : null,
    booking.tour ? `Tour: ${booking.tour}` : null,
    booking.date ? `Date: ${booking.date}` : null,
    booking.people ? `People: ${booking.people}` : null,
    booking.pickup ? `Pickup: ${booking.pickup}` : null,
    booking.phone ? `Phone: ${booking.phone}` : null,
    '',
    'Hi! I want to confirm this booking. Thank you 🙏',
  ] : [
    `*Permintaan Booking${bookingId ? ` — ${bookingId}` : ''}*`,
    booking.name ? `Nama: ${booking.name}` : null,
    booking.tour ? `Tour: ${booking.tour}` : null,
    booking.date ? `Tanggal: ${booking.date}` : null,
    booking.people ? `Jumlah orang: ${booking.people}` : null,
    booking.pickup ? `Lokasi jemput: ${booking.pickup}` : null,
    booking.phone ? `Nomor HP: ${booking.phone}` : null,
    '',
    'Halo! Saya ingin konfirmasi booking ini. Terima kasih 🙏',
  ];

  const text = lines.filter(Boolean).join('\n');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function ChatWidget() {
  const { lang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: lang === 'en'
          ? `Hi there! 🌴 Welcome to Lombok Nusa Alam Tour & Travel. I'm your AI assistant — ask me anything about our tours, prices, itineraries, or how to book!`
          : `Halo! 🌴 Selamat datang di Lombok Nusa Alam Tour & Travel. Saya AI assistant — tanya apa saja tentang tour, harga, rute, atau cara booking!`,
      }]);
    }
  }, [lang, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          lang,
        }),
      });

      const data = await res.json();
      setMessages([...newMessages, {
        role: 'assistant',
        content: data.reply || (lang === 'en' ? 'Sorry, no response.' : 'Maaf, tidak ada respons.'),
        booking: data.booking || null,
        bookingId: data.bookingId || null,
      }]);
    } catch {
      setMessages([...newMessages, {
        role: 'assistant',
        content: lang === 'en'
          ? 'Connection issue. Please try again or WhatsApp us: +62 821-4332-571'
          : 'Gangguan koneksi. Coba lagi atau WhatsApp: +62 821-4332-571',
      }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-5 sm:right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 text-navy-900 shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
          aria-label={t('Buka chat AI', 'Open AI chat')}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white animate-pulse" />
          <span className="absolute right-full mr-3 whitespace-nowrap bg-navy-900 text-white text-[12px] font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {t('Tanya AI Assistant', 'Ask AI Assistant')}
          </span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2.5rem)] sm:w-[400px] max-w-[400px] h-[600px] max-h-[calc(100vh-3rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
          <div className="bg-gradient-to-r from-navy-900 to-navy-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center text-navy-900 font-bold">
                LNA
              </div>
              <div>
                <p className="font-semibold text-[14px]">Lombok Nusa Alam</p>
                <p className="text-[11px] text-white/60 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  {t('AI Assistant • Online', 'AI Assistant • Online')}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              aria-label={t('Tutup', 'Close')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-2' : ''}`}>
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-navy-900 text-white rounded-br-md'
                        : 'bg-white text-navy-900 rounded-bl-md shadow-sm border border-slate-100'
                    }`}
                  >
                    {msg.content}
                  </div>

                  {msg.booking && (
                    <a
                      href={buildWhatsAppUrl(msg.booking, msg.bookingId || null, lang)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white text-[13px] font-semibold rounded-xl transition-colors shadow-md"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      {t('Kirim ke WhatsApp', 'Send to WhatsApp')}
                    </a>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-slate-100 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-gold-400" />
                  <span className="text-[13px] text-navy-900/60">
                    {t('AI sedang mengetik...', 'AI is typing...')}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 p-3 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex gap-2 items-end"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('Tanya tentang tour, harga, atau booking...', 'Ask about tours, prices, or booking...')}
                disabled={loading}
                maxLength={2000}
                className="flex-1 px-4 py-2.5 rounded-full bg-slate-100 text-[14px] text-navy-900 placeholder:text-navy-900/40 outline-none focus:ring-2 focus:ring-gold-400 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-11 h-11 rounded-full bg-gold-400 hover:bg-gold-500 text-navy-900 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label={t('Kirim', 'Send')}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-navy-900/40 text-center mt-2">
              {t('Layanan 24 jam Lombok Nusa Alam', '24/7 Service by Lombok Nusa Alam')}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
