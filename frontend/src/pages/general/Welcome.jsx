import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Welcome = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userName = 'User';

  const hour = new Date().getHours();
  let greeting = 'Welcome';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 18) greeting = 'Good afternoon';
  else greeting = 'Good evening';

  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const move = (e) => {
      setPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="relative min-h-screen overflow-hidden font-sans text-gray-900 bg-[#faf7f4]">

      {/* Top Right Logout */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 z-20 flex items-center gap-2 text-xs text-gray-600 hover:text-black transition"
      >
        <LogOut size={16} />
        Logout
      </button>

      {/* INTERACTIVE BACKGROUND */}
      <div
        className="absolute inset-0 z-0 transition-all duration-300"
        style={{
          background: `
            radial-gradient(
              circle at ${pos.x}% ${pos.y}%,
              rgba(251,146,60,0.28),
              transparent 35%
            ),
            radial-gradient(
              circle at 70% 80%,
              rgba(239,68,68,0.18),
              transparent 45%
            )
          `,
        }}
      />

      {/* GRAIN */}
      <div className="absolute inset-0 z-0 opacity-[0.035] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9ImJsYWNrIi8+PC9zdmc+')]" />

      {/* BRAND */}
      <div className="absolute top-6 left-6 z-10 text-xl font-black tracking-tight">
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

      {/* FOOTER */}
      <div className="absolute bottom-8 w-full text-center text-xs text-gray-400 tracking-widest uppercase">
        Visual Dining
      </div>

    </div>
  );
};

export default Welcome;
