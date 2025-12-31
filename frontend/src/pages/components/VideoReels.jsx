import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Heart, Store, Home, Bookmark } from "lucide-react";

const VideoReels = () => {
  const { id } = useParams();
  const [reels, setReels] = useState([]);
  const navigate = useNavigate();

  // Fetch reels
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/", { withCredentials: true })
      .then((res) => {
        const normalized = res.data.foodItems.map(item => ({
          ...item,
          isLiked: false,
          isSaved: false,
        }));
        setReels(normalized);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="bg-black h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar">
      {reels.map(reel => (
        <ReelItem
          key={reel._id}
          video={reel}
          setReels={setReels}
        />
      ))}

      {/* Bottom Glass Nav */}
      <div className="
        fixed bottom-0 left-0 w-full z-50
        backdrop-blur-xl bg-white/10
        border-t border-white/20
        shadow-[0_-10px_30px_rgba(0,0,0,0.35)]
        pb-4 pt-3 flex justify-around
      ">
        <button onClick={() => navigate(`/welcome/${id}`)}>
          <Home size={26} className="text-white" />
        </button>
        <button onClick={() => navigate(`/${id}/saved-reels`)}>
          <Bookmark size={26} className="text-white" />
        </button>
      </div>
    </div>
  );
};

// ---------------- Reel Item ----------------
const ReelItem = ({ video, setReels }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  // Autoplay observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) obs.observe(videoRef.current);
    return () => obs.disconnect();
  }, []);

  const togglePlay = () => {
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  // Like
  const handleLike = async (e) => {
    e.stopPropagation();

    setReels(prev =>
      prev.map(v =>
        v._id === video._id
          ? {
              ...v,
              isLiked: !v.isLiked,
              likesCount: v.isLiked
                ? v.likesCount - 1
                : v.likesCount + 1,
            }
          : v
      )
    );

    try {
      await axios.post(
        "http://localhost:3000/api/food/like",
        { foodId: video._id },
        { withCredentials: true }
      );
    } catch {
      setReels(prev =>
        prev.map(v =>
          v._id === video._id
            ? {
                ...v,
                isLiked: !v.isLiked,
                likesCount: v.isLiked
                  ? v.likesCount - 1
                  : v.likesCount + 1,
              }
            : v
        )
      );
    }
  };

  // Save
  const handleSave = async (e) => {
    e.stopPropagation();

    setReels(prev =>
      prev.map(v =>
        v._id === video._id
          ? { ...v, isSaved: !v.isSaved }
          : v
      )
    );

    try {
      await axios.post(
        "http://localhost:3000/api/food/save",
        { foodId: video._id },
        { withCredentials: true }
      );
    } catch {
      setReels(prev =>
        prev.map(v =>
          v._id === video._id
            ? { ...v, isSaved: !v.isSaved }
            : v
        )
      );
    }
  };

  return (
    <section className="relative h-[100dvh] snap-start bg-black flex items-center justify-center">

      {/* Video */}
      <video
        ref={videoRef}
        src={video.video}
        muted
        loop
        onClick={togglePlay}
        className="
          absolute inset-0
          w-full h-full
          object-cover
          md:object-contain
          bg-black
        "
      />

      {/* Right Actions (Glass) */}
      <div className="
        absolute right-4 bottom-36
        px-4 py-6
        rounded-3xl
        backdrop-blur-xl bg-black/30
        border border-white/10
        shadow-lg
        flex flex-col gap-8
        text-white
      ">
        <div onClick={handleLike} className="cursor-pointer text-center">
          <Heart
            size={32}
            className={
              video.isLiked
                ? "fill-red-500 stroke-red-500"
                : "fill-white/10 stroke-white"
            }
          />
          <div className="text-sm mt-1">{video.likesCount}</div>
        </div>

        <div onClick={handleSave} className="cursor-pointer">
          <Bookmark
            size={30}
            className={
              video.isSaved
                ? "fill-red-500 stroke-red-500"
                : "fill-white/10 stroke-white"
            }
          />
        </div>
      </div>

      {/* Info (Glass) */}
      <div className="
        absolute bottom-24 left-4
        max-w-[85%]
        p-5 rounded-2xl
        backdrop-blur-xl bg-black/30
        border border-white/10
        text-white
      ">
        <h3 className="text-xl font-bold">{video.name}</h3>
        <p className="text-sm text-gray-300 mt-1">{video.description}</p>
        <button
          onClick={() => navigate(`/partner/profile/${video.foodPartner}`)}
          className="mt-3 inline-flex items-center gap-2 px-5 py-2 bg-white/20 rounded-xl"
        >
          <Store size={18} />
          Visit Store
        </button>
      </div>

    </section>
  );
};

export default VideoReels;
