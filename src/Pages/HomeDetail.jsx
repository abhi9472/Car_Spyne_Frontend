import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const HomeDetails = () => {
  const { id } = useParams();
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchHomeDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/users/gethomedetail?_id=${id}`
        );
        console.log(response);
        setHome(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching home details");
        setLoading(false);
      }
    };

    fetchHomeDetails();
  }, [id]);

  const openImageModal = (index) => {
    setCurrentImageIndex(index);
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % home.image.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + home.image.length) % home.image.length
    );
  };

  const openAvatarModal = () => {
    setAvatarModalOpen(true);
  };

  const closeAvatarModal = () => {
    setAvatarModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!home) return <p>No home details found</p>;

  return (
    <div className="p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4 pt-10">Cars Details</h1>

      {/* Grid layout for images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {home.image.map((img, index) => (
          <div key={index} className="relative group">
            <img
              src={img}
              alt={`Home Image ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg cursor-pointer transition-transform duration-300 ease-in-out transform group-hover:scale-105"
              onClick={() => openImageModal(index)}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-6">
        <div className="flex-1 bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-600">
          <h2 className="text-2xl font-bold mb-4">Details</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-semibold text-lg w-32">Title:</span>
              <span className="text-lg">{home.title}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-lg w-32">Description:</span>
              <span className="text-lg">{home.description}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-lg w-32">Tags:</span>
              <span className="text-lg font-bold text-red-600 dark:text-red-400">
                {home.tags}
              </span>
            </div>

            <div className="flex items-center">
              <span className="font-semibold text-lg w-32">Owner Name:</span>
              <span className="text-lg">{home.uploader.name}</span>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 w-32 h-32 flex items-center justify-center">
          <img
            src={home.uploader.avatar || "default-avatar.png"}
            alt="Uploader Avatar"
            className="w-32 h-32 object-cover rounded-full border-4 border-gray-300 dark:border-gray-600 shadow-lg cursor-pointer transition-transform transform hover:scale-110"
            onClick={openAvatarModal}
          />
        </div>
      </div>

      {imageModalOpen && home.image.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl mx-auto">
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold"
              onClick={closeImageModal}
            >
              &times;
            </button>
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-2xl font-bold"
              onClick={prevImage}
            >
              &lt;
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-2xl font-bold"
              onClick={nextImage}
            >
              &gt;
            </button>
            <img
              src={home.image[currentImageIndex]}
              alt={`Home Image ${currentImageIndex + 1}`}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}

      {avatarModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full max-w-sm mx-auto">
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold"
              onClick={closeAvatarModal}
            >
              &times;
            </button>
            <img
              src={home.uploader.avatar || "default-avatar.png"}
              alt="Uploader Avatar"
              className="w-full h-auto object-contain rounded-full border-4 border-gray-300 dark:border-gray-600"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeDetails;
