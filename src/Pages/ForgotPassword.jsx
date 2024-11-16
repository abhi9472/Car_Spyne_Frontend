import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://car-spyne-backend.onrender.com/api/v1/users/forgetpassword",
        {
          email: email,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("User", JSON.stringify(response.data));
        navigate("/Verifyotp");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="mx-auto pt-0 pb-0 text-white dark:bg-gray-900">
      <div className="min-h-screen px-3 text-white dark:bg-gray-800 flex items-center justify-center">
        <div className="bg-gray-600 p-12 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Enter Email</h2>
          <form onSubmit={handlesubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-m  font-medium mb-2">
                Enter Email
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-gray-700 text-black rounded-md px-3 py-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Send Otp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
