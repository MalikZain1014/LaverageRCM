import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, FileText, Calendar, Clock } from 'lucide-react';
import Seo from '@/components/Seo';
import CtaBanner from '@/components/CtaBanner';
import { PageHero, Reveal, SectionHeader } from '@/components/ui';
import { blogPosts, blogCategories } from '@/data/blog';

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = category === 'All' || post.category === category;
      const matchesQuery =
        query.trim() === '' ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const featured = blogPosts.find((p) => p.featured) || blogPosts[0];
  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <>
      <Seo
        title="RCM Blog & Insights | LeverageRCM"
        description="Expert insights on medical billing, coding, revenue cycle management, credentialing, and healthcare industry news for practices across the USA and UK."
        path="/blog"
      />
      <PageHero
        eyebrow="Blog & Insights"
        title={<>Expert perspectives on medical billing & RCM</>}
        subtitle="Stay current with the latest in coding updates, billing best practices, and revenue cycle management strategies."
        breadcrumb="Home / Blog"
      />

      {/* Featured */}
      <section className="section bg-white">
        <div className="container-px">
          <Reveal>
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid gap-8 overflow-hidden rounded-3xl bg-slatey-50 ring-1 ring-slatey-200/70 transition-all duration-300 hover:shadow-premium-lg lg:grid-cols-2"
            >
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary-600 to-accent-500 lg:h-full">
                <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="h-20 w-20 text-white/30" />
                </div>
                <span className="absolute top-5 left-5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-primary-700">
                  Featured · {featured.category}
                </span>
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <div className="flex items-center gap-4 text-xs text-slatey-500">
                  <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {featured.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {featured.readTime}</span>
                </div>
                <h2 className="mt-3 text-2xl font-extrabold text-navy-800 group-hover:text-primary-700 transition-colors lg:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-slatey-600 leading-relaxed">{featured.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
                  Read Article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Search + Categories + Grid */}
      <section className="section bg-slatey-50">
        <div className="container-px">
          <SectionHeader eyebrow="All Articles" title={<>Browse our latest insights</>} />

          {/* Search */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slatey-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                  placeholder="Search articles..."
                  className="w-full rounded-full border border-slatey-200 bg-white py-3.5 pl-12 pr-4 text-sm shadow-premium focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </Reveal>

          {/* Categories */}
          <Reveal delay={0.15}>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setPage(1); }}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    category === cat
                      ? 'bg-primary-600 text-white shadow-premium'
                      : 'bg-white text-slatey-600 ring-1 ring-slatey-200 hover:ring-primary-300 hover:text-primary-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Grid */}
          {paginated.length === 0 ? (
            <div className="mt-14 text-center text-slatey-500">
              <p className="text-lg">No articles found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 0.08}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slatey-200/70 shadow-premium transition-all duration-300 hover:-translate-y-1.5 hover:shadow-premium-lg"
                  >
                    <div className="relative h-44 overflow-hidden bg-gradient-to-br from-primary-600 to-accent-500">
                      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FileText className="h-12 w-12 text-white/30" />
                      </div>
                      <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary-700">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-3 text-xs text-slatey-500">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                      </div>
                      <h3 className="mt-2 text-lg font-bold text-navy-800 group-hover:text-primary-700 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm text-slatey-600 line-clamp-3">{post.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
                        Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`h-10 w-10 rounded-full text-sm font-semibold transition-all ${
                    currentPage === i + 1
                      ? 'bg-primary-600 text-white shadow-premium'
                      : 'bg-white text-slatey-600 ring-1 ring-slatey-200 hover:ring-primary-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
