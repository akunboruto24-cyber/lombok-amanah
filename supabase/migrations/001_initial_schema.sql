-- ============================================================
-- LOMBOK NUSA ALAM TOUR & TRAVEL — DATABASE SCHEMA
-- Version 1.0
-- ============================================================

-- SETTINGS (site config, contact info, social links)
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- LANGUAGES
CREATE TABLE languages (
  code TEXT PRIMARY KEY,        -- 'id', 'en'
  name TEXT NOT NULL,
  flag TEXT,                    -- emoji flag
  is_default BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0
);

-- CURRENCIES
CREATE TABLE currencies (
  code TEXT PRIMARY KEY,        -- 'IDR', 'USD'
  name TEXT NOT NULL,
  symbol TEXT NOT NULL,
  rate_to_idr NUMERIC(15,4) DEFAULT 1,
  is_default BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE
);

-- DESTINATIONS (master — setiap destinasi SATU KALI)
CREATE TABLE destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,       -- 'beach','waterfall','culture','mountain','island','city'
  location TEXT,
  latitude NUMERIC(10,7),
  longitude NUMERIC(10,7),
  opening_hours TEXT,
  entrance_fee TEXT,
  cover_image TEXT,
  gallery TEXT[],               -- array of image URLs
  seo_title TEXT,
  seo_description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- VEHICLES
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  photo TEXT,
  seat_capacity INT NOT NULL,
  luggage_capacity INT DEFAULT 0,
  daily_price NUMERIC(12,0),
  description TEXT,
  features TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- DRIVERS
CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  photo TEXT,
  license_number TEXT,
  languages TEXT[],
  experience_years INT DEFAULT 0,
  rating NUMERIC(2,1) DEFAULT 5.0,
  total_trips INT DEFAULT 0,
  fee_per_trip NUMERIC(12,0),
  bank_name TEXT,
  bank_account TEXT,
  status TEXT DEFAULT 'available',  -- 'available','busy','off'
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TOUR PACKAGES
CREATE TABLE tour_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,       -- 'daily_tour','airport_transfer','car_charter','custom_tour','multi_day'
  price NUMERIC(12,0) NOT NULL,
  price_usd NUMERIC(8,2),
  duration TEXT,                -- '8-10 jam'
  meeting_time TEXT,            -- '08:00'
  finish_time TEXT,             -- '17:00'
  max_passenger INT DEFAULT 4,
  cover_image TEXT,
  gallery TEXT[],
  description TEXT,
  description_en TEXT,
  itinerary JSONB,             -- [{time:'08:00', activity:'Pickup Hotel'}, ...]
  includes TEXT[],
  excludes TEXT[],
  additional_info TEXT,
  cancellation_policy TEXT,
  status TEXT DEFAULT 'active', -- 'active','draft','archived'
  is_featured BOOLEAN DEFAULT FALSE,
  is_popular BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TOUR ↔ DESTINATION (many-to-many)
CREATE TABLE tour_destinations (
  tour_id UUID REFERENCES tour_packages(id) ON DELETE CASCADE,
  destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
  visit_order INT DEFAULT 0,
  PRIMARY KEY (tour_id, destination_id)
);

-- TOUR ↔ VEHICLE (which vehicles can be used)
CREATE TABLE tour_vehicles (
  tour_id UUID REFERENCES tour_packages(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
  price_override NUMERIC(12,0),  -- NULL = use package price
  PRIMARY KEY (tour_id, vehicle_id)
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
  booking_code TEXT UNIQUE NOT NULL,  -- 'LAT-20260804-001'
  customer_id UUID REFERENCES customers(id),
  tour_id UUID REFERENCES tour_packages(id),
  vehicle_id UUID REFERENCES vehicles(id),
  driver_id UUID REFERENCES drivers(id),
  booking_date DATE NOT NULL,
  pickup_time TIME,
  pickup_location TEXT,
  passenger_count INT DEFAULT 1,
  special_request TEXT,
  -- pricing
  package_price NUMERIC(12,0),
  driver_fee NUMERIC(12,0),
  fuel_cost NUMERIC(12,0),
  parking_cost NUMERIC(12,0),
  operational_cost NUMERIC(12,0),
  discount NUMERIC(12,0) DEFAULT 0,
  total_price NUMERIC(12,0),
  deposit_amount NUMERIC(12,0),
  remaining_amount NUMERIC(12,0),
  -- status
  status TEXT DEFAULT 'pending', -- 'pending','confirmed','assigned','running','completed','cancelled'
  payment_status TEXT DEFAULT 'unpaid', -- 'unpaid','deposit_paid','fully_paid','refunded'
  -- meta
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PAYMENTS
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  amount NUMERIC(12,0) NOT NULL,
  method TEXT,                  -- 'bank_transfer','qris','credit_card','paypal','cash'
  payment_type TEXT,            -- 'deposit','remaining','full'
  status TEXT DEFAULT 'pending', -- 'pending','success','failed','refunded'
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
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  photos TEXT[],
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- GALLERY
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  image_url TEXT NOT NULL,
  category TEXT,               -- 'tour','destination','vehicle','team'
  tour_id UUID REFERENCES tour_packages(id),
  destination_id UUID REFERENCES destinations(id),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROMOS
CREATE TABLE promos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  discount_type TEXT NOT NULL,  -- 'percentage','fixed'
  discount_value NUMERIC(12,2) NOT NULL,
  min_booking NUMERIC(12,0),
  max_discount NUMERIC(12,0),
  valid_from DATE,
  valid_until DATE,
  usage_limit INT,
  usage_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- FAQ
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

-- BLOG (future)
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  cover_image TEXT,
  author TEXT,
  status TEXT DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX idx_tour_packages_category ON tour_packages(category);
CREATE INDEX idx_tour_packages_status ON tour_packages(status);
CREATE INDEX idx_tour_packages_slug ON tour_packages(slug);
CREATE INDEX idx_destinations_category ON destinations(category);
CREATE INDEX idx_destinations_slug ON destinations(slug);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_reviews_tour ON reviews(tour_id);
CREATE INDEX idx_reviews_approved ON reviews(is_approved);
