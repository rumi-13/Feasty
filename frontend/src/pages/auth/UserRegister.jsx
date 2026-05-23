import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../utils/axios';
import Navbar from '../../components/Navbar';

const UserRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isGoogleSignup, setIsGoogleSignup] = useState(false);
  const [googleData, setGoogleData] = useState(null);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: ''
  });

  // Check if coming from Google signup
  useEffect(() => {
    if (location.state?.isGoogleSignup && location.state?.googleData) {
      setIsGoogleSignup(true);
      setGoogleData(location.state.googleData);
      setFormData({
        fullName: location.state.googleData.fullName || '',
        email: location.state.googleData.email
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
      const response = await axios.post("/api/auth/user/register-google", {
        fullName: formData.fullName,
        email: googleData.email,
        googleId: googleData.googleId,
        photoURL: googleData.photoURL,
      });

      const id = response.data.user.id;
      localStorage.setItem('userId', id);
      localStorage.setItem('userType', 'user');
      localStorage.setItem('userFullName', formData.fullName);
      localStorage.setItem('userEmail', googleData.email);
      if (response.data.user?.photoURL) {
        localStorage.setItem('userPhoto', response.data.user.photoURL);
      }
      navigate(`/welcome/${id}`);

    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 relative pt-24">
      <Navbar />
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Create an account</h2>
          <p className="mt-2 text-sm text-gray-500">Get started with your free account.</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="mt-1">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm transition duration-200"
                  placeholder="Enter Name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
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
                  placeholder="name@company.com"
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

export default UserRegister;

