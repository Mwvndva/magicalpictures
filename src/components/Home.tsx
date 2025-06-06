import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="w-full h-full object-cover opacity-80 max-h-screen"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          {/* Fallback gradient if video doesn't load */}
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl text-white uppercase tracking-wider hover:text-yellow-400 transition-colors duration-300">
            MAGICAL LENS
          </h1>
          <p className="font-body text-xl md:text-2xl text-gray-300 mt-8 max-w-2xl mx-auto hover:text-yellow-400 transition-colors duration-300">
            Cinematic Videography That Tells Your Story
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/magical" 
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition-colors duration-300 text-lg"
            >
              Explore Our Work
            </Link>
            <Link 
              to="/contact" 
              className="inline-block border-2 border-white hover:border-yellow-400 text-white hover:text-yellow-400 font-bold py-3 px-8 rounded-full transition-colors duration-300 text-lg"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
