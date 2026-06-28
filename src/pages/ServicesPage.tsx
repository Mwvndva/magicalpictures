import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageMeta } from '../components/PageMeta';
import PageTransition from '../components/PageTransition';
import {
  Camera,
  Video,
  Clock,
  Film,
  Plane,
  Layout,
  Tv,
  Radio,
  Globe,
  TrendingUp
} from 'lucide-react';
import { SITE_URL } from '../lib/seo';

// Major Services
const majorServices = [
  {
    id: 1,
    title: 'Photography',
    description: 'Professional photography services that capture stunning moments. Our expert photographers specialize in various styles including portrait, event, product, and commercial photography.',
    icon: <Camera className="w-16 h-16 text-yellow-500" />,
    link: '/portfolio'
  },
  {
    id: 2,
    title: 'Videography',
    description: 'Comprehensive video production services for commercials, events, and creative storytelling. From concept development to post-production, we handle every aspect of video creation.',
    icon: <Video className="w-16 h-16 text-yellow-500" />,
    link: '/portfolio'
  },
  {
    id: 6,
    title: 'Animations & Graphics',
    description: 'Motion graphics and animation that bring your ideas to life. High-end visual effects and creative designs for all your digital content needs.',
    icon: <Layout className="w-16 h-16 text-yellow-500" />,
    link: '/portfolio'
  },
  {
    id: 10,
    title: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategies to boost your online presence. From social media management to targeted ad campaigns.',
    icon: <TrendingUp className="w-16 h-16 text-yellow-500" />,
    link: '/portfolio'
  }
];

// Additional Services
const additionalServices = [
  {
    id: 3,
    title: 'Event Coverage',
    description: 'Complete event coverage that captures every moment of your special occasion.',
    icon: <Clock className="w-12 h-12 text-yellow-500" />,
    link: '/portfolio'
  },
  {
    id: 4,
    title: 'Documentary Production',
    description: 'Compelling documentary production that tells engaging stories.',
    icon: <Film className="w-12 h-12 text-yellow-500" />,
    link: '/portfolio'
  },
  {
    id: 5,
    title: 'Drone Coverage',
    description: 'Professional aerial photography and videography using advanced drone technology.',
    icon: <Plane className="w-12 h-12 text-yellow-500" />,
    link: '/portfolio'
  },
  {
    id: 7,
    title: 'Commercials',
    description: 'Impactful commercial production that helps businesses tell their story effectively.',
    icon: <Tv className="w-12 h-12 text-yellow-500" />,
    link: '/portfolio'
  },
  {
    id: 8,
    title: 'Live Streaming',
    description: 'Professional live streaming services for events and broadcasts.',
    icon: <Radio className="w-12 h-12 text-yellow-500" />,
    link: '/portfolio'
  },
  {
    id: 9,
    title: 'Website Building',
    description: 'Modern website development that helps your business stand out online.',
    icon: <Globe className="w-12 h-12 text-yellow-500" />,
    link: '/portfolio'
  }
];

const ServicesPage = () => {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/services#media-production-services`,
    name: 'Photography, Videography and Video Production Services in Nairobi',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: [
      { '@type': 'City', name: 'Nairobi' },
      { '@type': 'Country', name: 'Kenya' },
    ],
    serviceType: [
      'Photography',
      'Videography',
      'Corporate video production',
      'Event coverage',
      'Documentary production',
      'Drone coverage',
      'Commercial production',
      'Live streaming',
      'Motion graphics',
      'Digital marketing',
    ],
    url: `${SITE_URL}/services`,
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-gray-100">
        <PageMeta
          title="Photography, Videography & Video Production Services Nairobi"
          description="Explore Nairobi photography, videography, corporate video production, event coverage, documentaries, commercials, live streaming, drone coverage, motion graphics, and digital marketing services."
          canonical="/services"
          keywords={[
            'photography services Nairobi',
            'videography services Kenya',
            'corporate video production Nairobi',
            'event coverage Kenya',
            'drone videography Nairobi',
          ]}
          jsonLd={serviceJsonLd}
        />
        {/* Hero Section */}
        <section className="relative pt-20 pb-8 md:pt-28 md:pb-10 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-0 w-full">
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 w-full"></div>
          </div>

          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 relative z-10 flex flex-col items-center">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-100 mb-3">
                Our Services
              </h1>
              <motion.div
                className="w-16 h-0.5 bg-yellow-500 mx-auto mb-4"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
              <p className="text-sm sm:text-base text-gray-300 mb-2 max-w-2xl mx-auto">
                We offer a comprehensive range of professional media production services to bring your vision to life.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Major Services */}
        <section className="py-7 md:py-9 px-4">
          <div className="mx-auto w-full max-w-7xl">
            <h2 className="text-xl md:text-2xl font-bold text-gray-100 mb-4 text-center">Our Major Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto mb-7">
              {majorServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="group relative bg-zinc-950/35 p-4 rounded-lg hover:bg-yellow-500/10 transition-all duration-300 border border-yellow-500/20 hover:border-yellow-500/60 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/5 transition-all duration-300"></div>
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-yellow-500/15 rounded-lg flex items-center justify-center mb-3 group-hover:bg-yellow-500/25 transition-colors duration-300 text-yellow-500 [&>svg]:h-7 [&>svg]:w-7">
                      {service.icon}
                    </div>
                    <h3 className="text-base font-bold text-yellow-400 mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-300 group-hover:text-gray-100 transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Services */}
            <h3 className="text-lg md:text-xl font-bold text-gray-100 mb-4 text-center mt-6">Additional Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-6xl mx-auto">
              {additionalServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="group relative bg-zinc-950/35 p-4 rounded-lg hover:bg-yellow-500/10 transition-all duration-300 border border-gray-700/60 hover:border-yellow-500/30 overflow-hidden h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/5 transition-all duration-300"></div>
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-yellow-500/20 transition-colors duration-300 text-yellow-500 [&>svg]:h-5 [&>svg]:w-5">
                      {service.icon}
                    </div>
                    <h3 className="text-base font-bold text-gray-100 mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-300 group-hover:text-gray-100 transition-colors duration-300 flex-grow">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center mt-10">
              <h3 className="text-xl md:text-2xl font-bold text-gray-100 mb-4">Ready to start your project?</h3>
              <Link
                to="/contact"
                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2.5 px-6 rounded-full text-sm sm:text-base transition-all duration-300 transform hover:scale-[1.02]"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default ServicesPage;
