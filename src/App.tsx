import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
// import Signup from "./containers/Signup";
// import Signin from "./containers/Signin";
import "./socket";
import { useEffect } from "react";
// import socket from "./socket";
import Home from "./containers/Home";
import { PostReq, PrivateRoute } from "./helpers";
import { ToastContainer, toast } from "react-toastify";
import Chat from "./containers/Chat";
import Auth from "./containers/Auth";
import Call from "./containers/Call";
import Permission from "./containers/Permission";
import Navbar from "./components/Navbar";
// import { userSocket } from "./socket";

function App() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await PostReq("user/logout", {});
    if (!response.success) {
      toast.error(response.error);
    } else {
      navigate("/auth");
    }
  };
  return (
    <>
      <ToastContainer />
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        {/* <Route path="/chat" element={<Chat />} /> */}
        <Route
          path="/call"
          element={
            <PrivateRoute>
              <Call />
            </PrivateRoute>
          }
        />
        <Route
          path="/permission"
          element={
            <PrivateRoute>
              <Permission />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
