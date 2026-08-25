export type TourCategory = 'daily_tour' | 'airport_transfer' | 'car_charter' | 'custom_tour' | 'multi_day';
export type TourStatus = 'active' | 'draft' | 'archived';
export type BookingStatus = 'pending' | 'confirmed' | 'assigned' | 'running' | 'completed' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'deposit_paid' | 'fully_paid' | 'refunded';
export type PaymentMethod = 'bank_transfer' | 'qris' | 'credit_card' | 'paypal' | 'cash';
export type DriverStatus = 'available' | 'busy' | 'off';
export type DestinationCategory = 'beach' | 'waterfall' | 'culture' | 'mountain' | 'island' | 'city';

export interface Destination {
  id: string;
  slug: string;
  name: string;
  name_en: string;
  description: string | null;
  description_en: string | null;
  category: DestinationCategory;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  opening_hours: string | null;
  entrance_fee: string | null;
  cover_image: string | null;
  gallery: string[];
  seo_title: string | null;
  seo_description: string | null;
  is_active: boolean;
  display_order: number;
}

export interface Vehicle {
  id: string;
  name: string;
  slug: string;
  photo: string | null;
  seat_capacity: number;
  luggage_capacity: number;
  daily_price: number | null;
  description: string | null;
  description_en: string | null;
  features: string[];
  is_active: boolean;
  display_order: number;
}

export interface Driver {
  id: string;
  name: string;
  phone: string | null;
  photo: string | null;
  license_number: string | null;
  languages: string[];
  experience_years: number;
  rating: number;
  total_trips: number;
  fee_per_trip: number | null;
  status: DriverStatus;
  is_active: boolean;
}

export interface TourPackage {
  id: string;
  slug: string;
  name: string;
  name_en: string;
  category: TourCategory;
  price: number;
  price_usd: number | null;
  duration: string | null;
  meeting_time: string | null;
  finish_time: string | null;
  max_passenger: number;
  cover_image: string | null;
  gallery: string[];
  description: string | null;
  description_en: string | null;
  itinerary: ItineraryItem[] | null;
  includes: string[];
  includes_en: string[];
  excludes: string[];
  excludes_en: string[];
  additional_info: string | null;
  additional_info_en: string | null;
  cancellation_policy: string | null;
  status: TourStatus;
  is_featured: boolean;
  is_popular: boolean;
  display_order: number;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[];
  price_per_person?: boolean;
  price_tiers?: PriceTier[] | null;
  is_multi_day?: boolean;
  total_days?: number | null;
  // joined data
  destinations?: Destination[];
  vehicles?: Vehicle[];
  reviews?: Review[];
  review_count?: number;
  average_rating?: number;
}

export interface ItineraryItem {
  time: string;
  activity: string;
  activity_en: string;
  day?: number;
  day_title?: string;
  day_title_en?: string;
}

export interface PriceTier {
  label: string;
  label_en: string;
  price_per_person: number;
  min_pax: number;
  max_pax: number | null;
}

export interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  country: string | null;
  language: string;
}

export interface Booking {
  id: string;
  booking_code: string;
  customer_id: string;
  tour_id: string;
  vehicle_id: string | null;
  driver_id: string | null;
  booking_date: string;
  pickup_time: string | null;
  pickup_location: string | null;
  passenger_count: number;
  special_request: string | null;
  package_price: number | null;
  driver_fee: number | null;
  fuel_cost: number | null;
  parking_cost: number | null;
  operational_cost: number | null;
  discount: number;
  total_price: number | null;
  deposit_amount: number | null;
  remaining_amount: number | null;
  status: BookingStatus;
  payment_status: PaymentStatus;
  notes: string | null;
  // joined
  customer?: Customer;
  tour?: TourPackage;
  vehicle?: Vehicle;
  driver?: Driver;
}

export interface Payment {
  id: string;
  booking_id: string;
  amount: number;
  method: PaymentMethod | null;
  payment_type: 'deposit' | 'remaining' | 'full' | null;
  status: string;
  transaction_id: string | null;
  paid_at: string | null;
}

export interface Review {
  id: string;
  booking_id: string | null;
  customer_id: string | null;
  tour_id: string | null;
  rating: number;
  comment: string | null;
  photos: string[];
  is_approved: boolean;
  created_at: string;
  customer?: Customer;
  tour?: TourPackage;
}

export interface Promo {
  id: string;
  code: string;
  title: string;
  description: string | null;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_booking: number | null;
  max_discount: number | null;
  valid_from: string | null;
  valid_until: string | null;
  usage_limit: number | null;
  usage_count: number;
  is_active: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  question_en: string;
  answer: string;
  answer_en: string;
  category: string | null;
  display_order: number;
  is_active: boolean;
}

export interface GalleryItem {
  id: string;
  title: string | null;
  image_url: string;
  category: string | null;
  tour_id: string | null;
  destination_id: string | null;
  display_order: number;
  is_active: boolean;
}

export interface SiteSettings {
  site_name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
  google_maps: string;
  logo: string;
}
