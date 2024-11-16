import React, { useState } from 'react';
import axios from 'axios';

export const Avatar = ({ avatarUrl, onChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);

      try {
        await axios.post('http://localhost:8000/api/v1/users/updateavatar', formData, 
            {
                
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });
        // Trigger re-fetch or notify parent component about the update
        if (onChange) onChange();
      } catch (error) {
        console.error('Error updating avatar:', error);
      }
    }
  };

  return (
    <div className="relative">
      <img
        src={avatarUrl || '/default-avatar.png'}
        alt="Avatar"
        className="w-24 h-24 rounded-full object-cover cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
      {isMenuOpen && (
        <div className="absolute top-full mt-2 bg-white dark:bg-gray-700 rounded-md shadow-lg w-48">
          <button
            className="block px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={() => window.open(avatarUrl, '_blank')}
          >
            View
          </button>
          <label className="block px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer">
            Change
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default Avatar;
