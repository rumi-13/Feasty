import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import ConfirmModal from '../../components/ConfirmModal';
import AuthCard from '../../components/AuthCard';
import axios from '../../utils/axios';
import { clearUserData } from '../../utils/localStorage';

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = id || localStorage.getItem('userId');
      const userType = localStorage.getItem('userType');

      if (!userId || userType !== 'user') {
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get(`/api/auth/user/${userId}`);
        const u = res.data.user;
        setUser({
          _id: u.id,
          fullName: u.fullName || localStorage.getItem('userFullName') || 'User',
          email: u.email || localStorage.getItem('userEmail') || 'user@feasty.com',
          photoURL: u.photoURL || localStorage.getItem('userPhoto') || null,
          createdAt: u.createdAt || new Date().toISOString(),
        });
        // sync localStorage
        localStorage.setItem('userFullName', u.fullName || localStorage.getItem('userFullName') || 'User');
        localStorage.setItem('userEmail', u.email || localStorage.getItem('userEmail') || '');
        if (u.photoURL) localStorage.setItem('userPhoto', u.photoURL);
      } catch (err) {
        // fallback to localStorage if API call fails
        const userFullName = localStorage.getItem('userFullName');
        const userEmail = localStorage.getItem('userEmail');
        setUser({
          _id: userId,
          fullName: userFullName || 'User',
          email: userEmail || 'user@feasty.com',
          photoURL: localStorage.getItem('userPhoto') || null,
          createdAt: new Date().toISOString(),
        });
      }
    };

    fetchUser();
  }, [id, navigate]);

  const handleLogout = () => {
    clearUserData();
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/auth/user/${user._id}`);
    } catch (err) {
      console.error('Error deleting account:', err);
      // proceed to clear local data regardless
    }

    clearUserData();
    setShowConfirm(false);
    navigate('/login');
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };


  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 relative pt-24">
      <Navbar />
      <AuthCard>
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">My Profile</h2>
          <p className="mt-2 text-sm text-gray-500">Your account information</p>
        </div>

        <ConfirmModal
          open={showConfirm}
          title="Delete account"
          message="Are you sure you want to delete your account? This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />

        <div className="space-y-6">
          {/* Avatar */}
          <div className="flex justify-center">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.fullName}
                className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center">
                <span className="text-2xl text-white font-bold">
                  {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
            )}
          </div>

          {/* Full Name */}
          <div className="border-b border-gray-200 pb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <p className="text-base text-gray-900">{user.fullName}</p>
          </div>

          {/* Email */}
          <div className="border-b border-gray-200 pb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <p className="text-base text-gray-900">{user.email}</p>
          </div>

          {/* (Member Since removed) */}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-200 font-medium"
          >
            Logout
          </button>
          <button
            onClick={handleDeleteAccount}
            className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 font-medium"
          >
            Delete Account
          </button>
        </div>
      </AuthCard>
    </div>
  );
};

export default UserProfile;
