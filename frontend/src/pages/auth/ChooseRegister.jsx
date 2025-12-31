import React from 'react';
import { Link } from 'react-router-dom';

const ChooseRegister = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf7f4] px-6 font-sans text-gray-900">
      <div className="w-full max-w-3xl">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Join Feasty
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            Choose how you want to use the platform.
          </p>
        </div>

        {/* Choices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Customer */}
          <div className="group border border-gray-200 rounded-2xl p-8 bg-white transition hover:border-black">
            <h3 className="text-xl font-bold mb-2">
              Order food
            </h3>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              Discover dishes through reels, save favorites, and order from nearby places.
            </p>

            <div className="flex gap-3">
              <Link
                to="/user/register"
                className="flex-1 text-center py-2.5 text-sm font-semibold bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                Sign up
              </Link>
              <Link
                to="/user/login"
                className="flex-1 text-center py-2.5 text-sm font-semibold border border-gray-300 rounded-lg hover:border-black transition"
              >
                Log in
              </Link>
            </div>
          </div>

          {/* Partner */}
          <div className="group border border-gray-200 rounded-2xl p-8 bg-white transition hover:border-black">
            <h3 className="text-xl font-bold mb-2">
              Sell food
            </h3>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              Showcase your dishes with reels and reach hungry customers nearby.
            </p>

            <div className="flex gap-3">
              <Link
                to="/partner/register"
                className="flex-1 text-center py-2.5 text-sm font-semibold bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                Sign up
              </Link>
              <Link
                to="/partner/login"
                className="flex-1 text-center py-2.5 text-sm font-semibold border border-gray-300 rounded-lg hover:border-black transition"
              >
                Log in
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ChooseRegister;
