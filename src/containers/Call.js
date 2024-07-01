import React, { useEffect, useRef, useState } from "react";
import { socket, userSocket } from "../socket";
import { PostReq } from "../helpers";
import { toast } from "react-toastify";
import Peer from "peerjs";

const Call = () => {
  const userStream = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const [roomId, setRoomId] = useState(null);
  const peersRef = {};

  const [isStream, setIsStream] = useState({
    isOwnStream: false,
    isPartnerStream: false,
  });

  const handleAcceptTermsAndConditions = async () => {
    await PostReq("user/accept-terms-and-conditions");
    // if (!response.success) {
    //   toast.error(response.error);
    // } else {
    //   navigate("/permission");
    // }
  };

  const constraints = {
    audio: true,
    video: { width: { exact: 400 }, height: { exact: 400 } },
  };

  const getPeerRef = (playerID) => {
    if (peersRef.hasOwnProperty(playerID)) return peersRef[playerID];

    return false;
  };

  const getRTCStream = () => {
    if (window.stream) {
      window.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }

    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        const getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        if (!getUserMedia) {
          return Promise.reject(
            new Error("WebRTC is not implemented in your browser")
          );
        }

        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }

    return navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        window.stream = stream;
        userStream.current.srcObject = stream;

        setIsStream({ ...isStream, isOwnStream: true });

        const peerConnection = new Peer(socket.id);

        peerConnection.on("open", (peer) => {
          socket.emit("join_peer_connection", roomId, peer);
        });

        peerConnection.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            console.log("remoteStream", remoteStream);
            socket.emit("get_player_id", call.peer, (playerID) => {
              const peerRef = getPeerRef(playerID);
              setIsStream({
                ...isStream,
                isUserStream: true,
                isPartnerStream: true,
              });
              console.log("peerRef.refpeerRef.ref", peerRef.ref);
              // props[peerRef.ref].current.srcObject = remoteStream;
            });
          });
        });
      })
      .catch((error) => {
        // dispatch(showToast({ type: 'error', message: 'Error  on accessing media devices' }))
        console.error("Error accessing media devices: ", error);
      });
  };

  useEffect(() => {
    getRTCStream();
    return () => {
      if (window.stream) {
        window.stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  const handleRoomId = (payload) => {
    setRoomId(payload);
    socket.emit("JOIN_ROOM", payload);
    getRTCStream();
  };

  useEffect(() => {
    userSocket.connect();
    userSocket.on("PARTNER_ROOM", handleRoomId);
  }, []);

  return (
    <div>
      <video
        ref={localVideoRef}
        autoPlay
        muted
        style={{ width: "300px" }}
      ></video>
      <video ref={remoteVideoRef} autoPlay style={{ width: "300px" }}></video>
      <button
        onClick={() => {
          handleAcceptTermsAndConditions();
        }}
      >
        Join Room
      </button>
    </div>
  );
};

export default Call;
