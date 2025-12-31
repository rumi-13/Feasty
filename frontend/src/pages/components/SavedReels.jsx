import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Play, Trash2, Home, Bookmark } from "lucide-react";

const SavedReels = () => {
  const [savedReels, setSavedReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/food/${id}/saved`, {
        withCredentials: true,
      })
      .then((res) => {
        setSavedReels(res.data.saved || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleRemove = (e, saveId) => {
    e.stopPropagation();
    e.preventDefault();
    setSavedReels((prev) => prev.filter((item) => item._id !== saveId));
  };

  const handleViewReel = (foodId) => {
    navigate(`/${id}/food-reels?focus=${foodId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-28">

      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/85 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-1 rounded-full hover:bg-white/10 transition"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-sm font-semibold tracking-wide">
          Saved Reels
        </h1>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin" />
        </div>
      ) : savedReels.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
          <Bookmark size={44} className="mb-4 opacity-50" />
          <p className="text-sm">No saved reels yet</p>
        </div>
      ) : (
        <div className="px-3 pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {savedReels.map((reel) => (
              <div
                key={reel._id}
                onClick={() => handleViewReel(reel.food._id)}
                className="
                  relative aspect-[9/16]
                  bg-gray-900 rounded-xl overflow-hidden
                  cursor-pointer
                  border border-white/10
                  hover:border-white/30
                  transition
                  group
                "
              >
                {/* Locked preview (no autoplay, no hover play) */}
                <video
                  src={reel.food.video}
                  muted
                  playsInline
                  preload="metadata"
                  tabIndex={-1}
                  className="
                    w-full h-full
                    object-contain
                    bg-black
                    pointer-events-none
                  "
                />

                {/* Bottom scrim */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />

                {/* Play indicator */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="opacity-0 group-hover:opacity-100 transition">
                    <div className="bg-black/70 p-3 rounded-full">
                      <Play size={20} className="fill-white stroke-white ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={(e) => handleRemove(e, reel._id)}
                  className="
                    absolute top-2 right-2
                    p-1.5 rounded-full
                    bg-black/70
                    text-white/80
                    hover:text-red-500
                    transition
                    z-10
                  "
                >
                  <Trash2 size={14} />
                </button>

                {/* Title */}
                <div className="absolute bottom-0 left-0 w-full p-2.5 z-10">
                  <p className="text-xs font-semibold truncate">
                    {reel.food.name}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <div
        className="
          fixed bottom-0 left-0 w-full z-50
          backdrop-blur-xl bg-black/70
          border-t border-white/10
          py-3 flex justify-center
        "
      >
        <button
          onClick={() => navigate(`/welcome/${id}`)}
          className="opacity-70 hover:opacity-100 transition"
        >
          <Home size={26} />
        </button>
      </div>

    </div>
  );
};

export default SavedReels;
