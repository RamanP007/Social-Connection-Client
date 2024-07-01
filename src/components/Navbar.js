import React from "react";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../helpers";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here
    onLogout();
    navigate("/auth"); // Navigate to the login page after logout
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">Social Connections</div>
        {isUserLoggedIn() && (
          <button
            onClick={handleLogout}
            className="w-20 py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg transform hover:scale-105 transition-transform"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
