import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Seo from '@/components/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page Not Found | LeverageRCM" description="The page you are looking for could not be found." />
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-900 pt-20">
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.05]" />
        <div className="relative container-px text-center">
          <p className="text-8xl font-extrabold text-gradient lg:text-9xl">404</p>
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Page not found</h1>
          <p className="mx-auto mt-3 max-w-md text-slatey-400">
            The page you are looking for may have been moved or no longer exists.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/" className="btn-primary">
              <Home className="h-4 w-4" /> Back to Home
            </Link>
            <Link to="/services" className="btn bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20 px-6 py-3 text-sm">
              <ArrowLeft className="h-4 w-4" /> Explore Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
