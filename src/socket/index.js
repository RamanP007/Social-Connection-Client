import { io } from "socket.io-client";

const URL = process.env.REACT_APP_BASE_URL;

export const socket = io(process.env.REACT_APP_BASE_URL, {
  transports: ["websocket"],
});

export const userSocket = io(`${URL}/user`, {
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: false,
  multiplex: false,
});
