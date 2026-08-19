-- Public pages may read only published CMS content. Writes remain authenticated-only.
DO $$
DECLARE
  table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY['cms_services', 'cms_specialties', 'cms_blogs', 'cms_faqs', 'cms_testimonials'] LOOP
    EXECUTE format('DROP POLICY IF EXISTS "public_read_published_%s" ON %I', table_name, table_name);
    EXECUTE format('CREATE POLICY "public_read_published_%s" ON %I FOR SELECT TO anon USING (status = ''published'')', table_name, table_name);
  END LOOP;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'cms_services') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE cms_services;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'cms_specialties') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE cms_specialties;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'cms_blogs') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE cms_blogs;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'cms_faqs') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE cms_faqs;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'cms_testimonials') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE cms_testimonials;
  END IF;
END $$;