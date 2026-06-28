import BookingSection from "../components/BookingSection";
import { PageMeta } from '../components/PageMeta';
import PageTransition from '../components/PageTransition';

const BookingPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-gray-100 flex flex-col items-center pt-20">
        <PageMeta
          title="Book Photography & Videography Services in Nairobi"
          description="Book a photography, videography, event coverage, commercial, documentary, drone, or live streaming session with Magical Pictures Productions in Nairobi, Kenya."
          canonical="/booking"
          keywords={[
            'book photographer Nairobi',
            'book videographer Nairobi',
            'hire video production company Kenya',
            'event photography booking Nairobi',
          ]}
        />

        {/* Booking Section Component */}
        <BookingSection />
      </div>
    </PageTransition>
  );
};

export default BookingPage;
