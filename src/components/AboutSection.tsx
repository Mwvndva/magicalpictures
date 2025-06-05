import React, { useRef } from 'react';
import SparkBackground from './SparkBackground';

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="bg-black relative overflow-hidden py-32">
      <SparkBackground />
      <div className="container mx-auto px-4 sm:px-6 h-full">
        <div 
          className="flex flex-col justify-center items-center"
        >
        <div className="w-full max-w-2xl text-center">
          <div className="h-full flex flex-col justify-center">
            <h2 
              className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-yellow-400 uppercase tracking-wide mb-4 sm:mb-6"
            >
              ABOUT US
            </h2>
            
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
              <div>
                <p 
                  className="font-body text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-2 sm:mb-3 md:mb-4"
                >
                  At Magical Pictures, we believe every moment has a story worth telling. Our team of passionate videographers specializes in capturing the essence of your most precious memories.
                </p>
                <p 
                  className="font-body text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-2 sm:mb-3 md:mb-4"
                >
                  From weddings to corporate events, from music videos to documentaries, we bring a cinematic approach to every project.
                </p>
              </div>
              
              {/* Team Video Placeholder */}
              <div className="w-full aspect-video rounded-lg overflow-hidden mb-6 sm:mb-8 md:mb-10">
                <video 
                  controls 
                  className="w-full h-full object-cover"
                  poster="https://via.placeholder.com/1280x720.png?text=Team+Video+Thumbnail"
                >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center">
                  <h3 
                    className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1 sm:mb-2 md:mb-3"
                  >
                    500+
                  </h3>
                  <p 
                    className="font-body text-sm sm:text-base md:text-lg text-gray-300"
                  >
                    Projects
                  </p>
                </div>
                <div className="text-center">
                  <h3 
                    className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1 sm:mb-2 md:mb-3"
                  >
                    50+
                  </h3>
                  <p 
                    className="font-body text-sm sm:text-base md:text-lg text-gray-300"
                  >
                    Clients
                  </p>
                </div>
                <div className="text-center">
                  <h3 
                    className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1 sm:mb-2 md:mb-3"
                  >
                    5+
                  </h3>
                  <p 
                    className="font-body text-sm sm:text-base md:text-lg text-gray-300"
                  >
                    Years
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default AboutSection;
