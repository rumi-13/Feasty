import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const GoogleSignInButton = ({ userType, onNewUser }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError("");

      // Open Google Sign-In popup
      const result = await signInWithPopup(auth, googleProvider);

      // Get the ID token
      const idToken = await result.user.getIdToken();

      // Send token to backend
      const response = await axios.post("/api/auth/verify-google-token", {
        token: idToken,
        userType: userType, // 'user' or 'foodpartner'
      });

      console.log("Backend response:", response.data);

      // Check if this is a new user or existing user
      if (response.data.status === "new_user") {
        // New user - navigate to register page with Google data
        const registerPage = userType === "user" ? "/user/register" : "/partner/register";
        navigate(registerPage, {
          state: {
            isGoogleSignup: true,
            googleData: response.data.googleData,
          },
        });
      } else if (response.data.status === "existing_user") {
        // Existing user - log them in and redirect to welcome page
        const userId = response.data.user?.id || response.data.foodpartner?.id;
        localStorage.setItem("userId", userId);
        localStorage.setItem("userType", userType);
        
        // Store user info for profile page
        if (userType === "user") {
          localStorage.setItem("userFullName", response.data.user?.fullName || "User");
          localStorage.setItem("userEmail", response.data.user?.email || "");
          if (response.data.user?.photoURL) {
            localStorage.setItem('userPhoto', response.data.user.photoURL);
          }
          navigate(`/welcome/${userId}`);
        } else if (userType === "foodpartner") {
          localStorage.setItem("foodpartnerName", response.data.foodpartner?.name || "Partner");
          localStorage.setItem("foodpartnerEmail", response.data.foodpartner?.email || "");
          if (response.data.foodpartner?.photoURL) {
            localStorage.setItem('foodpartnerPhoto', response.data.foodpartner.photoURL);
          }

          navigate("/partner/welcome");
        }
      }
    } catch (err) {
      console.error("Error during Google Sign-In:", err);
      setError(
        err.response?.data?.message || "Failed to sign in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full max-w-md px-8 py-4 bg-white border-2 border-gray-300 rounded-2xl font-bold text-gray-900 transition duration-300 hover:border-orange-500 hover:shadow-lg active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        {loading ? "Signing in..." : "Sign in with Google"}
      </button>

      {error && (
        <div className="w-full max-w-md p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm font-semibold text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
};

export default GoogleSignInButton;
