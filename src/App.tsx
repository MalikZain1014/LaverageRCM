import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ServicesPage from '@/pages/ServicesPage';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import SpecialtiesPage from '@/pages/SpecialtiesPage';
import SpecialtyDetailPage from '@/pages/SpecialtyDetailPage';
import WhyChooseUsPage from '@/pages/WhyChooseUsPage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
import FaqPage from '@/pages/FaqPage';
import ContactPage from '@/pages/ContactPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsPage from '@/pages/TermsPage';
import CookiesPage from '@/pages/CookiesPage';
import NotFoundPage from '@/pages/NotFoundPage';

import { AuthProvider } from '@/admin/contexts/AuthContext';
import { ThemeProvider } from '@/admin/contexts/ThemeContext';
import { ConnectionProvider } from '@/admin/contexts/ConnectionContext';
import ErrorBoundary from '@/admin/components/ErrorBoundary';
import ConnectionStatusIndicator from '@/admin/components/ConnectionStatusIndicator';
import ProtectedRoute from '@/admin/components/ProtectedRoute';
import AdminLayout from '@/admin/components/AdminLayout';
import LoginPage from '@/admin/pages/LoginPage';
import DashboardPage from '@/admin/pages/DashboardPage';
import ServicesListPage from '@/admin/pages/ServicesListPage';
import ServiceEditorPage from '@/admin/pages/ServiceEditorPage';
import SpecialtiesListPage from '@/admin/pages/SpecialtiesListPage';
import SpecialtyEditorPage from '@/admin/pages/SpecialtyEditorPage';
import BlogsListPage from '@/admin/pages/BlogsListPage';
import BlogEditorPage from '@/admin/pages/BlogEditorPage';
import FaqsPage from '@/admin/pages/FaqsPage';
import TestimonialsPage from '@/admin/pages/TestimonialsPage';
import TeamPage from '@/admin/pages/TeamPage';
import MediaPage from '@/admin/pages/MediaPage';
import LeadsPage from '@/admin/pages/LeadsPage';
import NavigationPage from '@/admin/pages/NavigationPage';
import SeoPage from '@/admin/pages/SeoPage';
import SettingsPage from '@/admin/pages/SettingsPage';
import UsersPage from '@/admin/pages/UsersPage';
import ProfilePage from '@/admin/pages/ProfilePage';

import { CmsProvider } from '@/contexts/CmsContext';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ConnectionProvider>
          <AuthProvider>
            <ThemeProvider>
              <Toaster position="top-right" toastOptions={{ className: 'admin-toast' }} />
              <ScrollToTop />
              <ConnectionStatusIndicator />
              <Routes>
                {/* Admin routes */}
                <Route path="/admin/login" element={<LoginPage />} />
                <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                  <Route index element={<DashboardPage />} />
                  <Route path="services" element={<ServicesListPage />} />
                  <Route path="services/new" element={<ServiceEditorPage />} />
                  <Route path="services/:id/edit" element={<ServiceEditorPage />} />
                  <Route path="specialties" element={<SpecialtiesListPage />} />
                  <Route path="specialties/new" element={<SpecialtyEditorPage />} />
                  <Route path="specialties/:id/edit" element={<SpecialtyEditorPage />} />
                  <Route path="blogs" element={<BlogsListPage />} />
                  <Route path="blogs/new" element={<BlogEditorPage />} />
                  <Route path="blogs/:id/edit" element={<BlogEditorPage />} />
                  <Route path="faqs" element={<FaqsPage />} />
                  <Route path="faqs/new" element={<FaqsPage />} />
                  <Route path="testimonials" element={<TestimonialsPage />} />
                  <Route path="testimonials/new" element={<TestimonialsPage />} />
                  <Route path="team" element={<TeamPage />} />
                  <Route path="team/new" element={<TeamPage />} />
                  <Route path="media" element={<MediaPage />} />
                  <Route path="leads" element={<LeadsPage />} />
                  <Route path="navigation" element={<NavigationPage />} />
                  <Route path="seo" element={<SeoPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="users" element={<UsersPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                </Route>

                {/* Public website routes */}
                <Route path="/*" element={
                  <CmsProvider>
                    <div className="flex min-h-screen flex-col">
                      <Navbar />
                      <main className="flex-1">
                        <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/about" element={<AboutPage />} />
                          <Route path="/services" element={<ServicesPage />} />
                          <Route path="/services/:slug" element={<ServiceDetailPage />} />
                          <Route path="/specialties" element={<SpecialtiesPage />} />
                          <Route path="/specialties/:slug" element={<SpecialtyDetailPage />} />
                          <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
                          <Route path="/blog" element={<BlogPage />} />
                          <Route path="/blog/:slug" element={<BlogPostPage />} />
                          <Route path="/faq" element={<FaqPage />} />
                          <Route path="/contact" element={<ContactPage />} />
                          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                          <Route path="/terms" element={<TermsPage />} />
                          <Route path="/cookies" element={<CookiesPage />} />
                          <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                      </main>
                      <Footer />
                    </div>
                  </CmsProvider>
                } />
              </Routes>
            </ThemeProvider>
          </AuthProvider>
        </ConnectionProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
