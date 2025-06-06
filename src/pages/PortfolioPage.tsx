import { motion } from 'framer-motion';
import { useState } from 'react';
import PortfolioShowcase from '../components/PortfolioShowcase';

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Project One',
      category: 'commercial',
      image: '/images/portfolio/1.jpg',
      client: 'Client Name',
      year: '2023'
    },
    {
      id: 2,
      title: 'Project Two',
      category: 'wedding',
      image: '/images/portfolio/2.jpg',
      client: 'Client Name',
      year: '2023'
    },
    {
      id: 3,
      title: 'Project Three',
      category: 'music',
      image: '/images/portfolio/3.jpg',
      client: 'Client Name',
      year: '2023'
    },
    {
      id: 4,
      title: 'Project Four',
      category: 'commercial',
      image: '/images/portfolio/4.jpg',
      client: 'Client Name',
      year: '2023'
    },
    {
      id: 5,
      title: 'Project Five',
      category: 'wedding',
      image: '/images/portfolio/5.jpg',
      client: 'Client Name',
      year: '2023'
    },
    {
      id: 6,
      title: 'Project Six',
      category: 'music',
      image: '/images/portfolio/6.jpg',
      client: 'Client Name',
      year: '2023'
    },
  ];

  const filters = [
    { id: 'all', name: 'All Projects' },
    { id: 'commercial', name: 'Commercial' },
    { id: 'wedding', name: 'Wedding' },
    { id: 'music', name: 'Music Videos' },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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
              Our Portfolio
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
              A showcase of our best work and creative projects
            </motion.p>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <div className="container mx-auto px-4 py-16">
        <PortfolioShowcase 
          items={projects}
          itemsPerPage={9}
          showFilter={true}
          className="mt-12"
        />
      </div>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-r from-yellow-500/10 to-yellow-500/5">
        <div className="container mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Have a Project in Mind?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's create something extraordinary together. Get in touch to discuss your next project.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Start a Project
          </a>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
