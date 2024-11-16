import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const CarDetailsPage = () => {
  const location = useLocation();
  const carDetails = location.state ? location.state.car : null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!carDetails) {
    return <p>Loading...</p>;
  }

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carDetails.image.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === carDetails.image.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Car Details
      </h1>
      <div className="border p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Title: {carDetails.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Description: {carDetails.description}
        </p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Images:
          </h3>
          <div className="flex">
            {carDetails.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Car"
                className="w-48 h-48 object-cover rounded-md mr-2 border dark:border-gray-600 cursor-pointer"
                onClick={() => openModal(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative">
            <img
              src={carDetails.image[currentImageIndex]}
              alt="Car"
              className="w-auto h-auto max-h-full max-w-full rounded-lg"
            />
            <button
              className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              onClick={handlePrevImage}
            >
              &lt; Prev
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              onClick={handleNextImage}
            >
              Next &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetailsPage;
