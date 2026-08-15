import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = true,
  accent = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  center?: boolean;
  accent?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <Reveal>
          <span className={accent ? 'eyebrow-accent' : 'eyebrow'}>{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-4 text-3xl font-extrabold text-navy-800 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-lg text-slatey-600">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  breadcrumb?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="absolute inset-0 bg-hero-radial" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.05]" />
      <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-primary-600/20 blur-3xl animate-float" />
      <div className="absolute bottom-10 right-20 h-64 w-64 rounded-full bg-accent-500/15 blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

      <div className="relative container-px">
        <div className="max-w-3xl">
          {breadcrumb && (
            <Reveal>
              <p className="mb-4 text-sm font-medium text-slatey-400">{breadcrumb}</p>
            </Reveal>
          )}
          {eyebrow && (
            <Reveal delay={0.05}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-300 ring-1 ring-white/15">
                {eyebrow}
              </span>
            </Reveal>
          )}
          <Reveal delay={0.1}>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
          </Reveal>
          {subtitle && (
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-2xl text-lg text-slatey-300 sm:text-xl">{subtitle}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <AccordionItem key={i} q={item.q} a={item.a} />
      ))}
    </div>
  );
}

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span className="text-base font-semibold text-navy-800">{q}</span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            open ? 'bg-primary-600 text-white rotate-180' : 'bg-primary-50 text-primary-700'
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-slatey-600 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
