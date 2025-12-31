import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Upload, Video, LogOut } from "lucide-react";

const WelcomePartner = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 font-sans relative">

      {/* Top Right Logout */}
      <button
        onClick={handleLogout}
        className="absolute top-5 right-5 flex items-center gap-2 text-xs text-gray-300 hover:text-white transition"
      >
        <LogOut size={16} />
        Logout
      </button>

      <div className="max-w-xl w-full text-center">

        {/* Brand */}
        <div className="mb-8 text-2xl font-black tracking-tight">
          FEASTY
        </div>

        {/* Welcome */}
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
          Welcome to Feasty
        </h1>

        <p className="text-gray-400 text-base leading-relaxed mb-12">
          This is your creator space.  
          Upload short food videos and let customers discover your dishes visually.
        </p>

        {/* Primary Action */}
        <button
          onClick={() => navigate(`/partner/create-food`)}
          className="
            w-full sm:w-auto
            inline-flex items-center justify-center gap-3
            px-10 py-4
            bg-white text-black
            font-bold text-sm
            rounded-full
            hover:bg-gray-200
            transition
          "
        >
          <Upload size={18} />
          Upload Your First Reel
        </button>

        {/* Secondary hint */}
        <div className="mt-8 text-xs text-gray-500 flex items-center justify-center gap-2">
          <Video size={14} />
          Short vertical videos work best
        </div>

      </div>
    </div>
  );
};

export default WelcomePartner;
