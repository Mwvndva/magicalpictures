import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Handshake, Rocket, Search, Sparkles, Target, Zap } from 'lucide-react';
import ModernCrewSlider from '../components/ModernCrewSlider';
import BehindTheScenesSlider from '../components/BehindTheScenesSlider';
import StatsSection from '../components/StatsSection';
import { PageMeta } from '../components/PageMeta';
import PageTransition from '../components/PageTransition';

const values = [
  {
    icon: Sparkles,
    title: 'Creativity',
    description: 'We push boundaries and think outside the box to deliver innovative solutions.'
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'We strive for perfection in every project, paying attention to the smallest details.'
  },
  {
    icon: Handshake,
    title: 'Collaboration',
    description: 'We believe in working closely with our clients to bring their vision to life.'
  },
  {
    icon: Zap,
    title: 'Passion',
    description: 'Our love for what we do shines through in every project we undertake.'
  },
  {
    icon: Search,
    title: 'Attention to Detail',
    description: 'We focus on the finer points to ensure exceptional quality in our work.'
  },
  {
    icon: Rocket,
    title: 'Innovation',
    description: 'We stay ahead of industry trends to deliver cutting-edge solutions.'
  }
];

const AboutPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-gray-100 flex flex-col items-center">
        <PageMeta
          title="About Our Nairobi Production Team"
          description="Meet Magical Pictures Productions, a Nairobi audiovisual production team with 3+ years, 400+ projects, and 70+ brands across photography, videography, documentaries, commercials, and events."
          canonical="/about"
          keywords={[
            'Nairobi production company',
            'Kenya audiovisual production team',
            'photography team Nairobi',
            'videography company Kenya',
          ]}
        />

        <section className="relative w-full pt-20 pb-8 md:pt-28 md:pb-10 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-0 w-full">
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 w-full" />
          </div>

          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 relative z-10 text-center">
            <motion.h1
              className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-100 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Our Story
            </motion.h1>
            <motion.div
              className="w-16 h-0.5 bg-yellow-500 mx-auto mb-5"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.7 }}
            />
            <motion.p
              className="text-sm sm:text-base text-gray-300 mb-6 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Crafting visual stories that inspire and engage audiences worldwide.
            </motion.p>
          </div>
        </section>

        <StatsSection />

        <section className="w-full py-8 md:py-12 bg-black">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-10">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                >
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-100 mb-4">
                    Who We Are
                  </h2>
                  <div className="w-14 h-0.5 bg-yellow-500 mb-5" />
                  <p className="text-sm sm:text-base text-gray-300 mb-5 leading-relaxed">
                    Magical Pictures Productions Limited is a Kenyan-based audiovisual
                    production company with over three years of professional
                    experience. We specialize in documentaries, commercials,
                    interviews, talk shows, infomercials, films, music videos, travel
                    videography, and photography.
                    Our team is made up of energetic, passionate young creatives
                    driven by storytelling, precision, and cinematic craftsmanship. We
                    pride ourselves on creativity and excellence, ensuring your brand
                    stands out in today's digital space.
                  </p>
                  <p className="text-sm sm:text-base text-white mb-5 leading-relaxed">
                    Our mission is to capture your experiences, one flash at a time.
                  </p>
                  <p className="text-sm sm:text-base text-white mb-7 leading-relaxed">
                    Our vision is to become a world-leading production company that
                    enhances client experience through top-notch videography and
                    photography services.
                  </p>
                  <Link
                    to="/portfolio"
                    className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2.5 px-6 rounded-full text-sm sm:text-base transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    View Our Work
                  </Link>
                </motion.div>
              </div>
              <div>
                <ModernCrewSlider />
              </div>
            </div>
          </div>
        </section>

        <BehindTheScenesSlider />

        <section className="w-full py-8 md:py-12 bg-zinc-950/25">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-100 mb-4">
                Our Values
              </h2>
              <div className="w-16 h-0.5 bg-yellow-500 mx-auto mb-5" />
              <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
                The principles that guide our work and define who we are
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {values.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    className="bg-zinc-950/35 p-4 sm:p-5 rounded-lg border border-gray-700/40 hover:border-yellow-500/30 transition-all duration-300 hover:-translate-y-0.5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.45 }}
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-500">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-100 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-300">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="w-full py-10 md:py-12 bg-gradient-to-r from-yellow-500/10 to-yellow-500/5">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 text-center flex flex-col items-center">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-100 mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-6 max-w-2xl mx-auto">
              Let's create something amazing together. Get in touch with us today to discuss your vision.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2.5 px-6 rounded-full text-sm sm:text-base transition-all duration-300 transform hover:scale-[1.02]"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default AboutPage;
