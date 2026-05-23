import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Upload, Video, LogOut, MoreVertical } from "lucide-react";
import ConfirmModal from '../../components/ConfirmModal';
import axios from '../../utils/axios';
import { clearFoodPartnerData } from '../../utils/localStorage';

const WelcomePartner = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const partnerId = id || localStorage.getItem('userId');

  const handleLogout = () => {
    clearFoodPartnerData();
    navigate('/login');
  };

  const confirmDelete = async () => {
    try {
      if (partnerId) await axios.delete(`/api/auth/foodpartner/${partnerId}`);
    } catch (err) {
      console.error('Error deleting partner:', err);
    }
    clearFoodPartnerData();
    setShowConfirm(false);
    navigate('/');
  };

  return (
    <div className="relative min-h-screen overflow-hidden font-sans text-gray-900 bg-[#faf7f4]">

      {/* Top Right Actions + Profile Icon */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 text-gray-600 hover:text-black transition"
          title="Actions"
        >
          <MoreVertical size={16} />
        </button>

        <button
          onClick={() => {
            const pid = id || localStorage.getItem('userId');
            if (pid) navigate(`/partner/profile/${pid}`);
            else navigate('/login');
          }}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 text-gray-600 hover:text-black transition"
          title="View Profile"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" />
          </svg>
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-12 mt-1 w-44 bg-white text-black rounded-md shadow-lg overflow-hidden z-50 border border-gray-200">
            <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="w-full text-left px-4 py-3 hover:bg-gray-50">Logout</button>
            <button onClick={() => { setMenuOpen(false); setShowConfirm(true); }} className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-50">Close account</button>
          </div>
        )}

        <ConfirmModal
          open={showConfirm}
          title="Delete account"
          message="Are you sure you want to delete your account and all your videos? This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      </div>

      {/* BRAND */}
      <div className="absolute top-6 left-6 z-10 text-xl text-orange-500 tracking-tight font-bold">
        FEASTY
      </div>

      {/* CONTENT */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-xl group">

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Welcome, Partner.
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed mb-12">
            This is your creator space. Upload short food videos and let customers discover your dishes visually.
          </p>

          {/* CTA */}
          <div className="relative inline-block">
            <button
              onClick={() => navigate(`/partner/create-food`)}
              className="relative z-10 inline-block px-12 py-4 bg-black text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-all"
            >
              Upload Your Food Reels
            </button>

            <div className="absolute inset-0 rounded-full blur-xl bg-black/20 scale-110 opacity-0 group-hover:opacity-100 transition" />
          </div>

        </div>
      </div>

    </div>
  );
};

export default WelcomePartner;
