import PageTransition from '../components/PageTransition';
import HeroSection from "../components/HeroSection";
import AboutPreview from "../components/AboutPreview";
import { PageMeta } from '../components/PageMeta';
import { localBusinessJsonLd, websiteJsonLd } from '../lib/seo';

export default function HomePage() {
  return (
    <PageTransition>
      <PageMeta
        title="Photography & Video Production Company in Nairobi Kenya"
        description="Magical Pictures Productions is a Nairobi photography and video production company for corporate events, commercials, documentaries, weddings, live streaming, drone coverage, and motion graphics."
        canonical="/"
        keywords={[
          'photography in Nairobi',
          'videography in Nairobi',
          'video production company Kenya',
          'corporate videography Nairobi',
          'event photography Kenya',
        ]}
        jsonLd={[localBusinessJsonLd, websiteJsonLd]}
      />
      <HeroSection />
      <AboutPreview />
    </PageTransition>
  );
}
