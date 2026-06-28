import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Page Content */}
      <main className="relative z-10 min-h-screen">{children}</main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-700 py-4 px-4 sm:px-6 bg-black">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Magical Pictures. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 sm:mt-0">
            Powered by Evolve
          </p>
        </div>
      </footer>
    </div>
  );
}
