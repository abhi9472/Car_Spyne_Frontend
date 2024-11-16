import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError("");
    setShowResults(false);

    try {
      const response = await axios.post(
        `https://car-spyne-backend.onrender.com/api/v1/users/findcars?query=${query}`
      );
      setCars(response.data);
      setShowResults(true);
    } catch (err) {
      setError("Error fetching cars. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCarDetails = async (id) => {
    try {
      const response = await axios.get(
        `https://car-spyne-backend.onrender.com/api/v1/users/gethomedetail?_id=${id}`
      );
      console.log("Car Details:", response.data);
      navigate(`/car/${id}`, { state: { car: response.data } });
    } catch (err) {
      console.error("Error fetching car details:", err);
    }
  };

  const handleBack = () => {
    setCars([]);
    setQuery("");
    setShowResults(false);
    navigate("/"); // Redirects to the home page
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSearch} className="flex justify-center">
        <input
          type="text"
          placeholder="Search for a car"
          value={query}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-l-md bg-white text-gray-900 placeholder-gray-400
                     dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {showResults && (
        <button
          onClick={handleBack}
          className="mt-4 bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
        >
          Back to Home
        </button>
      )}

      {loading && (
        <p className="text-center mt-4 text-gray-800 dark:text-gray-200">
          Loading...
        </p>
      )}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {showResults && (
        <div className="mt-6">
          {cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <div
                  key={car._id}
                  className="border p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 dark:border-gray-700"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Title: {car.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Description: {car.description}
                  </p>
                  <div className="mt-2">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Images:
                    </h4>
                    <div className="flex">
                      {car.image.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt="Car"
                          className="w-24 h-24 object-cover rounded-md mr-2 border dark:border-gray-600"
                        />
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => fetchCarDetails(car._id)}
                    className="mt-2 text-blue-500 hover:underline dark:text-blue-400"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center mt-4 text-gray-800 dark:text-gray-200">
              No cars found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
