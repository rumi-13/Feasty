import React from 'react';
import { Link } from 'react-router-dom';
import VideoReels from '../components/VideoReels';

const Welcome = () => {
  // Mock data - in a real app, this would come from your Auth Context or User State
  const userName = "Alex"; 
  const currentTime = new Date().getHours();
  
  let greeting;
  if (currentTime < 12) greeting = "Good morning";
  else if (currentTime < 18) greeting = "Good afternoon";
  else greeting = "Good evening";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      
      {/* Top Navigation Bar */}
      <nav className="bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
        <div className="text-xl font-bold tracking-tighter">FoodApp.</div>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block text-sm font-medium text-gray-500">
            {userName}
          </div>
          <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
            {userName.charAt(0)}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 py-10">
        
        {/* Welcome Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            {greeting}, {userName}.
          </h1>
          <p className="mt-2 text-gray-500 text-lg">
            What are you in the mood for today?
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-12">
          <input
            type="text"
            className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-black focus:border-black block p-4 pl-12 shadow-sm transition-all duration-200 outline-none"
            placeholder="Search for restaurants, cuisines, or dishes..."
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            
            {/* Card 1: Order Food */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer group">
                <div className="h-10 w-10 bg-gray-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                    <span className="text-xl">🍕</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Order Food</h3>
                <p className="text-sm text-gray-500 mt-1">Find nearby restaurants and order now.</p>
            </div>

            {/* Card 2: Past Orders */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer group">
                <div className="h-10 w-10 bg-gray-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                    <span className="text-xl">📄</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Your Orders</h3>
                <p className="text-sm text-gray-500 mt-1">View active orders and past history.</p>
            </div>

            {/* Card 3: Favorites */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer group">
                <div className="h-10 w-10 bg-gray-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                    <span className="text-xl">❤️</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Favorites</h3>
                <p className="text-sm text-gray-500 mt-1">Re-order your saved meals instantly.</p>
            </div>
        </div>

        {/* Recent Activity Section (Mock) */}
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold tracking-tight">Recent Activity</h2>
                <button className="text-sm font-medium text-gray-500 hover:text-black">View all</button>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {/* List Item */}
                <div className="p-4 sm:p-6 border-b border-gray-50 flex items-center justify-between hover:bg-gray-50 transition">
                    <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center text-lg">🥣</div>
                        <div>
                            <p className="font-semibold text-gray-900">The Salad Bar</p>
                            <p className="text-xs text-gray-500">Yesterday • Delivered</p>
                        </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">$24.50</span>
                </div>

                {/* List Item */}
                <div className="p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50 transition">
                    <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center text-lg">🍔</div>
                        <div>
                            <p className="font-semibold text-gray-900">Burger Joint</p>
                            <p className="text-xs text-gray-500">3 days ago • Delivered</p>
                        </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">$18.20</span>
                </div>
            </div>
        </div>
          <div>
           <Link to='/food-reels'><button className='p-5 m-5 bg-black text-white rounded-md'>WATCH REELS</button></Link>
          </div>
      </main>
    </div>
  );
};

export default Welcome;