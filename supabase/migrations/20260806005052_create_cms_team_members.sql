CREATE TABLE cms_team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  designation text NOT NULL,
  department text NOT NULL DEFAULT '',
  photo_url text,
  biography text NOT NULL DEFAULT '',
  social_links jsonb NOT NULL DEFAULT '{}'::jsonb,
  display_order integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'draft',
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE cms_team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_team_members" ON cms_team_members FOR SELECT
  TO authenticated USING (true);
CREATE POLICY "insert_team_members" ON cms_team_members FOR INSERT
  TO authenticated WITH CHECK (true);
CREATE POLICY "update_team_members" ON cms_team_members FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_team_members" ON cms_team_members FOR DELETE
  TO authenticated USING (true);

CREATE TRIGGER set_updated_at_cms_team_members
  BEFORE UPDATE ON cms_team_members
  FOR EACH ROW EXECUTE FUNCTION cms_set_updated_at();
