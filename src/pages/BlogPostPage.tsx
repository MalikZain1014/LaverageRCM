import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from 'lucide-react';
import Seo from '@/components/Seo';
import CtaBanner from '@/components/CtaBanner';
import { Reveal, SectionHeader } from '@/components/ui';
import { usePublicContent } from '@/context/PublicContentContext';

export default function BlogPostPage() {
  const { slug } = useParams();
  const { blogPosts } = usePublicContent();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="container-px py-40 text-center">
        <h1 className="text-3xl font-bold text-navy-800">Article not found</h1>
        <Link to="/blog" className="btn-primary mt-6">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const fallbackRelated = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const relatedPosts = related.length >= 3 ? related : fallbackRelated;

  return (
    <>
      <Seo
        title={`${post.title} | LeverageRCM Blog`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          author: { '@type': 'Organization', name: post.author },
          publisher: { '@type': 'Organization', name: 'LeverageRCM' },
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.05]" />
        <div className="relative container-px">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-slatey-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <div className="mt-6 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-300 ring-1 ring-white/15">
              {post.category}
            </span>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-slatey-300">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-slatey-400">
              <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> {post.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section bg-white">
        <div className="container-px">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-accent-500 p-12 text-center text-white">
              <p className="text-sm uppercase tracking-wider text-white/80">LeverageRCM Insights</p>
              <p className="mt-2 text-2xl font-bold">{post.category}</p>
            </div>
            <div className="space-y-6">
              {post.content.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.04}>
                  <p className={`text-slatey-700 leading-relaxed ${i === 0 ? 'text-lg' : 'text-base'}`}>{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="section bg-slatey-50">
        <div className="container-px">
          <SectionHeader eyebrow="Related Articles" title={<>Keep reading</>} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {relatedPosts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link
                  to={`/blog/${p.slug}`}
                  className="group flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-slatey-200/70 shadow-premium transition-all hover:-translate-y-1 hover:shadow-premium-lg"
                >
                  <span className="text-xs font-semibold text-accent-600">{p.category}</span>
                  <h3 className="mt-2 text-base font-bold text-navy-800 group-hover:text-primary-700 transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-slatey-600 line-clamp-2">{p.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
                    Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
