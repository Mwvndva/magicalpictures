import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LogoShowcase from '../components/LogoShowcase';

const BrandsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-0 w-full">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 w-full"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Our Clients
            </motion.h1>
            <motion.div 
              className="w-24 h-1 bg-yellow-500 mx-auto mb-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
            <motion.p 
              className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We've had the privilege of working with some amazing brands and clients.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <LogoShowcase 
            showTitles={true} 
            grayscale={true}
            className="my-8"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-r from-yellow-500/10 to-yellow-500/5">
        <div className="container mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Want to work with us?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our growing list of satisfied clients and let's create something amazing together.
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BrandsPage;
