import { useState, useMemo } from 'react';
import { Search, HelpCircle } from 'lucide-react';
import Seo from '@/components/Seo';
import CtaBanner from '@/components/CtaBanner';
import { PageHero, Reveal, SectionHeader, Accordion } from '@/components/ui';
import { faqs, faqCategories } from '@/data/faqs';

export default function FaqPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    return faqs.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category;
      const matchesQuery =
        query.trim() === '' ||
        item.question.toLowerCase().includes(query.toLowerCase()) ||
        item.answer.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <>
      <Seo
        title="Frequently Asked Questions | LeverageRCM"
        description="Answers to the most common questions about medical billing, coding, credentialing, revenue cycle management, and working with LeverageRCM."
        path="/faq"
      />
      <PageHero
        eyebrow="FAQ"
        title={<>Frequently asked questions</>}
        subtitle="Everything you need to know about working with LeverageRCM — from onboarding and pricing to compliance and support."
        breadcrumb="Home / FAQ"
      />

      <section className="section bg-white">
        <div className="container-px">
          {/* Search */}
          <Reveal>
            <div className="mx-auto max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slatey-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search questions..."
                  className="w-full rounded-full border border-slatey-200 bg-white py-3.5 pl-12 pr-4 text-sm shadow-premium focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </Reveal>

          {/* Categories */}
          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {faqCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    category === cat
                      ? 'bg-primary-600 text-white shadow-premium'
                      : 'bg-slatey-50 text-slatey-600 ring-1 ring-slatey-200 hover:ring-primary-300 hover:text-primary-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Results */}
          <div className="mx-auto mt-12 max-w-3xl">
            {filtered.length === 0 ? (
              <div className="text-center text-slatey-500">
                <HelpCircle className="mx-auto h-12 w-12 text-slatey-300" />
                <p className="mt-4 text-lg">No questions match your search.</p>
              </div>
            ) : (
              <>
                <p className="mb-4 text-sm text-slatey-500">
                  Showing {filtered.length} {filtered.length === 1 ? 'question' : 'questions'}
                  {category !== 'All' && ` in ${category}`}
                </p>
                <Accordion items={filtered.map((f) => ({ q: f.question, a: f.answer }))} />
              </>
            )}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Still have questions?"
        subtitle="Our team is ready to answer any questions about your practice and how we can help maximize your revenue."
        primaryLabel="Book Your Free Consultation"
      />
    </>
  );
}
