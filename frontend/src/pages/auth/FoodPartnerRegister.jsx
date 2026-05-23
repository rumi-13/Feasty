import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../utils/axios';
import Navbar from '../../components/Navbar';

const FoodPartnerRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isGoogleSignup, setIsGoogleSignup] = useState(false);
  const [googleData, setGoogleData] = useState(null);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    bio: ''
  });

  // Check if coming from Google signup
  useEffect(() => {
    if (location.state?.isGoogleSignup && location.state?.googleData) {
      setIsGoogleSignup(true);
      setGoogleData(location.state.googleData);
      setFormData({
        name: location.state.googleData.name || '',
        email: location.state.googleData.email,
        contact: '',
        address: '',
        bio: ''
      });
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Register with Google
      const response = await axios.post("/api/auth/foodpartner/register-google", {
        name: formData.name,
        email: googleData.email,
        contact: formData.contact,
        address: formData.address,
        bio: formData.bio,
        googleId: googleData.googleId,
        photoURL: googleData.photoURL,
      });

      // store partner id and info for later profile access
      const partner = response.data.foodpartner;
      if (partner?.id) {
        localStorage.setItem('userId', partner.id);
      }
      localStorage.setItem('userType', 'foodpartner');
      localStorage.setItem('foodpartnerName', partner?.name || formData.name);
      localStorage.setItem('foodpartnerEmail', partner?.email || googleData.email);
      if (response.data.foodpartner?.photoURL) {
        localStorage.setItem('foodpartnerPhoto', response.data.foodpartner.photoURL);
      }

      navigate('/partner/welcome');

    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 relative pt-24">
      <Navbar />
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Register Partner</h2>
          <p className="mt-2 text-sm text-gray-500">Join us and grow your business.</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Business Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Business Name</label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm transition duration-200"
                  placeholder="Tasty Bites"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Business Email</label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm transition duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="contact@restaurant.com"
                />
              </div>
            </div>

            {/* Contact */}
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <div className="mt-1">
                <input
                  id="contact"
                  name="contact"
                  type="tel"
                  required
                  value={formData.contact}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm transition duration-200"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Restaurant Address</label>
              <div className="mt-1">
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm transition duration-200"
                  placeholder="123 Main St, City, State 12345"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Business Description</label>
              <div className="mt-1">
                <textarea
                  id="bio"
                  name="bio"
                  required
                  value={formData.bio}
                  onChange={handleChange}
                  rows="3"
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm transition duration-200"
                  placeholder="Tell us about your restaurant..."
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition duration-200"
          >
            Create Account
          </button>
        </form>

        <div className="text-center text-sm">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="font-medium text-black hover:underline focus:outline-none"
          >
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;