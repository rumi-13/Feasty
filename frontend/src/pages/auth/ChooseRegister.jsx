import React from 'react';
import { Link } from 'react-router-dom';

const ChooseRegister = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-4xl w-full space-y-10">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Join FoodApp
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Select your account type to get started. Are you here to order delicious meals or manage a restaurant?
          </p>
        </div>

        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 sm:px-0">
          
          {/* Customer Choice */}
          <div className="group relative flex flex-col items-center p-8 sm:p-10 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="h-20 w-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-colors duration-300">
               <span className="text-4xl">🍕</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">I want to order food</h3>
            <p className="mt-3 text-center text-gray-500 text-sm leading-relaxed max-w-xs mb-8">
              Create a personal account to browse menus, save favorites, and track deliveries.
            </p>
            
            <div className="w-full flex flex-col sm:flex-row gap-3">
              <Link 
                to="/user/register" 
                className="flex-1 text-center px-6 py-3 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors"
              >
                Sign up
              </Link>
              <Link 
                to="/user/login" 
                className="flex-1 text-center px-6 py-3 bg-gray-100 text-black text-sm font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Log in
              </Link>
            </div>
          </div>

          {/* Partner Choice */}
          <div className="group relative flex flex-col items-center p-8 sm:p-10 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="h-20 w-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-colors duration-300">
               <span className="text-4xl">🏪</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">I want to sell food</h3>
            <p className="mt-3 text-center text-gray-500 text-sm leading-relaxed max-w-xs mb-8">
              Register your restaurant, upload your menu, and reach more customers nearby.
            </p>
            
            <div className="w-full flex flex-col sm:flex-row gap-3">
              <Link 
                to="/partner/register" 
                className="flex-1 text-center px-6 py-3 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors"
              >
                Sign up
              </Link>
              <Link 
                to="/partner/login" 
                className="flex-1 text-center px-6 py-3 bg-gray-100 text-black text-sm font-semibold rounded-xl hover:bg-gray-200 transition-colors"
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