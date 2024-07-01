import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Permission = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const cameraPermission = await navigator.permissions.query({
        name: "camera",
      });
      const microphonePermission = await navigator.permissions.query({
        name: "microphone",
      });
      if (
        cameraPermission.state === "granted" &&
        microphonePermission.state === "granted"
      ) {
        setPermissionGranted(true);
      }
    })();
  }, []);

  const requestPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setPermissionGranted(true);
      // Do something with the stream if needed
      console.log("Permissions granted:", stream);
    } catch (error) {
      setErrorMessage(
        "Permission denied. Please allow access to the camera and microphone."
      );
      console.error("Error accessing media devices.", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-2xl mb-4">
        Request Camera and Microphone Permissions
      </h1>
      {!permissionGranted ? (
        <>
          <button
            className="px-4 py-2 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={requestPermissions}
          >
            Allow Camera and Microphone
          </button>
          {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
        </>
      ) : (
        // <p className="mt-4 text-green-500">
        //   Permissions granted. You can now use the camera and microphone.
        // </p>
        <button
          onClick={() => navigate("/call")}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
        >
          Random Match
        </button>
      )}
    </div>
  );
};

export default Permission;
