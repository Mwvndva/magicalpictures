import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LogoShowcase from '../components/LogoShowcase';
import { PageMeta } from '../components/PageMeta';
import PageTransition from '../components/PageTransition';

const BrandsPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-gray-100">
        <PageMeta
          title="Photography & Video Production Clients in Kenya"
          description="See brands and clients that trust Magical Pictures Productions for photography, videography, corporate events, commercials, and media production in Nairobi and Kenya."
          canonical="/brands"
          keywords={[
            'video production clients Kenya',
            'Nairobi media production brands',
            'corporate photography clients Nairobi',
            'Magical Pictures clients',
          ]}
        />
        {/* Hero Section */}
        <section className="relative w-full pt-20 pb-8 md:pt-28 md:pb-10 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-0 w-full">
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 w-full"></div>
          </div>

          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 relative z-10 text-center">
              <motion.h1
                className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-100 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Our Clients
              </motion.h1>
              <motion.div
                className="w-16 h-0.5 bg-yellow-500 mx-auto mb-5"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
              <motion.p
                className="text-sm sm:text-base text-gray-300 mb-6 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                We've had the privilege of working with some amazing brands and clients.
              </motion.p>
          </div>
        </section>

        {/* Brands Grid */}
        <section className="py-5 md:py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <LogoShowcase
              showTitles={true}
              grayscale={false}
              className="my-4"
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-10 md:py-12 bg-gradient-to-r from-yellow-500/10 to-yellow-500/5">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 text-center flex flex-col items-center">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-100 mb-4">
              Want to work with us?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-6 max-w-2xl mx-auto">
              Join our growing list of satisfied clients and let's create something amazing together.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2.5 px-6 rounded-full text-sm sm:text-base transition-all duration-300 transform hover:scale-[1.02]"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default BrandsPage;
