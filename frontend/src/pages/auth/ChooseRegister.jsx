import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Store } from 'lucide-react';
import Navbar from '../../components/Navbar';

const ChooseRegister = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf7f4] px-6 font-sans text-gray-900 relative overflow-hidden">
      
      <Navbar />
      
      {/* Subtle background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="w-full max-w-3xl relative z-10 pt-24">

      
      
        {/* Choices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Customer */}
          <div className="group border border-gray-200 rounded-3xl p-10 bg-white/80 backdrop-blur-sm transition duration-300 hover:border-gray-400 hover:shadow-lg hover:-translate-y-1">
            
            <div className="mb-6 p-4 w-14 h-14 rounded-2xl bg-gray-100 group-hover:bg-orange-100 transition duration-300">
              <UtensilsCrossed size={24} className="text-gray-800 group-hover:text-orange-600 transition duration-300" />
            </div>

            <h3 className="text-2xl font-bold mb-3">
              Order food
            </h3>
            <p className="text-sm text-gray-600 mb-10 leading-relaxed">
              Discover dishes through visual reels, save your favorites, and order from nearby places.
            </p>

            <div className="flex gap-3">
              <Link
                to="/login"
                className="flex-1 text-center py-3 text-sm font-semibold bg-black text-white rounded-xl hover:bg-gray-800 transition duration-200 active:scale-95"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="flex-1 text-center py-3 text-sm font-semibold border border-gray-300 rounded-xl hover:border-black hover:bg-gray-50 transition duration-200"
              >
                Log in
              </Link>
            </div>
          </div>

          {/* Partner */}
          <div className="group border border-gray-200 rounded-3xl p-10 bg-white/80 backdrop-blur-sm transition duration-300 hover:border-gray-400 hover:shadow-lg hover:-translate-y-1">
            
            <div className="mb-6 p-4 w-14 h-14 rounded-2xl bg-gray-100 group-hover:bg-orange-100 transition duration-300">
              <Store size={24} className="text-gray-800 group-hover:text-orange-600 transition duration-300" />
            </div>

            <h3 className="text-2xl font-bold mb-3">
              Sell food
            </h3>
            <p className="text-sm text-gray-600 mb-10 leading-relaxed">
              Showcase your dishes with visual reels and reach hungry customers nearby.
            </p>

            <div className="flex gap-3">
              <Link
                to="/login"
                className="flex-1 text-center py-3 text-sm font-semibold bg-black text-white rounded-xl hover:bg-gray-800 transition duration-200 active:scale-95"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="flex-1 text-center py-3 text-sm font-semibold border border-gray-300 rounded-xl hover:border-black hover:bg-gray-50 transition duration-200"
              >
                Log in
              </Link>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-400 tracking-widest uppercase">
            © {new Date().getFullYear()} Feasty
          </p>
        </div>

      </div>
    </div>
  );
};

export default ChooseRegister;
