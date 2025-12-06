import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'


const VideoReels = () => {
    const [reels, setReels] = useState([]);

    // API Call

    useEffect(()=>{
        axios.get("http://localhost:3000/api/food/", {withCredentials:true})
        .then(response =>{
            console.log(response.data.foodItems);
            
           setReels(response.data.foodItems)
        })
    },[])

 
  return (
    <div className="bg-black h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
      
      {/* Back Navigation Header */}
      <div className="fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center bg-gradient-to-b from-black/40 to-transparent pointer-events-none">
        <Link to="/home" className="pointer-events-auto text-white font-bold tracking-tight drop-shadow-md">
          FoodApp.
        </Link>
      </div>

      {/* Render Video List */}
      {reels.map((reel) => (
        <ReelItem key={reel._id} video={reel} />
      ))}
    </div>
  );
};

// Component for individual video reel
const ReelItem = ({ video }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Simple Autoplay Logic: Play when visible, Pause when not
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {}); // Catch error if user hasn't interacted yet
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 } // 60% visibility required
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  

  // Manual Play/Pause Toggle
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative h-[100dvh] w-full snap-start shrink-0">
      
      <video
        ref={videoRef}
        src={video.video}
        className="h-full w-full object-cover"
        loop
        muted // Muted required for browser autoplay policies without interaction
        playsInline
        onClick={togglePlay}
      />

      {/* Dark Overlay for text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80 pointer-events-none" />

      {/* Content Layer */}
      <div className="absolute bottom-0 left-0 w-full p-6 pb-20 md:pb-8 flex flex-col text-white space-y-4">
        
        {/* Header: Store Name & Likes */}
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center font-bold border border-white/30">
                    {video.name.charAt(0)}
                </div>
                <h3 className="font-bold text-lg drop-shadow-md">{video.name}</h3>
            </div>
            
            <div className="flex flex-col items-center">
                <span className="text-2xl">♥</span>
                <span className="text-xs font-medium">{video.likes}</span>
            </div>
        </div>

        {/* Description (Truncated) */}
        <p className="text-sm md:text-base text-gray-200 line-clamp-2 drop-shadow-sm w-[90%]">
          {video.description}
        </p>

        {/* Action Button */}
        <button className="w-full md:w-auto bg-white text-black font-bold py-3 px-6 rounded-xl hover:bg-gray-200 active:scale-95 transition-transform flex items-center justify-center space-x-2">
            <span>Visit Store</span>
            <span>&rarr;</span>
        </button>

      </div>
    </section>
  );
};

export default VideoReels;