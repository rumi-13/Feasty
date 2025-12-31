import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Play } from "lucide-react";
import axios from "axios";
import foodPartnerIcon from "../../assets/images/food-partner-icon.png";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setProfile(res.data.foodPartner);
        setVideos(res.data.foodPartner?.foodItemsByFoodPartner || []);
      })
      .catch(console.error);
  }, [id]);

  return (
    <div className="min-h-screen bg-black text-white font-sans pb-16">

      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-1 rounded-full hover:bg-white/10 transition"
        >
          <ChevronLeft size={22} />
        </button>
        <span className="text-sm font-semibold tracking-wide">
          Partner Profile
        </span>
      </div>

      {/* Profile Header */}
      <div className="max-w-md mx-auto px-4 pt-6">

        <div className="flex items-center gap-5 mb-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full overflow-hidden border border-white/10">
            <img
              src={foodPartnerIcon}
              alt={profile?.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-2 flex-1">
            <div className="bg-white text-black px-4 py-2 rounded-xl text-sm font-bold truncate">
              {profile?.name}
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-xl text-xs text-gray-300 truncate">
              {profile?.contact || "Contact unavailable"}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">
              Dishes
            </p>
            <p className="text-xl font-bold">{videos.length}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">
              Status
            </p>
            <p className="text-sm font-semibold text-gray-200">
              Active Partner
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 mb-4" />

      {/* Video Grid */}
      <div className="grid grid-cols-3 gap-[2px] px-1">
        {videos.map((post) => (
          <div
            key={post._id}
            onClick={() => navigate(`/${id}/food-reels?focus=${post._id}`)}
            className="
              relative aspect-[3/4]
              bg-gray-900
              cursor-pointer
              group
            "
          >
            {/* Preview video (NOT autoplay) */}
            <video
              src={post.video}
              muted
              preload="metadata"
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

            {/* Play indicator */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <div className="bg-black/70 p-2 rounded-full">
                <Play size={18} className="fill-white stroke-white ml-[1px]" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Profile;
