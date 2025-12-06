import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
      
      {/* Navbar (Minimal) */}
      <nav className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <div className="text-xl font-bold tracking-tighter">FEASTY</div>
        <div className="space-x-6 hidden sm:block">
            <Link to="/choose-register" className="text-sm font-medium text-gray-500 hover:text-black transition">Log in</Link>
            <Link to="choose-register" className="text-sm font-medium bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition">Sign up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-16 sm:py-24">
        
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl text-black">
          Good food, <br className="hidden sm:block" />
          <span className="text-gray-400">delivered simply.</span>
        </h1>
        
        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl leading-relaxed">
          Experience the fastest way to get your favorite meals delivered to your doorstep. 
          Fresh ingredients, trusted partners, minimal hassle.
        </p>

       
      </main>

      {/* Minimal Footer */}
      <footer className="py-8 text-center border-t border-gray-50">
        <p className="text-gray-400 text-xs tracking-wide uppercase font-medium">
          &copy; {new Date().getFullYear()} FoodApp Inc. Minimal Design.
        </p>
      </footer>
    </div>
  );
};

export default Home;