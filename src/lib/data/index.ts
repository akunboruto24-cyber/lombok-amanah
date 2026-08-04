import { tourPackages, destinations, vehicles, faqs, reviews, siteSettings } from './seed';
import type { TourPackage, Destination, Vehicle, FAQ, Review, TourCategory, SiteSettings } from '@/types/database';

// ============================================================
// DATA ACCESS LAYER
// Semua halaman memanggil fungsi di sini.
// Saat migrasi ke Supabase, cukup ganti isi fungsi ini.
// Halaman TIDAK PERLU diubah.
// ============================================================

// -- SETTINGS --
export async function getSettings(): Promise<SiteSettings> {
  return siteSettings;
}

// -- TOUR PACKAGES --
export async function getTourPackages(options?: {
  category?: TourCategory;
  featured?: boolean;
  popular?: boolean;
  limit?: number;
}): Promise<TourPackage[]> {
  let result = tourPackages.filter(t => t.status === 'active');

  if (options?.category) result = result.filter(t => t.category === options.category);
  if (options?.featured) result = result.filter(t => t.is_featured);
  if (options?.popular) result = result.filter(t => t.is_popular);

  result.sort((a, b) => a.display_order - b.display_order);

  if (options?.limit) result = result.slice(0, options.limit);

  return result.map(t => ({
    ...t,
    review_count: reviews.filter(r => r.tour_id === t.id && r.is_approved).length,
    average_rating: calcAvgRating(t.id),
  }));
}

export async function getTourBySlug(slug: string): Promise<TourPackage | null> {
  const tour = tourPackages.find(t => t.slug === slug && t.status === 'active');
  if (!tour) return null;
  return {
    ...tour,
    reviews: reviews.filter(r => r.tour_id === tour.id && r.is_approved),
    review_count: reviews.filter(r => r.tour_id === tour.id && r.is_approved).length,
    average_rating: calcAvgRating(tour.id),
  };
}

export async function getTourCategories(): Promise<{ category: TourCategory; count: number }[]> {
  const cats = new Map<TourCategory, number>();
  tourPackages.filter(t => t.status === 'active').forEach(t => {
    cats.set(t.category, (cats.get(t.category) || 0) + 1);
  });
  return Array.from(cats, ([category, count]) => ({ category, count }));
}

// -- DESTINATIONS --
export async function getDestinations(options?: {
  category?: string;
  limit?: number;
}): Promise<Destination[]> {
  let result = destinations.filter(d => d.is_active);

  if (options?.category) result = result.filter(d => d.category === options.category);

  result.sort((a, b) => a.display_order - b.display_order);

  if (options?.limit) result = result.slice(0, options.limit);

  return result;
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  return destinations.find(d => d.slug === slug && d.is_active) || null;
}

export async function getDestinationCategories(): Promise<string[]> {
  const cats = new Set<string>();
  destinations.filter(d => d.is_active).forEach(d => cats.add(d.category));
  return Array.from(cats);
}

// -- VEHICLES --
export async function getVehicles(): Promise<Vehicle[]> {
  return vehicles.filter(v => v.is_active).sort((a, b) => a.display_order - b.display_order);
}

// -- FAQ --
export async function getFAQs(category?: string): Promise<FAQ[]> {
  let result = faqs.filter(f => f.is_active);
  if (category) result = result.filter(f => f.category === category);
  return result.sort((a, b) => a.display_order - b.display_order);
}

// -- REVIEWS --
export async function getReviews(options?: {
  tour_id?: string;
  limit?: number;
}): Promise<Review[]> {
  let result = reviews.filter(r => r.is_approved);

  if (options?.tour_id) result = result.filter(r => r.tour_id === options.tour_id);

  result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  if (options?.limit) result = result.slice(0, options.limit);

  return result;
}

// -- HELPERS --
function calcAvgRating(tourId: string): number {
  const tourReviews = reviews.filter(r => r.tour_id === tourId && r.is_approved);
  if (tourReviews.length === 0) return 5;
  return Math.round((tourReviews.reduce((sum, r) => sum + r.rating, 0) / tourReviews.length) * 10) / 10;
}

// -- FORMAT HELPERS --
export function formatPrice(price: number, currency = 'IDR'): string {
  if (currency === 'USD') return `$${price}`;
  return `Rp ${price.toLocaleString('id-ID')}`;
}

export function formatWhatsAppLink(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
