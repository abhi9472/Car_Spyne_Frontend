import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AllPg = () => {
  const [homes, setHomes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/users/allhomes"
        );

        setHomes(response.data);
      } catch (error) {
        console.error("Error in fetching homes", error);
      }
    };

    fetchHomes();
  }, []);
  const handleViewDetails = (homeId) => {
    const user = localStorage.getItem("user");

    if (user) {
      navigate(`/homes/${homeId}`);
    } else {
      navigate("/login", {
        state: {
          from: "view-details",
          message: "Please log in to view the details.",
        },
      });
    }
  };

  const user = localStorage.getItem("user");
  // console.log(user);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white">
      <div className="pt-16 px-4">
        <h1 className="text-2xl dark:bg-gray-700 pl-6 font-bold mb-4">
          All Cars Available
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 dark:bg-gray-800 pl-4">
          {homes.map((pg) => (
            <div
              key={pg._id}
              className="border rounded-lg shadow-md overflow-hidden border-gray-300 dark:border-gray-400"
            >
              <div className="relative">
                <img
                  src={pg.image[0]}
                  alt={pg.size}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 right-0 m-0">
                  <button
                    onClick={() => handleViewDetails(pg._id)}
                    className="text-white font-bold bg-blue-500 px-2 py-2 rounded hover:bg-red-600 dark:bg-blue-700 dark:hover:bg-red-600"
                  >
                    View Details
                  </button>
                </div>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">
                  <span className="text-blue-500 dark:text-blue-300">
                    Tags:
                  </span>
                  <span className="text-black-500 dark:text-white-300">
                    {pg.tags}
                  </span>
                </h2>
                <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <span className="text-green-500 dark:text-green-300">
                    Description:
                  </span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {pg.description}
                  </span>
                </p>
                <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                  <span className="text-red-500 dark:text-red-300">Title:</span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {pg.title}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AllPg;
