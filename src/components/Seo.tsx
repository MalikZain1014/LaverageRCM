import { useEffect } from 'react';

const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LeverageRCM',
  url: 'https://leveragercm.com/',
  description:
    'Medical billing and revenue cycle management company serving healthcare providers across the USA and UK.',
  areaServed: ['United States', 'United Kingdom'],
  telephone: '+1 (442) 236-6240',
};

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  schema?: object;
}

export default function Seo({ title, description, path = '', schema }: SeoProps) {
  useEffect(() => {
    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', `https://leveragercm.com${path}`, true);
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);

    const scriptId = 'page-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    const schemaContent = schema || ORG_SCHEMA;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemaContent);
  }, [title, description, path, schema]);

  return null;
}

function setMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}
