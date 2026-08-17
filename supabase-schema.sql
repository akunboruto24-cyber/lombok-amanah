-- ============================================================
-- LOMBOK NUSA ALAM — Supabase Schema
-- Jalankan di Supabase SQL Editor
-- ============================================================

-- DESTINATIONS
CREATE TABLE destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'beach',
  location TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  opening_hours TEXT,
  entrance_fee TEXT,
  cover_image TEXT,
  gallery TEXT[] DEFAULT '{}',
  seo_title TEXT,
  seo_description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- VEHICLES
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  photo TEXT,
  seat_capacity INTEGER NOT NULL DEFAULT 4,
  luggage_capacity INTEGER DEFAULT 2,
  daily_price INTEGER,
  description TEXT,
  features TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- DRIVERS
CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  photo TEXT,
  license_number TEXT,
  languages TEXT[] DEFAULT '{id}',
  experience_years INTEGER DEFAULT 0,
  rating NUMERIC(2,1) DEFAULT 5.0,
  total_trips INTEGER DEFAULT 0,
  fee_per_trip INTEGER,
  status TEXT DEFAULT 'available' CHECK (status IN ('available','busy','off')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TOUR PACKAGES
CREATE TABLE tour_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'daily_tour',
  price INTEGER NOT NULL,
  price_usd INTEGER,
  duration TEXT,
  meeting_time TEXT,
  finish_time TEXT,
  max_passenger INTEGER DEFAULT 4,
  cover_image TEXT,
  gallery TEXT[] DEFAULT '{}',
  description TEXT,
  description_en TEXT,
  itinerary JSONB,
  includes TEXT[] DEFAULT '{}',
  excludes TEXT[] DEFAULT '{}',
  additional_info TEXT,
  cancellation_policy TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active','draft','archived')),
  is_featured BOOLEAN DEFAULT FALSE,
  is_popular BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TOUR ↔ DESTINATION (many-to-many)
CREATE TABLE tour_destinations (
  tour_id UUID REFERENCES tour_packages(id) ON DELETE CASCADE,
  destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  PRIMARY KEY (tour_id, destination_id)
);

-- CUSTOMERS
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  country TEXT,
  language TEXT DEFAULT 'id',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- BOOKINGS
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_code TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id),
  tour_id UUID REFERENCES tour_packages(id),
  vehicle_id UUID REFERENCES vehicles(id),
  driver_id UUID REFERENCES drivers(id),
  booking_date DATE NOT NULL,
  pickup_time TEXT,
  pickup_location TEXT,
  destination_location TEXT,
  passenger_count INTEGER DEFAULT 1,
  special_request TEXT,
  package_price INTEGER,
  driver_fee INTEGER,
  fuel_cost INTEGER,
  parking_cost INTEGER,
  operational_cost INTEGER,
  discount INTEGER DEFAULT 0,
  total_price INTEGER,
  deposit_amount INTEGER,
  remaining_amount INTEGER,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','assigned','running','completed','cancelled')),
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid','deposit_paid','fully_paid','refunded')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PAYMENTS
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  method TEXT CHECK (method IN ('bank_transfer','qris','credit_card','paypal','cash')),
  payment_type TEXT CHECK (payment_type IN ('deposit','remaining','full')),
  status TEXT DEFAULT 'pending',
  transaction_id TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- REVIEWS
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id),
  customer_id UUID REFERENCES customers(id),
  tour_id UUID REFERENCES tour_packages(id),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  photos TEXT[] DEFAULT '{}',
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- FAQ
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SITE SETTINGS (single row)
CREATE TABLE site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  site_name TEXT DEFAULT 'Lombok Nusa Alam Tour & Travel',
  tagline TEXT DEFAULT 'Tour And Travel',
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  address TEXT,
  instagram TEXT,
  facebook TEXT,
  google_maps TEXT,
  logo TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROMOS
CREATE TABLE promos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  discount_type TEXT DEFAULT 'percentage' CHECK (discount_type IN ('percentage','fixed')),
  discount_value INTEGER NOT NULL,
  min_booking INTEGER,
  max_discount INTEGER,
  valid_from TIMESTAMPTZ,
  valid_until TIMESTAMPTZ,
  usage_limit INTEGER,
  usage_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-generate booking_code
CREATE OR REPLACE FUNCTION generate_booking_code()
RETURNS TRIGGER AS $$
BEGIN
  NEW.booking_code := 'LA-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_booking_code
  BEFORE INSERT ON bookings
  FOR EACH ROW
  WHEN (NEW.booking_code IS NULL OR NEW.booking_code = '')
  EXECUTE FUNCTION generate_booking_code();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_drivers_updated_at BEFORE UPDATE ON drivers FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_destinations_updated_at BEFORE UPDATE ON destinations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_tour_packages_updated_at BEFORE UPDATE ON tour_packages FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS (Row Level Security)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;

-- Public read untuk data publik
CREATE POLICY "Public read destinations" ON destinations FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read vehicles" ON vehicles FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read tours" ON tour_packages FOR SELECT USING (status = 'active');
CREATE POLICY "Public read faqs" ON faqs FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read approved reviews" ON reviews FOR SELECT USING (is_approved = TRUE);
CREATE POLICY "Public read settings" ON site_settings FOR SELECT USING (TRUE);
CREATE POLICY "Public read promos" ON promos FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read tour_destinations" ON tour_destinations FOR SELECT USING (TRUE);

-- Service role full access (admin via server)
CREATE POLICY "Service full access bookings" ON bookings FOR ALL USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "Service full access customers" ON customers FOR ALL USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "Service full access payments" ON payments FOR ALL USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "Service full access drivers" ON drivers FOR ALL USING (TRUE) WITH CHECK (TRUE);

-- Enable RLS on public tables too
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tour_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE promos ENABLE ROW LEVEL SECURITY;
ALTER TABLE tour_destinations ENABLE ROW LEVEL SECURITY;

-- Index untuk performa
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_driver ON bookings(driver_id);
CREATE INDEX idx_tours_category ON tour_packages(category);
CREATE INDEX idx_destinations_category ON destinations(category);
CREATE INDEX idx_drivers_status ON drivers(status);
