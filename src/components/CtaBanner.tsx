import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';

export default function CtaBanner({
  title = 'Ready to maximize your practice revenue?',
  subtitle = 'Book a free consultation with our RCM experts and discover how much revenue you could be capturing.',
  primaryLabel = 'Get Free Consultation',
  primaryTo = '/contact',
}: {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryTo?: string;
}) {
  return (
    <section className="container-px py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 via-navy-900 to-primary-900 px-6 py-14 lg:px-16 lg:py-20 shadow-premium-lg"
      >
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.06]" />
        <div className="absolute -top-20 -right-10 h-72 w-72 rounded-full bg-primary-500/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-4 text-lg text-slatey-300"
          >
            {subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link to={primaryTo} className="btn-primary text-base px-7 py-3.5">
              {primaryLabel} <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+1 (442) 236-6240"
              className="btn bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20 px-7 py-3.5 text-base"
            >
              <Phone className="h-4 w-4" /> +1 (442) 236-6240
            </a>
             <a
                href="https://wa.me/923432858901"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20 px-7 py-3.5 text-base"
              >
                <MessageCircle className="h-4 w-4" /> +92 343 2858901
              </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
