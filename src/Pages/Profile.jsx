import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "./Avatar.jsx";

const AdminProfile = () => {
  const [adminData, setAdminData] = useState(null);
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHome, setSelectedHome] = useState(null);
  const [modalType, setModalType] = useState(null); // 'updateTags', 'updateTitle', 'updateDescription', or 'delete'
  const [tags, setTags] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchData = async () => {
    try {
      const userResponse = await axios.post(
        "https://car-spyne-backend.onrender.com/api/v1/users/userdetail",
        {},
        { withCredentials: true }
      );
      const userProfile = userResponse.data;

      const homesResponse = await axios.post(
        "https://car-spyne-backend.onrender.com/api/v1/users/getuserhome",
        {},
        { withCredentials: true }
      );
      const userHomes = homesResponse.data;

      setAdminData(userProfile);
      setHomes(userHomes || []);
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateTags = async () => {
    try {
      if (!selectedHome?._id || !tags) return;

      await axios.patch(
        `https://car-spyne-backend.onrender.com/api/v1/users/updatetags`,
        { newTags: tags },
        {
          params: { id: selectedHome._id },
          withCredentials: true,
        }
      );

      fetchData();
      setModalType(null);
    } catch (error) {
      console.error("Error updating Tags:", error);
    }
  };

  const handleUpdateTitle = async () => {
    try {
      if (!selectedHome?._id || !title) return;

      await axios.patch(
        `https://car-spyne-backend.onrender.com/api/v1/users/updatetitle`,
        { newTitle: title },
        {
          params: { id: selectedHome._id },
          withCredentials: true,
        }
      );

      fetchData();
      setModalType(null);
    } catch (error) {
      console.error("Error updating Title:", error);
    }
  };

  const handleUpdateDescription = async () => {
    try {
      if (!selectedHome?._id || !description) return;

      await axios.patch(
        `https://car-spyne-backend.onrender.com/api/v1/users/updatedescription`,
        { newDescription: description },
        {
          params: { id: selectedHome._id },
          withCredentials: true,
        }
      );

      fetchData();
      setModalType(null);
    } catch (error) {
      console.error("Error updating Description:", error);
    }
  };

  const handleDeleteHome = async () => {
    try {
      if (!selectedHome?._id) return;

      await axios.patch(
        `https://car-spyne-backend.onrender.com/api/v1/users/deletehome?id=${selectedHome._id}`,
        null,
        {
          withCredentials: true,
        }
      );

      fetchData();
      setModalType(null);
    } catch (error) {
      console.error("Error deleting Home:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="min-h-screen mx-auto p-4 md:p-8 lg:p-20 bg-gray-100 bg-gradient-to-r from-blue-300 via-red-400 to-green-300 pt-16 md:pt-32">
      <div className="max-w-8xl mx-auto bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 md:p-10">
        {/* Admin Avatar and Basic Info */}
        <div className="flex flex-col md:flex-row items-center mb-8">
          <Avatar avatarUrl={adminData?.message.avatar} onChange={fetchData} />
          <div className="pl-4 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
              {adminData?.message.name || "No Name"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Email: {adminData?.message.email || "No Email"}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Phone: {adminData?.message.phoneNum || "N/A"}
            </p>
          </div>
        </div>

        {/* Homes Uploaded by Admin */}
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Cars Uploaded
          </h2>
          {Array.isArray(homes) && homes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {homes.map((home, index) => (
                <div
                  key={home?._id || index}
                  className="relative bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden"
                >
                  <img
                    src={
                      home?.image &&
                      Array.isArray(home.image) &&
                      home.image.length > 0
                        ? home.image[0]
                        : "/default-home.png"
                    }
                    alt={home?.size || "Cars Image"}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {home?.title || "Unknown Size"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Tags : {home?.tags || "Unknown Location"}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Description: {home?.description || "N/A"}
                    </p>

                    <button
                      onClick={() => {
                        setSelectedHome(home);
                        setModalType("delete");
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    >
                      Options
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              No Cars uploaded yet.
            </p>
          )}
        </div>

        {/* Modal for Update/Delete Options */}
        {modalType && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-80">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {modalType === "delete" ? "Choose an Option" : "Update Cars"}
              </h3>
              {modalType === "delete" && (
                <>
                  <button
                    onClick={() => setModalType("updateTags")}
                    className="block w-full bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mb-2"
                  >
                    Update Tags
                  </button>
                  <button
                    onClick={() => setModalType("updateTitle")}
                    className="block w-full bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mb-2"
                  >
                    Update Title
                  </button>
                  <button
                    onClick={() => setModalType("updateDescription")}
                    className="block w-full bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                  >
                    Update Description
                  </button>
                  <button
                    onClick={handleDeleteHome}
                    className="block w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-2"
                  >
                    Delete Car
                  </button>
                </>
              )}
              {modalType === "updateTags" && (
                <>
                  <input
                    type="text"
                    placeholder="Enter new tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 mb-4"
                  />
                  <button
                    onClick={handleUpdateTags}
                    className="block w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Update Tags
                  </button>
                </>
              )}
              {modalType === "updateTitle" && (
                <>
                  <input
                    type="text"
                    placeholder="Enter new title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 mb-4"
                  />
                  <button
                    onClick={handleUpdateTitle}
                    className="block w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Update Title
                  </button>
                </>
              )}
              {modalType === "updateDescription" && (
                <>
                  <textarea
                    placeholder="Enter new description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 mb-4 dark:placeholder-gray-300"
                  ></textarea>
                  <button
                    onClick={handleUpdateDescription}
                    className="block w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 dark:placeholder-gray-300"
                  >
                    Update Description
                  </button>
                </>
              )}
              <button
                onClick={() => setModalType(null)}
                className="block w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminProfile;
