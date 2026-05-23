import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical } from 'lucide-react';
import ConfirmModal from '../components/ConfirmModal';
import axios from '../utils/axios';

const Navbar = () => {
  const navigate = useNavigate();

  const handleBrandClick = () => {
    const userType = localStorage.getItem('userType');
    const userId = localStorage.getItem('userId');

    if (userType === 'user' && userId) {
      navigate(`/welcome/${userId}`);
      return;
    }

    if (userType === 'foodpartner') {
      navigate('/partner/welcome');
      return;
    }

    navigate('/');
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('foodpartnerName');
    localStorage.removeItem('foodpartnerEmail');
    localStorage.removeItem('foodpartnerPhoto');
    showToast('Logged out successfully', 'success');
    setTimeout(() => navigate('/login'), 300);
  };

  const confirmDelete = async () => {
    let deleted = false;
    try {
      const id = localStorage.getItem('userId');
      if (id) await axios.delete(`/api/auth/foodpartner/${id}`);
      deleted = true;
    } catch (err) {
      console.error('Error deleting partner:', err);
      showToast('Failed to delete account', 'error');
    }

    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('foodpartnerName');
    localStorage.removeItem('foodpartnerEmail');
    localStorage.removeItem('foodpartnerPhoto');
    setShowConfirm(false);
    if (deleted) {
      showToast('Account deleted', 'success');
      setTimeout(() => navigate('/'), 800);
    } else {
      setTimeout(() => navigate('/'), 1200);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-8 py-4 sm:py-6 bg-white/80 backdrop-blur-md border-b border-gray-200/30 pointer-events-none">
      <div className="flex items-center justify-between pointer-events-auto">
        <button
          onClick={handleBrandClick}
          className="text-left"
          aria-label="Feasty home"
        >
          <span className="text-lg sm:text-xl font-black tracking-tight text-orange-500">FEASTY</span>
          <span className="block h-[2px] w-8 bg-gradient-to-r from-orange-500 to-red-500 mt-1 rounded-full" />
          <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-gray-600 mt-2">Visual Dining</span>
        </button>

        {/* Right-side: profile + actions for partners */}
        <div className="flex items-center gap-3">
          {localStorage.getItem('userType') === 'foodpartner' && (
            <>
              <button
                onClick={() => {
                  const id = localStorage.getItem('userId');
                  if (id) navigate(`/partner/profile/${id}`);
                  else navigate('/login');
                }}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 text-gray-600 hover:text-black transition"
                title="Profile"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                  <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" />
                </svg>
              </button>

              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 text-gray-600 hover:text-black transition"
                  title="Actions"
                >
                  <MoreVertical size={16} />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-md shadow-lg overflow-hidden z-50 border border-gray-200">
                    <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="w-full text-left px-4 py-3 hover:bg-gray-50">Logout</button>
                    <button onClick={() => { setMenuOpen(false); setShowConfirm(true); }} className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-50">Close account</button>
                  </div>
                )}
              </div>
            </>
          )}
          {/* Toast placed after profile icon */}
          {toast.visible && (
            <div className={`ml-2 px-3 py-2 rounded-lg text-sm font-medium ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
              {toast.message}
            </div>
          )}
        </div>
      </div>

      <ConfirmModal open={showConfirm} title="Delete account" message="Are you sure you want to delete your account and all your videos? This action cannot be undone." onConfirm={confirmDelete} onCancel={() => setShowConfirm(false)} />
    </div>
  );
};

export default Navbar;
