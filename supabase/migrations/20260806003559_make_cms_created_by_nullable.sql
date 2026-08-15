/*
# Make created_by nullable on CMS tables

## Summary
Alters all CMS content tables to allow `created_by` to be NULL. This is needed because:
1. Seeding content via privileged SQL (no auth session) cannot set auth.uid().
2. The ON DELETE SET NULL foreign key already implies NULL is valid, but the
   NOT NULL constraint contradicted that.

## Modified Tables
- cms_services, cms_specialties, cms_blogs, cms_faqs, cms_testimonials,
  cms_media, cms_settings, cms_navigation, cms_seo, cms_activity

## Changes
- Each table: ALTER COLUMN created_by DROP NOT NULL
- The DEFAULT auth.uid() is preserved so normal CMS inserts still auto-fill the owner.

## Security
- No policy changes. RLS ownership checks use `auth.uid() = created_by`,
  which correctly returns false when created_by is NULL (seeded rows).
- Seeded rows with NULL created_by are readable by all authenticated users
  (SELECT policies use USING(true)) but cannot be modified by non-owners.
*/
ALTER TABLE cms_services ALTER COLUMN created_by DROP NOT NULL;
ALTER TABLE cms_specialties ALTER COLUMN created_by DROP NOT NULL;
ALTER TABLE cms_blogs ALTER COLUMN created_by DROP NOT NULL;
ALTER TABLE cms_faqs ALTER COLUMN created_by DROP NOT NULL;
ALTER TABLE cms_testimonials ALTER COLUMN created_by DROP NOT NULL;
ALTER TABLE cms_media ALTER COLUMN created_by DROP NOT NULL;
ALTER TABLE cms_settings ALTER COLUMN created_by DROP NOT NULL;
ALTER TABLE cms_navigation ALTER COLUMN created_by DROP NOT NULL;
ALTER TABLE cms_seo ALTER COLUMN created_by DROP NOT NULL;
ALTER TABLE cms_activity ALTER COLUMN created_by DROP NOT NULL;
