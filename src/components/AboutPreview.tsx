import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutPreview: React.FC = () => {
  return (
    <section className="bg-black py-9 sm:py-12 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-gray-100 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Capturing Life's Magical Moments
          </motion.h2>
          <motion.div
            className="w-16 h-0.5 bg-yellow-500 mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.p
            className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            At Magical Pictures, we transform ordinary moments into extraordinary memories.
            Our team of passionate filmmakers and photographers works tirelessly to capture
            the essence of your story with cinematic brilliance and creative vision.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/portfolio"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2.5 px-6 rounded-full text-sm sm:text-base transition-all duration-300 transform hover:scale-[1.02]"
            >
              Discover Our Work
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
