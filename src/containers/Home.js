import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PostReq, isUserLoggedIn } from "../helpers";
import { toast } from "react-toastify";
import { userSocket } from "../socket";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await PostReq("user/logout", {});
    if (!response.success) {
      toast.error(response.error);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (isUserLoggedIn()) {
      userSocket.connect();
      userSocket.on("SESSION_ALREADY_EXIST", () => {
        handleLogout();
      });
    }
  }, []);
  return (
    <>
      <div>Home</div>
      <div onClick={() => handleLogout()}>Logout</div>
    </>
  );
};

export default Home;
