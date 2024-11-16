import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [isLogin, setIsLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLogin(true);
      //   navigate('/allpg');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://car-spyne-backend.onrender.com/api/v1/users/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.statusCode === 200) {
        const userId = response.data.data._id; // Ensure you are accessing _id correctly
        localStorage.setItem("user", JSON.stringify(response.data.data));
        console.log(response);
        console.log(response.data.data.user.role);
        localStorage.setItem("role", response.data.data.user.role);

        setIsLogin(true);
        // alert('Login Successful');
        navigate("/allpg");
        // window.location.reload();
      } else {
        setError("Failed to login. Please check your credentials.");
      }
    } catch (error) {
      console.log(error);
      setError("Invalid credentials || Create account if u dont have");
      //   setError(error.response ? error.response.data.message : 'Login failed. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm dark:filter-none"
        style={{ backgroundImage: "url(/path-to-your-background-image.jpg)" }}
      ></div>
      <div className="relative bg-white dark:bg-gray-600 p-8 rounded-lg shadow-lg w-full max-w-md z-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700 dark:text-gray-100">
          Log In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
              required
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500"
            disabled={isLogin}
          >
            {isLogin ? "Loading..." : "Log In"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600 dark:text-gray-400">
            <a
              href="/forgotpassword"
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              Forgot Password?
            </a>
          </p>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
