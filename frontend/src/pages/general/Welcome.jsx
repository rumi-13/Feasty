import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

const Welcome = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userName = 'User';

  const hour = new Date().getHours();
  let greeting = 'Welcome';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 18) greeting = 'Good afternoon';
  else greeting = 'Good evening';

  return (
    <div className="relative min-h-screen overflow-hidden font-sans text-gray-900 bg-[#faf7f4]">

      {/* Top Right Profile Icon */}
      <button
        onClick={() => navigate(`/user/profile/${id}`)}
        className="absolute top-6 right-6 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 text-gray-600 hover:text-black transition"
        title="View Profile"
      >
        <User size={18} />
      </button>

     

      {/* GRAIN */}
      <div className="absolute inset-0 z-0 opacity-[0.035] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9ImJsYWNrIi8+PC9zdmc+')]" />

      {/* BRAND */}
      <div className="absolute top-6 left-6 z-10 text-xl text-orange-500 tracking-tight font-bold">
        FEASTY
      </div>

      {/* CONTENT */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-xl group">

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 transition-transform duration-300 group-hover:translate-y-[-2px]">
            {greeting}, {userName}.
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed mb-12">
            Food isn’t chosen by reading.  
            It’s chosen by seeing.
          </p>

          {/* CTA */}
          <div className="relative inline-block">
            <Link
              to={`/${id}/food-reels`}
              className="relative z-10 inline-block px-12 py-4 bg-black text-white text-sm font-bold rounded-full
                         hover:bg-gray-800 transition-all"
            >
              Watch Food Reels →
            </Link>

            <div className="absolute inset-0 rounded-full blur-xl bg-black/20 scale-110 opacity-0
                            group-hover:opacity-100 transition" />
          </div>

        </div>
      </div>

     

    </div>
  );
};

export default Welcome;