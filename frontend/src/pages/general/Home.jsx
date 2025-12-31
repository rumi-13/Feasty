import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col font-sans text-gray-900 overflow-hidden bg-[#faf7f4]">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 animated-bg" />
        <div className="absolute inset-0 noise-overlay" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* HEADER */}
        <header className="flex items-center justify-between px-8 py-6">
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight">
              FEASTY
              <span className="block h-[3px] w-10 bg-gradient-to-r from-orange-500 to-red-500 mt-1 rounded-full" />
            </span>
            <span className="text-[11px] tracking-widest uppercase text-gray-500 mt-1">
              Visual Dining
            </span>
          </div>

          <Link
            to="/choose-register"
            className="text-sm font-semibold px-6 py-2.5 rounded-full border border-black text-black
                       hover:bg-black hover:text-white transition"
          >
            Log in
          </Link>
        </header>

        {/* HERO */}
        <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 max-w-5xl leading-[1.05]">
            Don&apos;t just read the menu.
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
              Watch the flavor.
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-gray-600 mb-14 max-w-2xl leading-relaxed font-medium">
            Discover food through short visual reels.
            See it cooked, plated, and served — then go eat.
          </p>

          <Link
            to="/choose-register"
            className="text-base font-bold border-b-2 border-black pb-1
                       hover:text-orange-600 hover:border-orange-600 transition"
          >
            Start Watching Reels →
          </Link>
        </main>

        {/* FOOTER */}
        <footer className="py-8 text-center">
          <p className="text-gray-400 text-xs tracking-widest uppercase font-semibold">
            © {new Date().getFullYear()} Feasty
          </p>
        </footer>
      </div>

      {/* STYLES */}
      <style>{`
        .animated-bg {
          background:
            radial-gradient(circle at 20% 20%, rgba(251,146,60,0.28), transparent 40%),
            radial-gradient(circle at 80% 30%, rgba(239,68,68,0.25), transparent 45%),
            radial-gradient(circle at 50% 80%, rgba(250,204,21,0.28), transparent 40%);
          background-size: 200% 200%;
          animation: gradientShift 28s ease-in-out infinite;
        }

        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .noise-overlay {
          opacity: 0.04;
          background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9ImJsYWNrIi8+PC9zdmc+");
          mix-blend-overlay;
        }
      `}</style>
    </div>
  );
};

export default Home;
