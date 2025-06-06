import { Link } from 'react-router-dom';
import HeroSection from "../components/HeroSection";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center">
      <div className="w-full">
        <HeroSection />
      </div>
      
      {/* Quick Navigation */}
      <section className="w-full py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-wide mb-4">
              Our Services
            </h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
            <p className="font-body text-gray-300 max-w-2xl mx-auto">
              Explore our range of professional media production services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mx-auto">
            <Link 
              to="/portfolio" 
              className="group relative bg-gray-900/50 p-8 rounded-lg hover:bg-yellow-500/10 transition-all duration-300 border border-gray-800 hover:border-yellow-500/30 overflow-hidden"
            >
              <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/5 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-yellow-500/20 transition-colors duration-300">
                  <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">Portfolio</h3>
                <p className="text-gray-300 group-hover:text-white transition-colors duration-300">View our latest work and creative projects that showcase our expertise in visual storytelling.</p>
              </div>
            </Link>
            
            <Link 
              to="/brands" 
              className="group relative bg-gray-900/50 p-8 rounded-lg hover:bg-yellow-500/10 transition-all duration-300 border border-gray-800 hover:border-yellow-500/30 overflow-hidden"
            >
              <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/5 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-yellow-500/20 transition-colors duration-300">
                  <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">Brands</h3>
                <p className="text-gray-300 group-hover:text-white transition-colors duration-300">Discover the prestigious brands that have trusted us with their visual storytelling needs.</p>
              </div>
            </Link>
            
            <Link 
              to="/contact" 
              className="group relative bg-gray-900/50 p-8 rounded-lg hover:bg-yellow-500/10 transition-all duration-300 border border-gray-800 hover:border-yellow-500/30 overflow-hidden"
            >
              <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/5 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-yellow-500/20 transition-colors duration-300">
                  <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">Get in Touch</h3>
                <p className="text-gray-300 group-hover:text-white transition-colors duration-300">Ready to bring your vision to life? Contact us today to start your next project.</p>
              </div>
            </Link>
          </div>
          
          <div className="w-full text-center mt-16">
            <Link 
              to="/about" 
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
