import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import carousel images
import img1 from '../../assets/images/kunal-lakhotia.webp';
import img2 from '../../assets/images/pexels-davegarcia.webp';
import img3 from '../../assets/images/pexels-mike.webp';
import img4 from '../../assets/images/valeriya.webp';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [img1, img2, img3, img4];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative min-h-screen flex flex-col font-sans text-gray-900 overflow-hidden bg-[#faf7f4]">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Carousel Images */}
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-transform duration-300"
            style={{
              backgroundImage: `url(${slide})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: idx === currentSlide ? 1 : 0,
            }}
          />
        ))}
        
        {/* Dark Overlay for text visibility */}
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="absolute inset-0 noise-overlay" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* HEADER */}
        <header className="flex items-center justify-between px-8 py-6">
          <div className="flex flex-col">
            <span className="text-2xl text-orange-500 tracking-tight">
              FEASTY
              <span className="block h-[3px] w-10 bg-gradient-to-r from-orange-500 to-red-500 mt-1 rounded-full" />
            </span>
            <span className="text-[11px] tracking-widest uppercase text-zinc-100 mt-1">
              Visual Dining
            </span>
          </div>

          <Link
            to="/choose-register"
            className="text-sm font-semibold px-6 py-2.5 rounded-full border border-white text-white
                     transition"
          >
            Log in
          </Link>
        </header>

        {/* HERO */}
        <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 max-w-5xl leading-[1.05] text-white">
            Don&apos;t just read the menu.
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Watch the flavor.
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-white/80 mb-14 max-w-2xl leading-relaxed font-medium">
            Discover food through short visual reels.
            See it cooked, plated, and served — then go eat.
          </p>

          <Link
            to="/choose-register"
            className="text-base font-bold px-8 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white transition"
          >
            Start Your Journey →
          </Link>

          {/* Carousel Indicators */}
          <div className="absolute bottom-12 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentSlide
                    ? 'bg-orange-500 w-8 h-2'
                    : 'bg-white/40 w-2 h-2 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </main>

        {/* FOOTER */}
        <footer className="py-8 text-center">
          <p className="text-white/60 text-xs tracking-widest uppercase font-semibold">
            © {new Date().getFullYear()} Feasty
          </p>
        </footer>
      </div>

      {/* STYLES */}
      <style>{`
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
