import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Play, Trash2 } from "lucide-react";
import axios from "../../utils/axios";
import ConfirmModal from '../../components/ConfirmModal';
import { clearFoodPartnerData } from '../../utils/localStorage';
import foodPartnerIcon from "../../assets/icons/food-partner-icon.png";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deletingVideoId, setDeletingVideoId] = useState(null);
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/food-partner/${id}`)
      .then((res) => {
        setProfile(res.data.foodPartner);
        setVideos(res.data.foodPartner?.foodItemsByFoodPartner || []);
      })
      .catch(console.error);
  }, [id]);

  const handleLogout = () => {
    clearFoodPartnerData();
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/auth/foodpartner/${id}`);
    } catch (err) {
      console.error('Error deleting partner:', err);
    }
    clearFoodPartnerData();
    setShowConfirm(false);
    navigate('/');
  };

  const cancelDelete = () => setShowConfirm(false);

  const requestDeleteVideo = (videoId, e) => {
    // prevent toggling playback when clicking delete
    if (e && e.stopPropagation) e.stopPropagation();
    setDeletingVideoId(videoId);
  };

  const confirmDeleteVideo = async () => {
    try {
      await axios.delete(`/api/food/${deletingVideoId}`);
      setVideos((prev) => prev.filter((v) => v._id !== deletingVideoId));
      if (playingId === deletingVideoId) setPlayingId(null);
    } catch (err) {
      console.error('Error deleting video:', err);
    }
    setDeletingVideoId(null);
  };

  const cancelDeleteVideo = () => setDeletingVideoId(null);

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
        <span className="text-sm font-semibold tracking-wide">Partner Profile</span>

        <div className="ml-auto" />
      </div>

      <ConfirmModal
        open={showConfirm}
        title="Delete account"
        message="Are you sure you want to delete your account and all your videos? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {/* Profile Header - responsive two-column layout */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="col-span-1">
            <div className="flex flex-col items-center md:items-start">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border border-white/10">
                {profile?.photoURL ? (
                  <img src={profile.photoURL} alt={profile?.name} className="w-full h-full object-cover" />
                ) : (
                  <img src={foodPartnerIcon} alt={profile?.name} className="w-full h-full object-cover" />
                )}
              </div>

              <div className="mt-4 md:mt-6 w-full">
                <div className="bg-white text-black px-3 py-2 rounded-xl text-sm font-bold truncate inline-block">
                  {profile?.name}
                </div>
                <div className="mt-2 bg-white/10 px-3 py-2 rounded-xl text-xs text-gray-300 truncate">
                  {profile?.contact || 'Contact unavailable'}
                </div>
              </div>


              <div className="mt-6 grid grid-cols-2 gap-3 w-full">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">Dishes</p>
                  <p className="text-xl font-bold">{videos.length}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">Status</p>
                  <p className="text-sm font-semibold text-gray-200">Active Partner</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            
            {profile?.address && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
                <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">Address</p>
                <p className="text-sm text-gray-200">{profile.address}</p>
              </div>
            )}

            {profile?.bio && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">About</p>
                <p className="text-sm text-gray-200">{profile.bio}</p>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-[6px]">
              <ConfirmModal
                open={Boolean(deletingVideoId)}
                title="Delete video"
                message="Are you sure you want to delete this video? This action cannot be undone."
                onConfirm={confirmDeleteVideo}
                onCancel={cancelDeleteVideo}
              />
              {videos.map((post) => (
                <div
                  key={post._id}
                  onClick={() => setPlayingId(playingId === post._id ? null : post._id)}
                  className="relative aspect-[3/4] bg-gray-900 cursor-pointer group"
                >
                  {/* delete icon for owner */}
                  <button
                    onClick={(e) => requestDeleteVideo(post._id, e)}
                    className="absolute top-2 right-2 z-20 p-1 rounded-full bg-black/60 hover:bg-red-600 transition"
                    title="Delete video"
                  >
                    <Trash2 size={16} />
                  </button>
                  {playingId === post._id ? (
                    <video src={post.video} controls autoPlay className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <video src={post.video} muted preload="metadata" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <div className="bg-black/70 p-2 rounded-full">
                          <Play size={18} className="fill-white stroke-white ml-[1px]" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 mb-4" />

    </div>
  );
};

export default Profile;
