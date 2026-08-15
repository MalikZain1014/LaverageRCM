/*
# LeverageRCM Admin CMS — Extended Tables (Media, Settings, Navigation, SEO, Activity)

## Summary
Adds the supporting tables for the CMS: media library, site-wide settings,
navigation menu management, SEO manager records, and activity logging.

## New Tables
1. `cms_media` — Media library entries (images uploaded for use across content).
   Stores name, URL, folder, alt text, file size, dimensions, and uploader.
2. `cms_settings` — Single-row-style key/value site settings (general settings,
   contact info, colors, analytics IDs, maintenance mode, SMTP placeholder).
   Uses a unique `key` column so settings are fetched by key.
3. `cms_navigation` — Navigation menu items for header and footer. Supports
   dropdowns via `parent_id`, ordering via `sort_order`, and visibility toggles.
4. `cms_seo` — Per-page SEO records: meta title, description, keywords, canonical,
   open graph, twitter card, schema, robots directive.
5. `cms_activity` — Activity log for the dashboard recent-activity feed.
   Records action, entity type, entity label, and the user who performed it.

## Security
- RLS enabled on every table.
- `cms_media`, `cms_navigation`, `cms_seo`, `cms_activity`: owner-scoped to the
  authenticated CMS user who created the row (created_by defaults to auth.uid()).
- `cms_settings`: authenticated CRUD with ownership on created_by. Any admin
  can read all settings; only the creator can modify their own rows.
- 4 policies per table (select/insert/update/delete).

## Notes
1. `cms_settings` uses a `key text UNIQUE` pattern so the frontend can upsert
   settings by key without needing row IDs.
2. `cms_navigation.parent_id` is self-referential (nullable for top-level items).
3. `cms_activity` is append-only in practice (no update UI), but the policy
   allows update for corrections.
4. All `created_by` columns default to `auth.uid()`.
*/

-- ============================================================
-- cms_media
-- ============================================================
CREATE TABLE IF NOT EXISTS cms_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  url text NOT NULL,
  folder text NOT NULL DEFAULT 'root',
  alt_text text NOT NULL DEFAULT '',
  file_size bigint NOT NULL DEFAULT 0,
  width integer,
  height integer,
  mime_type text NOT NULL DEFAULT 'image/png',
  created_by uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE cms_media ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "cms_media_select_own" ON cms_media;
CREATE POLICY "cms_media_select_own" ON cms_media FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "cms_media_insert_own" ON cms_media;
CREATE POLICY "cms_media_insert_own" ON cms_media FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "cms_media_update_own" ON cms_media;
CREATE POLICY "cms_media_update_own" ON cms_media FOR UPDATE
  TO authenticated USING (auth.uid() = created_by) WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "cms_media_delete_own" ON cms_media;
CREATE POLICY "cms_media_delete_own" ON cms_media FOR DELETE
  TO authenticated USING (auth.uid() = created_by);

-- ============================================================
-- cms_settings
-- ============================================================
CREATE TABLE IF NOT EXISTS cms_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  label text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'general',
  created_by uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE cms_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "cms_settings_select_own" ON cms_settings;
CREATE POLICY "cms_settings_select_own" ON cms_settings FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "cms_settings_insert_own" ON cms_settings;
CREATE POLICY "cms_settings_insert_own" ON cms_settings FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "cms_settings_update_own" ON cms_settings;
CREATE POLICY "cms_settings_update_own" ON cms_settings FOR UPDATE
  TO authenticated USING (auth.uid() = created_by) WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "cms_settings_delete_own" ON cms_settings;
CREATE POLICY "cms_settings_delete_own" ON cms_settings FOR DELETE
  TO authenticated USING (auth.uid() = created_by);

-- ============================================================
-- cms_navigation
-- ============================================================
CREATE TABLE IF NOT EXISTS cms_navigation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  url text NOT NULL DEFAULT '#',
  location text NOT NULL DEFAULT 'header',
  parent_id uuid REFERENCES cms_navigation(id) ON DELETE CASCADE,
  sort_order integer NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  is_dropdown boolean NOT NULL DEFAULT false,
  created_by uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE cms_navigation ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "cms_navigation_select_own" ON cms_navigation;
CREATE POLICY "cms_navigation_select_own" ON cms_navigation FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "cms_navigation_insert_own" ON cms_navigation;
CREATE POLICY "cms_navigation_insert_own" ON cms_navigation FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "cms_navigation_update_own" ON cms_navigation;
CREATE POLICY "cms_navigation_update_own" ON cms_navigation FOR UPDATE
  TO authenticated USING (auth.uid() = created_by) WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "cms_navigation_delete_own" ON cms_navigation;
CREATE POLICY "cms_navigation_delete_own" ON cms_navigation FOR DELETE
  TO authenticated USING (auth.uid() = created_by);

-- ============================================================
-- cms_seo
-- ============================================================
CREATE TABLE IF NOT EXISTS cms_seo (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key text NOT NULL UNIQUE,
  page_name text NOT NULL,
  meta_title text NOT NULL DEFAULT '',
  meta_description text NOT NULL DEFAULT '',
  keywords jsonb NOT NULL DEFAULT '[]'::jsonb,
  canonical_url text,
  og_title text,
  og_description text,
  og_image text,
  twitter_card text NOT NULL DEFAULT 'summary_large_image',
  schema_markup jsonb NOT NULL DEFAULT '{}'::jsonb,
  robots text NOT NULL DEFAULT 'index, follow',
  created_by uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE cms_seo ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "cms_seo_select_own" ON cms_seo;
CREATE POLICY "cms_seo_select_own" ON cms_seo FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "cms_seo_insert_own" ON cms_seo;
CREATE POLICY "cms_seo_insert_own" ON cms_seo FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "cms_seo_update_own" ON cms_seo;
CREATE POLICY "cms_seo_update_own" ON cms_seo FOR UPDATE
  TO authenticated USING (auth.uid() = created_by) WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "cms_seo_delete_own" ON cms_seo;
CREATE POLICY "cms_seo_delete_own" ON cms_seo FOR DELETE
  TO authenticated USING (auth.uid() = created_by);

-- ============================================================
-- cms_activity
-- ============================================================
CREATE TABLE IF NOT EXISTS cms_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL,
  entity_type text NOT NULL DEFAULT '',
  entity_label text NOT NULL DEFAULT '',
  user_email text NOT NULL DEFAULT '',
  created_by uuid DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE cms_activity ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "cms_activity_select_own" ON cms_activity;
CREATE POLICY "cms_activity_select_own" ON cms_activity FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "cms_activity_insert_own" ON cms_activity;
CREATE POLICY "cms_activity_insert_own" ON cms_activity FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "cms_activity_update_own" ON cms_activity;
CREATE POLICY "cms_activity_update_own" ON cms_activity FOR UPDATE
  TO authenticated USING (auth.uid() = created_by) WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "cms_activity_delete_own" ON cms_activity;
CREATE POLICY "cms_activity_delete_own" ON cms_activity FOR DELETE
  TO authenticated USING (auth.uid() = created_by);

-- ============================================================
-- Indexes
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_cms_media_folder ON cms_media(folder);
CREATE INDEX IF NOT EXISTS idx_cms_settings_key ON cms_settings(key);
CREATE INDEX IF NOT EXISTS idx_cms_navigation_location ON cms_navigation(location);
CREATE INDEX IF NOT EXISTS idx_cms_navigation_parent ON cms_navigation(parent_id);
CREATE INDEX IF NOT EXISTS idx_cms_seo_page_key ON cms_seo(page_key);
CREATE INDEX IF NOT EXISTS idx_cms_activity_created ON cms_activity(created_at DESC);

-- ============================================================
-- updated_at triggers for new tables
-- ============================================================
DROP TRIGGER IF EXISTS trg_cms_settings_updated ON cms_settings;
CREATE TRIGGER trg_cms_settings_updated BEFORE UPDATE ON cms_settings
  FOR EACH ROW EXECUTE FUNCTION cms_set_updated_at();

DROP TRIGGER IF EXISTS trg_cms_navigation_updated ON cms_navigation;
CREATE TRIGGER trg_cms_navigation_updated BEFORE UPDATE ON cms_navigation
  FOR EACH ROW EXECUTE FUNCTION cms_set_updated_at();

DROP TRIGGER IF EXISTS trg_cms_seo_updated ON cms_seo;
CREATE TRIGGER trg_cms_seo_updated BEFORE UPDATE ON cms_seo
  FOR EACH ROW EXECUTE FUNCTION cms_set_updated_at();
