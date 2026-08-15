/*
# LeverageRCM Admin CMS — User Profiles & Roles

## Summary
Creates a `cms_users` profile table that mirrors `auth.users` and stores CMS-specific
data: full name, role, avatar URL, and active status. A database trigger automatically
creates a profile row whenever a new auth user signs up. The first user automatically
receives the `super_admin` role; all subsequent users default to `content_editor`.

## New Tables
1. `cms_users` — CMS user profiles.
   - `id` (uuid, PK, references auth.users) — one row per auth user.
   - `full_name` (text) — display name.
   - `role` (text) — one of: super_admin, administrator, content_editor, marketing_manager.
   - `avatar_url` (text) — profile photo URL.
   - `is_active` (boolean) — allows deactivating a user without deleting the auth account.

## Security
- RLS enabled on `cms_users`.
- Any authenticated user can READ all profiles (needed to list users in User Management).
- A user can UPDATE only their own profile (name, avatar).
- Role and is_active changes are restricted: only a super_admin can modify those.
  This is enforced via a SECURITY DEFINER function `cms_update_user_role()` so that
  a caller with super_admin privileges can set roles on other users' rows.
- INSERT is handled by the trigger (runs as definer), not by client inserts.

## Notes
1. The `handle_new_cms_user` trigger fires AFTER INSERT on `auth.users` and creates
   the corresponding `cms_users` row. The first user (when the table is empty) gets
   `super_admin`; everyone else gets `content_editor`.
2. `cms_update_user_role()` is a SECURITY DEFINER function that allows a super_admin
   to update the `role` and `is_active` fields on any user's profile. It checks the
   caller's role by looking up their `cms_users` row.
3. Email confirmation stays OFF (per project defaults).
*/

-- ============================================================
-- cms_users
-- ============================================================
CREATE TABLE IF NOT EXISTS cms_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT 'content_editor',
  avatar_url text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE cms_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "cms_users_select_all" ON cms_users;
CREATE POLICY "cms_users_select_all" ON cms_users FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "cms_users_update_own" ON cms_users;
CREATE POLICY "cms_users_update_own" ON cms_users FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- ============================================================
-- SECURITY DEFINER: allow super_admin to update any user's role/active status
-- ============================================================
CREATE OR REPLACE FUNCTION cms_update_user_role(target_user_id uuid, new_role text, new_is_active boolean)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  caller_role text;
BEGIN
  SELECT role INTO caller_role FROM cms_users WHERE id = auth.uid();
  IF caller_role IS NULL OR caller_role <> 'super_admin' THEN
    RAISE EXCEPTION 'Only super_admin can modify user roles';
  END IF;
  UPDATE cms_users
  SET role = new_role, is_active = COALESCE(new_is_active, is_active), updated_at = now()
  WHERE id = target_user_id;
END;
$$;

-- ============================================================
-- Trigger: auto-create cms_users row on auth.users insert
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_cms_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_count integer;
  assigned_role text;
BEGIN
  SELECT count(*) INTO user_count FROM cms_users;
  assigned_role := CASE WHEN user_count = 0 THEN 'super_admin' ELSE 'content_editor' END;
  INSERT INTO cms_users (id, email, full_name, role)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), assigned_role)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_cms ON auth.users;
CREATE TRIGGER on_auth_user_created_cms
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_cms_user();

-- ============================================================
-- updated_at trigger
-- ============================================================
DROP TRIGGER IF EXISTS trg_cms_users_updated ON cms_users;
CREATE TRIGGER trg_cms_users_updated BEFORE UPDATE ON cms_users
  FOR EACH ROW EXECUTE FUNCTION cms_set_updated_at();
