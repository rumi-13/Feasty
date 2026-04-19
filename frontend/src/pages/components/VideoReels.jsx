import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";
import { Heart, Store, Home, Bookmark } from "lucide-react";

const VideoReels = () => {
  const { id } = useParams();
  const [reels, setReels] = useState([]);
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const navigate = useNavigate();
  const reelRefs = useRef([]);

  // Fetch reels
  useEffect(() => {
    axios
      .get("/api/food/")
      .then((res) => {
        const normalized = res.data.foodItems.map(item => ({
          ...item,
          isLiked: false,
          isSaved: false,
        }));
        setReels(normalized);
        // Initialize refs array
        reelRefs.current = normalized.map(() => React.createRef());
      })
      .catch(console.error);
  }, []);

  const scrollToNext = useCallback((currentIndex) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < reels.length && reelRefs.current[nextIndex]?.current) {
      reelRefs.current[nextIndex].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [reels.length]);

  return (
    <div 
      className="bg-black h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
    >
      {reels.map((reel, index) => (
        <div key={reel._id} ref={reelRefs.current[index]} className="snap-start">
          <ReelItem
            video={reel}
            index={index}
            isActive={index === activeReelIndex}
            shouldPreload={index >= activeReelIndex - 1 && index <= activeReelIndex + 2}
            setActiveReelIndex={setActiveReelIndex}
            setReels={setReels}
            onVideoEnd={() => scrollToNext(index)}
          />
        </div>
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
const ReelItem = memo(({ video, index, isActive, shouldPreload, setActiveReelIndex, setReels, onVideoEnd }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [hasStartedPreloading, setHasStartedPreloading] = useState(false);
  const navigate = useNavigate();

  // Sticky preload: once it starts preloading, it stays preloaded
  useEffect(() => {
    if (shouldPreload) {
      setHasStartedPreloading(true);
    }
  }, [shouldPreload]);

  // Autoplay observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
          setIsPlaying(true);
          setActiveReelIndex(index);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) obs.observe(videoRef.current);
    return () => obs.disconnect();
  }, [index, setActiveReelIndex]);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
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
        "/api/food/like",
        { foodId: video._id }
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
        "/api/food/save",
        { foodId: video._id }
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
    <section className="relative h-[100dvh] bg-black flex items-center justify-center">

      {/* Loading Spinner */}
      {isBuffering && isPlaying && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20">
          <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Video */}
      <video
        ref={videoRef}
        src={video.video}
        poster={video.thumbnail}
        muted
        playsInline
        preload={hasStartedPreloading ? "auto" : "metadata"}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
        onCanPlay={() => setIsBuffering(false)}
        onEnded={onVideoEnd}
        onClick={togglePlay}
        className={`
          absolute inset-0
          w-full h-full
          object-cover
          md:object-contain
          bg-black
          transition-opacity duration-300
          ${isBuffering && isPlaying ? "opacity-50" : "opacity-100"}
        `}
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
        z-20
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
        z-20
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
});

export default VideoReels;
