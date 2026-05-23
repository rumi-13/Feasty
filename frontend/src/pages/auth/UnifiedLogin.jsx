import { useState } from 'react';
import GoogleSignInButton from '../../components/GoogleSignInButton';
import { UtensilsCrossed, Store } from 'lucide-react';
import Navbar from '../../components/Navbar';

const UnifiedLogin = () => {
  const [userType, setUserType] = useState('user');

  return (
    <div className="min-h-screen bg-[#faf7f4] font-sans text-gray-900">
      
      <Navbar />
      
      {/* Content */}
      <div className="relative flex items-center justify-center min-h-screen px-6 pt-36">
        
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="w-full max-w-2xl relative z-10">
          
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-gray-900 mb-3">
              Welcome to Feasty
            </h1>
            <p className="text-lg text-gray-600">Choose your role to get started</p>
          </div>

          <div className="mb-12 bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200">
          <h2 className="text-xl font-bold mb-8 text-gray-900">I am a...</h2>
          
          <div className="space-y-4">
            {/* Food Lover Option */}
            <label className="flex items-center p-4 border-2 rounded-2xl cursor-pointer transition duration-300 hover:border-orange-500 hover:bg-orange-50/30"
              style={{borderColor: userType === 'user' ? '#f97316' : '#e5e7eb'}}>
              <input
                type="radio"
                name="userType"
                value="user"
                checked={userType === 'user'}
                onChange={(e) => setUserType(e.target.value)}
                className="w-5 h-5 cursor-pointer accent-orange-500"
              />
              <div className="ml-4 flex-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <UtensilsCrossed size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Food Lover</p>
                    <p className="text-sm text-gray-600">Discover and order delicious food</p>
                  </div>
                </div>
              </div>
            </label>

            {/* Food Partner Option */}
            <label className="flex items-center p-4 border-2 rounded-2xl cursor-pointer transition duration-300 hover:border-orange-500 hover:bg-orange-50/30"
              style={{borderColor: userType === 'foodpartner' ? '#f97316' : '#e5e7eb'}}>
              <input
                type="radio"
                name="userType"
                value="foodpartner"
                checked={userType === 'foodpartner'}
                onChange={(e) => setUserType(e.target.value)}
                className="w-5 h-5 cursor-pointer accent-orange-500"
              />
              <div className="ml-4 flex-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Store size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Food Partner</p>
                    <p className="text-sm text-gray-600">Sell and showcase your food</p>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>

        <div className="mb-8 text-center">
          <div className="inline-block bg-orange-100 rounded-2xl px-6 py-3">
            <p className="text-sm font-semibold text-orange-700">
              {userType === 'user' 
                ? '🍕 Browse amazing food reels from your favorite restaurants'
                : '📸 Share your delicious food creations with our community'
              }
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <GoogleSignInButton userType={userType} />
        </div>

        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-400 tracking-widest uppercase">
            © {new Date().getFullYear()} Feasty
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedLogin;