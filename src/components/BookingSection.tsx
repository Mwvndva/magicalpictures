import React, { useRef } from 'react';
import { BookOpen, Camera, Users } from 'lucide-react';
import SparkBackground from './SparkBackground';

const BookingSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="pt-32 pb-3072 bg-black relative overflow-hidden">
      <SparkBackground />
      <div className="container mx-auto px-4 sm:px-6 h-full">
        <div 
          className="h-full flex justify-center items-center"
        >
          <div className="w-full max-w-2xl">
            <div className="bg-black text-white p-6 rounded-xl shadow-2xl flex flex-col justify-center items-center">
              <h2 
                className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-yellow-400 uppercase tracking-wide mb-6 whitespace-nowrap"
              >
                Book Your Session
              </h2>
              <p 
                className="font-body text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 text-center mb-4"
              >
                Ready to capture your special moments? Contact us to schedule your videography session.
              </p>
              <div className="flex space-x-4 mb-4">
                <div className="flex flex-col items-center">
                  <Camera size={24} className="text-yellow-400 mb-1" />
                  <span 
                    className="font-body text-base sm:text-lg md:text-xl text-gray-300"
                  >
                    Videography
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <Users size={24} className="text-yellow-400 mb-1" />
                  <span 
                    className="font-body text-base sm:text-lg md:text-xl text-gray-300"
                  >
                    Team
                  </span>
                </div>
              </div>
              <button 
                className="bg-yellow-400 text-black font-bold py-4 px-8 rounded-full hover:bg-yellow-500 transition-colors duration-300 text-lg sm:text-xl md:text-2xl"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
