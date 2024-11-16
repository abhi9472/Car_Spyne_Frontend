import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [formData, setFormData] = useState({
    // Username: '',
    name: "",
    email: "",
    phoneNum: "",
    password: "",
    avatar: null,
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, avatar: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      const form = new FormData();
      // console.log(formData.name);
      // formData.Username=hello;
      // form.append('Username',formData.Username );
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phoneNum", formData.phoneNum);
      form.append("password", formData.password);
      form.append("avatar", formData.avatar);

      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        form
      );

      console.log(response);
      if (response.data.message === "Request failed with status code 401") {
        alert("User already exist Please Login.");
      }
      if (response.data.statusCode === 200) {
        alert("Registration successful");
        navigate("/login");
      } else {
        setError("Registration failed");
      }
    } catch (error) {
      console.error("Error in signing up", error);
      //   console.error('Error in signing up', error);
      if (error.response && error.response.status === 401) {
        alert("User exist Please Login.");
        setError("User already exists. Please login.");
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
        setError(error.response.data.message);
      } else {
        setError("Registration failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 pt-28">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: "url(/path-to-your-background-image.jpg)" }}
      ></div>
      <div className="relative bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md z-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNum"
              value={formData.phoneNum}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Avatar
            </label>
            <input
              type="file"
              name="avatar"
              onChange={handleProfilePicChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              accept="image/*"
              required
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 disabled:bg-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4 dark:text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:underline dark:text-blue-300"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};
export default Signup;
