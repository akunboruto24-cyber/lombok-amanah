'use client';

import { useState, useEffect } from 'react';
import { Star, User, Loader2, CheckCircle } from 'lucide-react';
import { T, useLanguage } from '@/lib/language';
import type { Review } from '@/types/database';

interface Props {
  tourId: string;
  seedReviews: Review[];
}

export function ReviewSection({ tourId, seedReviews }: Props) {
  const { t, lang } = useLanguage();
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [form, setForm] = useState({ name: '', country: '', rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    fetch(`/api/reviews?tour_id=${encodeURIComponent(tourId)}`)
      .then(r => r.ok ? r.json() : { reviews: [] })
      .then(d => setUserReviews(d.reviews || []))
      .catch(() => setUserReviews([]));
  }, [tourId]);

  const allReviews = [...userReviews, ...seedReviews];
  const avgRating = allReviews.length > 0
    ? allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length
    : 0;

  async function submitReview(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (form.name.trim().length < 2) {
      setError(t('Nama minimal 2 karakter', 'Name must be at least 2 characters'));
      return;
    }
    if (form.comment.trim().length < 10) {
      setError(t('Komentar minimal 10 karakter', 'Comment must be at least 10 characters'));
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tour_id: tourId, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal mengirim');

      setUserReviews([data.review, ...userReviews]);
      setForm({ name: '', country: '', rating: 5, comment: '' });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('Gagal mengirim komentar', 'Failed to submit'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="reviews">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-xl font-display font-bold text-navy-900">
          <T en="Customer Reviews">Review Pelanggan</T>
          <span className="text-[13px] font-normal text-navy-900/40 ml-2">({allReviews.length})</span>
        </h2>
        {avgRating > 0 && (
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
            <span className="text-[14px] font-bold text-navy-900">{avgRating.toFixed(1)}</span>
          </div>
        )}
      </div>

      <div className="space-y-3 mb-8">
        {allReviews.length === 0 ? (
          <p className="text-center text-navy-900/40 text-[14px] py-8">
            <T en="No reviews yet. Be the first to share your experience!">
              Belum ada review. Jadilah yang pertama berbagi pengalaman!
            </T>
          </p>
        ) : (
          allReviews.slice(0, 10).map((review) => (
            <div key={review.id} className="p-4 sm:p-5 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-gold-400 text-gold-400' : 'text-navy-900/15'}`}
                  />
                ))}
              </div>
              <p className="text-[14px] text-navy-900/70 leading-[1.7] mb-3">{review.comment}</p>
              <p className="text-[12px] font-semibold text-navy-900">
                {review.customer?.name || 'Anonymous'}
                {review.customer?.country && (
                  <span className="font-normal text-navy-900/40"> — {review.customer.country}</span>
                )}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="rounded-2xl border border-navy-900/10 bg-white p-5 sm:p-6">
        <h3 className="text-[15px] font-bold text-navy-900 mb-1">
          <T en="Share Your Experience">Bagikan Pengalaman Anda</T>
        </h3>
        <p className="text-[12px] text-navy-900/50 mb-5">
          <T en="Let other travelers know how your experience was.">
            Beritahu wisatawan lain tentang pengalaman Anda.
          </T>
        </p>

        <form onSubmit={submitReview} className="space-y-4">
          <div>
            <label className="block text-[12px] font-semibold text-navy-900/70 mb-2">
              <T en="Your Rating">Rating Anda</T>
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setForm({ ...form, rating: star })}
                  className="p-0.5 hover:scale-110 transition-transform"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    className={`w-7 h-7 transition-colors ${
                      star <= (hoverRating || form.rating)
                        ? 'fill-gold-400 text-gold-400'
                        : 'text-navy-900/15'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-[13px] font-semibold text-navy-900/60">
                {form.rating}.0
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-semibold text-navy-900/70 mb-1.5">
                <T en="Your Name *">Nama Anda *</T>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                maxLength={60}
                placeholder={t('John Doe', 'John Doe')}
                className="w-full px-3 py-2.5 bg-slate-50 border border-navy-900/10 rounded-lg text-[14px] text-navy-900 outline-none focus:ring-2 focus:ring-gold-400/40"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-navy-900/70 mb-1.5">
                <T en="Country">Negara</T>
              </label>
              <input
                type="text"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                maxLength={40}
                placeholder={t('Indonesia', 'e.g. Australia')}
                className="w-full px-3 py-2.5 bg-slate-50 border border-navy-900/10 rounded-lg text-[14px] text-navy-900 outline-none focus:ring-2 focus:ring-gold-400/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-navy-900/70 mb-1.5">
              <T en="Your Review *">Komentar Anda *</T>
            </label>
            <textarea
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              required
              minLength={10}
              maxLength={800}
              rows={4}
              placeholder={t(
                'Ceritakan pengalaman Anda mengikuti tour ini...',
                'Tell us about your experience with this tour...'
              )}
              className="w-full px-3 py-2.5 bg-slate-50 border border-navy-900/10 rounded-lg text-[14px] text-navy-900 outline-none focus:ring-2 focus:ring-gold-400/40 resize-none"
            />
            <p className="text-[11px] text-navy-900/40 mt-1 text-right">
              {form.comment.length}/800
            </p>
          </div>

          {error && (
            <div className="px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-[12px]">{error}</p>
            </div>
          )}

          {success && (
            <div className="px-3 py-2 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <p className="text-green-700 text-[12px]">
                <T en="Thank you! Your review has been posted.">
                  Terima kasih! Review Anda telah dikirim.
                </T>
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto px-6 py-3 bg-navy-900 text-white text-[14px] font-semibold rounded-xl hover:bg-navy-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <T en="Sending...">Mengirim...</T>
              </>
            ) : (
              <>
                <User className="w-4 h-4" />
                <T en="Submit Review">Kirim Review</T>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
