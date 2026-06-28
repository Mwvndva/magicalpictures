import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MENU_ITEMS } from '@/lib/constants';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const preloadRoute = (path: string) => {
    switch (path) {
      case '/': import('../pages/HomePage'); break;
      case '/about': import('../pages/AboutPage'); break;
      case '/services': import('../pages/ServicesPage'); break;
      case '/portfolio': import('../pages/PortfolioPage'); break;
      case '/brands': import('../pages/BrandsPage'); break;
      case '/booking': import('../pages/BookingPage'); break;
      case '/contact': import('../pages/ContactPage'); break;
      default: break;
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="py-2">
          <Link
            to="/"
            className="inline-flex ml-3 h-11 w-11 items-center justify-center sm:ml-4 sm:h-12 sm:w-12"
            onMouseEnter={() => preloadRoute('/')}
          >
            <img
              src="/assets/logo/logo.png"
              alt="Magical Pictures Logo"
              loading="eager"
              decoding="async"
              width={56}
              height={56}
              className="h-9 w-9 object-contain rounded-md sm:h-10 sm:w-10"
            />
          </Link>
        </div>
      </nav>

      {/* Menu Button */}
      <button
        className={`fixed top-4 right-4 z-50 flex h-12 w-12 flex-col items-center justify-center rounded-full bg-yellow-500 transition-all duration-300 shadow-md hover:bg-yellow-400 sm:top-5 sm:right-5 sm:h-14 sm:w-14 ${isMenuOpen ? 'bg-yellow-500' : ''
          }`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`block h-0.5 w-6 bg-white transition-all duration-300 sm:w-7 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1.5'
            }`}
        />
        <span
          className={`block h-0.5 w-6 bg-white transition-all duration-300 sm:w-7 ${isMenuOpen ? 'opacity-0' : 'opacity-100 mb-1.5'
            }`}
        />
        <span
          className={`block h-0.5 w-6 bg-white transition-all duration-300 sm:w-7 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
        />
      </button>

      {/* Right Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 sm:w-72 bg-zinc-950/95 backdrop-blur-sm z-40 transition-all duration-300 ease-in-out transform-gpu ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } border-l border-gray-700 max-h-screen`}
      >
        <nav className="h-full flex flex-col pt-20 px-4 sm:px-5 overflow-y-auto">
          <ul className="space-y-3">
            {MENU_ITEMS.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onMouseEnter={() => preloadRoute(item.path)}
                  className={`block rounded-md px-3 py-2.5 text-base font-medium uppercase tracking-wide transition-all duration-300 hover:bg-gray-700 sm:text-lg ${location.pathname === item.path
                    ? 'text-yellow-500 bg-gray-700'
                    : 'text-gray-100 hover:text-yellow-500'
                    }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Social Links */}
          <div className="mt-auto pb-8 pt-8 border-t border-gray-700">
            <div className="flex justify-center space-x-4">
              <a
                href="https://www.facebook.com/share/1BqkE5K5FL/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-500 transition-colors"
                aria-label="Facebook"
              >
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://x.com/magicalpkenya?s=21"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-500 transition-colors"
                aria-label="X (Twitter)"
              >
                <span className="sr-only">X (Twitter)</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.3174 10.7749L19.145 3H17.7646L12.7039 9.88256L8.66193 3H3.2002L9.33991 12.8955L3.2002 21H4.58096L9.98858 13.7878L14.3135 21H19.7752L13.3171 10.7749H13.3174ZM10.822 12.9738L9.92872 11.5136L4.86499 4.16971H7.84254L11.9462 10.7289L12.8395 12.1891L18.2098 19.8805H15.2323L10.8217 12.9741L10.822 12.9738Z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/magical_pictures_productions?igsh=MXdlcHEwY2lyb3ZtbQ==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.976.045-1.505.207-1.858.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@magicalpicturesproductions5452?si=HQDux0VALQJgyQX6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-500 transition-colors"
                aria-label="YouTube"
              >
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <p className="mt-4 text-center text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Magical Pictures. All rights reserved.
            </p>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
