import React from 'react';

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-8 py-4 sm:py-6 pointer-events-none">
      <div className="flex flex-col pointer-events-auto">
        <span className="text-lg sm:text-xl font-black tracking-tight text-orange-500">
          FEASTY
        </span>
        <span className="block h-[2px] w-8 bg-gradient-to-r from-orange-500 to-red-500 mt-1 rounded-full" />
        <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-gray-600 mt-2">
          Visual Dining
        </span>
      </div>
    </div>
  );
};

export default Navbar;
