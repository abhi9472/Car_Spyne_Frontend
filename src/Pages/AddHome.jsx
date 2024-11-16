import React, { useState } from "react";
import axios from "axios";

export function AddHome() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage([...e.target.files]);
  };

  const submit = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const formdata = new FormData();
      formdata.append("title", title);
      formdata.append("tags", tags);
      formdata.append("description", description);

      image.forEach((element) => {
        formdata.append("image", element);
      });

      const response = await axios.post(
        `https://car-spyne-backend.onrender.com/api/v1/users/addhome`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log(response);

      if (response.status === 200) {
        alert("Your home has been added successfully!");
        window.location.href = "/allpg";
      }
    } catch (error) {
      console.error("Error in uploading home:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 bg-gradient-to-r from-blue-300 via-red-400 to-green-300 pt-16 md:pt-32">
      <div className="max-w-xl mx-auto px-4 py-6 pt-18 bg-white shadow-md rounded-lg dark:bg-gray-600">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Add Car
        </h1>
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-700 dark:text-gray-200">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 dark:text-gray-200">
              Tags
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 dark:text-gray-200">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 dark:text-gray-200">
              Upload Images
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="p-2 border border-gray-300 rounded-md w-full dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
              required
            />
          </div>

          <button
            type="button"
            onClick={submit}
            className={`w-full py-2 px-4 rounded-md text-white transition-colors duration-300 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Adding Car..." : "Add Car"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddHome;
