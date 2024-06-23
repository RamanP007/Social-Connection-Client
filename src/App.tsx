import { Routes, Route } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./containers/Signup";
import Signin from "./containers/Signin";
import "./socket";
import { useEffect } from "react";
// import socket from "./socket";
import Home from "./containers/Home";
import { PrivateRoute } from "./helpers";
import { ToastContainer } from "react-toastify";
import Chat from "./containers/Chat";
// import { userSocket } from "./socket";

function App() {
  useEffect(() => {
    // socket.emit("session-already-exist", () => {});
    // userSocket.connect();
  });
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/chat" element={<Chat />} />
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
