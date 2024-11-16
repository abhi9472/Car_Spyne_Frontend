import axios from "axios";
import react, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Setpassword() {
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const User = JSON.parse(localStorage.getItem("User"));
    console.log(User.data._id);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/newPassword",
        {
          userID: User.data._id,
          password: password,
        }
      );

      if (response.status === 200) {
        alert("New Password Changed");
        localStorage.removeItem("User");
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Enter New Password
        </h2>
        <form onSubmit={handlesubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Type New Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-black text-black dark:border-gray-600 rounded-md px-3 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default Setpassword;
