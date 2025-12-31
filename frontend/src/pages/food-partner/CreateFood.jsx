import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Upload, Video, Trash2, RefreshCw } from "lucide-react";
import axios from "axios";

const CreateFood = () => {
  const [formData, setFormData] = useState({
    foodName: "",
    description: "",
  });
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile || !formData.foodName || !formData.description) {
      alert("Please fill in all fields and upload a video.");
      return;
    }

    setLoading(true);

    try {
      // Create FormData to send file and text fields
      const data = new FormData();
      data.append("name", formData.foodName);
      data.append("description", formData.description);
      data.append("video", videoFile);

      // Make the POST request
      const response = await axios.post(
        "http://localhost:3000/api/food/",
        data,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
          },
        }
      );

      console.log("Upload success:", response.data);
      alert("Food posted successfully!");
      navigate("/partner/welcome");

      // Reset form on success
      setFormData({ foodName: "", description: "" });
      removeVideo();
    } catch (error) {
      console.error("Error uploading food:", error);
      alert("Failed to post food. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navigation */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center">
        <Link
          to="/partner/welcome"
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={24} className="text-black" />
        </Link>
        <span className="ml-2 font-bold text-lg text-gray-900">
          New Food Post
        </span>
      </div>

      <main className="flex-grow w-full max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Video Upload Section */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              Upload Reel
            </label>

            <div className="relative aspect-[9/16] sm:aspect-video md:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-white border-2 border-dashed border-gray-200">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="video/*"
                className="hidden"
              />

              {videoPreview ? (
                <div className="relative w-full h-full bg-black">
                  <video
                    src={videoPreview}
                    className="w-full h-full object-contain"
                    controls
                  />
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    >
                      <RefreshCw size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={removeVideo}
                      className="p-2 bg-red-500/80 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={triggerFileInput}
                  className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="p-4 rounded-full bg-gray-100 mb-4">
                    <Upload size={32} className="text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    Tap to upload video
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Food Name
              </label>
              <input
                type="text"
                name="foodName"
                value={formData.foodName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-black transition-all bg-white"
                placeholder="e.g. Spicy Chicken Burger"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-black transition-all bg-white resize-none"
                placeholder="Describe your dish..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 px-6 rounded-full bg-black text-white font-bold hover:bg-gray-900 flex items-center justify-center space-x-2 shadow-lg active:scale-95 transition-transform ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span>Posting...</span>
            ) : (
              <>
                <Video size={20} />
                <span>Post Reel</span>
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateFood;
