import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
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
              Our Story
            </motion.h1>
            <motion.div 
              className="w-24 h-1 bg-yellow-500 mx-auto mb-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
            <motion.p 
              className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Crafting visual stories that inspire and engage audiences worldwide.
            </motion.p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="w-full py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-7xl mx-auto">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/about-hero.jpg" 
                  alt="Our Team" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-yellow-500/10 mix-blend-overlay"></div>
              </div>
            </motion.div>
            
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                  Who We Are
                </h2>
                <div className="w-16 h-1 bg-yellow-500 mb-6"></div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  We are a passionate team of creative professionals dedicated to producing exceptional visual content that tells compelling stories. With years of experience in the industry, we combine technical expertise with artistic vision to deliver outstanding results for our clients.
                </p>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Our mission is to capture the essence of every moment and transform it into a visual masterpiece. Whether it's a commercial project, a brand campaign, or a personal story, we approach each project with the same level of dedication and creativity.
                </p>
                <Link 
                  to="/portfolio" 
                  className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  View Our Work
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full py-16 md:py-24 bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Our Values
            </h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              The principles that guide our work and define who we are
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: '✨',
                title: 'Creativity',
                description: 'We push boundaries and think outside the box to deliver innovative solutions.'
              },
              {
                icon: '🎯',
                title: 'Excellence',
                description: 'We strive for perfection in every project, paying attention to the smallest details.'
              },
              {
                icon: '🤝',
                title: 'Collaboration',
                description: 'We believe in working closely with our clients to bring their vision to life.'
              },
              {
                icon: '⚡',
                title: 'Passion',
                description: 'Our love for what we do shines through in every project we undertake.'
              },
              {
                icon: '🔍',
                title: 'Attention to Detail',
                description: 'We focus on the finer points to ensure exceptional quality in our work.'
              },
              {
                icon: '🚀',
                title: 'Innovation',
                description: 'We stay ahead of industry trends to deliver cutting-edge solutions.'
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-gray-800/50 p-8 rounded-lg border border-gray-700/50 hover:border-yellow-500/30 transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-r from-yellow-500/10 to-yellow-500/5">
        <div className="container mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's create something amazing together. Get in touch with us today to discuss your vision.
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
