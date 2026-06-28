import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ResponsiveProvider } from "@/hooks/use-responsive";
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from "./components/Layout";
import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import PageLoadingFallback from './components/PageLoadingFallback';
import { ScrollToTop } from './components/ScrollToTop';
import { AdminAuthProvider } from './components/admin/AdminAuthContext';
import AdminLayout from './components/admin/AdminLayout';

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const BrandsPage = lazy(() => import("./pages/BrandsPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin pages — lazy loaded, NOT wrapped in public Layout
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboardPage"));

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Public routes */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/home" element={<Layout><HomePage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
        <Route path="/portfolio" element={<Layout><PortfolioPage /></Layout>} />
        <Route path="/brands" element={<Layout><BrandsPage /></Layout>} />
        <Route path="/booking" element={<Layout><BookingPage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/not-found" element={<Layout><NotFound /></Layout>} />

        {/* Admin routes — no public Layout */}
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <AdminDashboardPage />
            </AdminLayout>
          }
        />

        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ResponsiveProvider>
            <AdminAuthProvider>
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <Suspense fallback={<PageLoadingFallback />}>
                  <AnimatedRoutes />
                </Suspense>
              </BrowserRouter>
            </AdminAuthProvider>
          </ResponsiveProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
