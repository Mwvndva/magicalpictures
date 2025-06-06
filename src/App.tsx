import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ResponsiveProvider } from "@/components/ResponsiveProvider";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PortfolioPage from "./pages/PortfolioPage";
import BrandsPage from "./pages/BrandsPage";
import BookingPage from "./pages/BookingPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ResponsiveProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            
            {/* Main routes */}
            <Route path="/home" element={
              <Layout>
                <HomePage />
              </Layout>
            } />
            <Route path="/about" element={
              <Layout>
                <AboutPage />
              </Layout>
            } />
            <Route path="/portfolio" element={
              <Layout>
                <PortfolioPage />
              </Layout>
            } />
            <Route path="/brands" element={
              <Layout>
                <BrandsPage />
              </Layout>
            } />
            <Route path="/booking" element={
              <Layout>
                <BookingPage />
              </Layout>
            } />
            <Route path="/contact" element={
              <Layout>
                <ContactPage />
              </Layout>
            } />
            
            {/* 404 route */}
            <Route path="/not-found" element={
              <Layout>
                <NotFound />
              </Layout>
            } />
            
            {/* Catch-all route - redirect to home */}
            <Route path="*" element={
              <Navigate to="/home" replace />
            } />
          </Routes>
        </BrowserRouter>
      </ResponsiveProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
