-- Blog content is one HTML document, not a JSON array of paragraphs.
ALTER TABLE cms_blogs
  ALTER COLUMN content DROP DEFAULT,
  ALTER COLUMN content TYPE text USING CASE
    WHEN jsonb_typeof(content) = 'string' THEN content #>> '{}'
    WHEN jsonb_typeof(content) = 'array' THEN COALESCE((
      SELECT string_agg(
        CASE
          WHEN jsonb_typeof(item) = 'string' THEN item #>> '{}'
          ELSE item::text
        END,
        E'\n\n' ORDER BY ordinal
      )
      FROM jsonb_array_elements(content) WITH ORDINALITY AS elements(item, ordinal)
    ), '')
    ELSE content::text
  END,
  ALTER COLUMN content SET DEFAULT '';