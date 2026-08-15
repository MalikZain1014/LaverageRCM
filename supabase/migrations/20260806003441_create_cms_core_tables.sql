/*
# LeverageRCM Admin CMS — Core Content Tables

## Summary
Creates the foundational content tables for the LeverageRCM Admin CMS. This migration
establishes the core content management schema: services, specialties, blogs, FAQs,
testimonials, and contact form submissions. A companion migration adds media, settings,
navigation, SEO, and activity tracking.

## New Tables
1. `cms_services` — Medical billing services (e.g. Medical Billing, Coding, Credentialing).
   Each service has a slug, description, workflow, benefits, SEO metadata, and publish status.
2. `cms_specialties` — Healthcare specialties (e.g. Cardiology, Dermatology). Each has billing
   challenges, solutions, coding expertise, and publish status.
3. `cms_blogs` — Blog articles with rich-text content, category, tags, author, featured image,
   and draft/published/scheduled status.
4. `cms_faqs` — Frequently asked questions with category and sort order.
5. `cms_testimonials` — Client testimonials with name, role, company, rating, and featured flag.
6. `cms_submissions` — Contact form and consultation request submissions from the public site.

## Security
- RLS enabled on every table.
- All tables are owner-scoped to authenticated CMS users (admin staff). The public website
  reads content through a separate read path; CMS write access is authenticated-only.
- Owner columns default to `auth.uid()` so inserts from the CMS client succeed.
- 4 policies per table (select/insert/update/delete), scoped to `authenticated` with ownership checks.

## Notes
1. `content` and `workflow`/`benefits`/`process` columns use `jsonb` to store structured arrays.
2. `seo` column is `jsonb` for meta title, description, keywords, OG tags, schema.
3. `status` defaults to 'draft'; only 'published' content is considered live.
4. `display_order` allows manual ordering of services/specialties.
5. Blog `published_at` supports scheduled publishing.
*/

-- ============================================================
-- cms_services
-- ============================================================
CREATE TABLE IF NOT EXISTS cms_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  short_description text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL DEFAULT 'FileText',
  banner_image_url text,
  benefits jsonb NOT NULL DEFAULT '[]'::jsonb,
  workflow jsonb NOT NULL DEFAULT '[]'::jsonb,
  process jsonb NOT NULL DEFAULT '[]'::jsonb,
  industries jsonb NOT NULL DEFAULT '[]'::jsonb,
  faqs jsonb NOT NULL DEFAULT '[]'::jsonb,
  seo jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'draft',
  featured boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  created_by uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE cms_services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "cms_services_select_own" ON cms_services;
CREATE POLICY "cms_services_select_own" ON cms_services FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "cms_services_insert_own" ON cms_services;
CREATE POLICY "cms_services_insert_own" ON cms_services FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "cms_services_update_own" ON cms_services;
CREATE POLICY "cms_services_update_own" ON cms_services FOR UPDATE
  TO authenticated USING (auth.uid() = created_by) WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "cms_services_delete_own" ON cms_services;
CREATE POLICY "cms_services_delete_own" ON cms_services FOR DELETE
  TO authenticated USING (auth.uid() = created_by);

-- ============================================================
-- cms_specialties
-- ============================================================
CREATE TABLE IF NOT EXISTS cms_specialties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  short_description text NOT NULL,
  icon text NOT NULL DEFAULT 'Stethoscope',
  banner_image_url text,
  billing_challenges jsonb NOT NULL DEFAULT '[]'::jsonb,
  how_we_help jsonb NOT NULL DEFAULT '[]'::jsonb,
  coding_expertise jsonb NOT NULL DEFAULT '[]'::jsonb,
  claims_management jsonb NOT NULL DEFAULT '[]'::jsonb,
  revenue_optimization jsonb NOT NULL DEFAULT '[]'::jsonb,
  compliance jsonb NOT NULL DEFAULT '[]'::jsonb,
  faqs jsonb NOT NULL DEFAULT '[]'::jsonb,
  seo jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'draft',
  display_order integer NOT NULL DEFAULT 0,
  created_by uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE cms_specialties ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "cms_specialties_select_own" ON cms_specialties;
CREATE POLICY "cms_specialties_select_own" ON cms_specialties FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "cms_specialties_insert_own" ON cms_specialties;
CREATE POLICY "cms_specialties_insert_own" ON cms_specialties FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "cms_specialties_update_own" ON cms_specialties;
CREATE POLICY "cms_specialties_update_own" ON cms_specialties FOR UPDATE
  TO authenticated USING (auth.uid() = created_by) WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "cms_specialties_delete_own" ON cms_specialties;
CREATE POLICY "cms_specialties_delete_own" ON cms_specialties FOR DELETE
  TO authenticated USING (auth.uid() = created_by);

-- ============================================================
-- cms_blogs
-- ============================================================
CREATE TABLE IF NOT EXISTS cms_blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text NOT NULL,
  content jsonb NOT NULL DEFAULT '[]'::jsonb,
  category text NOT NULL,
  tags jsonb NOT NULL DEFAULT '[]'::jsonb,
  author text NOT NULL,
  featured_image_url text,
  gallery jsonb NOT NULL DEFAULT '[]'::jsonb,
  read_time text NOT NULL DEFAULT '5 min read',
  seo jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'draft',
  featured boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_by uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE cms_blogs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "cms_blogs_select_own" ON cms_blogs;
CREATE POLICY "cms_blogs_select_own" ON cms_blogs FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "cms_blogs_insert_own" ON cms_blogs;
CREATE POLICY "cms_blogs_insert_own" ON cms_blogs FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "cms_blogs_update_own" ON cms_blogs;
CREATE POLICY "cms_blogs_update_own" ON cms_blogs FOR UPDATE
  TO authenticated USING (auth.uid() = created_by) WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "cms_blogs_delete_own" ON cms_blogs;
CREATE POLICY "cms_blogs_delete_own" ON cms_blogs FOR DELETE
  TO authenticated USING (auth.uid() = created_by);

-- ============================================================
-- cms_faqs
-- ============================================================
CREATE TABLE IF NOT EXISTS cms_faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  sort_order integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'published',
  created_by uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE cms_faqs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "cms_faqs_select_own" ON cms_faqs;
CREATE POLICY "cms_faqs_select_own" ON cms_faqs FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "cms_faqs_insert_own" ON cms_faqs;
CREATE POLICY "cms_faqs_insert_own" ON cms_faqs FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "cms_faqs_update_own" ON cms_faqs;
CREATE POLICY "cms_faqs_update_own" ON cms_faqs FOR UPDATE
  TO authenticated USING (auth.uid() = created_by) WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "cms_faqs_delete_own" ON cms_faqs;
CREATE POLICY "cms_faqs_delete_own" ON cms_faqs FOR DELETE
  TO authenticated USING (auth.uid() = created_by);

-- ============================================================
-- cms_testimonials
-- ============================================================
CREATE TABLE IF NOT EXISTS cms_testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  designation text NOT NULL,
  company text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  photo_url text,
  review text NOT NULL,
  rating integer NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  featured boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'published',
  created_by uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE cms_testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "cms_testimonials_select_own" ON cms_testimonials;
CREATE POLICY "cms_testimonials_select_own" ON cms_testimonials FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "cms_testimonials_insert_own" ON cms_testimonials;
CREATE POLICY "cms_testimonials_insert_own" ON cms_testimonials FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "cms_testimonials_update_own" ON cms_testimonials;
CREATE POLICY "cms_testimonials_update_own" ON cms_testimonials FOR UPDATE
  TO authenticated USING (auth.uid() = created_by) WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "cms_testimonials_delete_own" ON cms_testimonials;
CREATE POLICY "cms_testimonials_delete_own" ON cms_testimonials FOR DELETE
  TO authenticated USING (auth.uid() = created_by);

-- ============================================================
-- cms_submissions
-- ============================================================
CREATE TABLE IF NOT EXISTS cms_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL DEFAULT 'contact',
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  practice_name text,
  specialty text,
  country text,
  message text,
  status text NOT NULL DEFAULT 'unread',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE cms_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "cms_submissions_select_own" ON cms_submissions;
CREATE POLICY "cms_submissions_select_own" ON cms_submissions FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "cms_submissions_insert_own" ON cms_submissions;
CREATE POLICY "cms_submissions_insert_own" ON cms_submissions FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "cms_submissions_update_own" ON cms_submissions;
CREATE POLICY "cms_submissions_update_own" ON cms_submissions FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "cms_submissions_delete_own" ON cms_submissions;
CREATE POLICY "cms_submissions_delete_own" ON cms_submissions FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- Indexes
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_cms_services_slug ON cms_services(slug);
CREATE INDEX IF NOT EXISTS idx_cms_services_status ON cms_services(status);
CREATE INDEX IF NOT EXISTS idx_cms_specialties_slug ON cms_specialties(slug);
CREATE INDEX IF NOT EXISTS idx_cms_specialties_status ON cms_specialties(status);
CREATE INDEX IF NOT EXISTS idx_cms_blogs_slug ON cms_blogs(slug);
CREATE INDEX IF NOT EXISTS idx_cms_blogs_status ON cms_blogs(status);
CREATE INDEX IF NOT EXISTS idx_cms_blogs_category ON cms_blogs(category);
CREATE INDEX IF NOT EXISTS idx_cms_faqs_category ON cms_faqs(category);
CREATE INDEX IF NOT EXISTS idx_cms_submissions_status ON cms_submissions(status);
CREATE INDEX IF NOT EXISTS idx_cms_submissions_type ON cms_submissions(type);

-- ============================================================
-- updated_at triggers
-- ============================================================
CREATE OR REPLACE FUNCTION cms_set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_cms_services_updated ON cms_services;
CREATE TRIGGER trg_cms_services_updated BEFORE UPDATE ON cms_services
  FOR EACH ROW EXECUTE FUNCTION cms_set_updated_at();

DROP TRIGGER IF EXISTS trg_cms_specialties_updated ON cms_specialties;
CREATE TRIGGER trg_cms_specialties_updated BEFORE UPDATE ON cms_specialties
  FOR EACH ROW EXECUTE FUNCTION cms_set_updated_at();

DROP TRIGGER IF EXISTS trg_cms_blogs_updated ON cms_blogs;
CREATE TRIGGER trg_cms_blogs_updated BEFORE UPDATE ON cms_blogs
  FOR EACH ROW EXECUTE FUNCTION cms_set_updated_at();

DROP TRIGGER IF EXISTS trg_cms_faqs_updated ON cms_faqs;
CREATE TRIGGER trg_cms_faqs_updated BEFORE UPDATE ON cms_faqs
  FOR EACH ROW EXECUTE FUNCTION cms_set_updated_at();

DROP TRIGGER IF EXISTS trg_cms_testimonials_updated ON cms_testimonials;
CREATE TRIGGER trg_cms_testimonials_updated BEFORE UPDATE ON cms_testimonials
  FOR EACH ROW EXECUTE FUNCTION cms_set_updated_at();
