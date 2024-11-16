import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const User = JSON.parse(localStorage.getItem("User"));
    console.log(User);

    console.log(User.data._id);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/verifyotp",
        {
          id: User.data._id,
          OTP: otp,
        }
      );

      if (response.status === 200) {
        navigate("/setpassword");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mx-auto pt-0 pb-0 text-white dark:bg-gray-600">
      <div className="min-h-screen text-white dark:bg-gray-700 flex items-center justify-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Verify OTP</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-m font-medium mb-1">
                Enter Otp
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="border border-gray-300 text-black rounded-md px-3 py-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
