import { useState } from "react";
import { socket } from "../socket";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const handleSendMessage = () => {
    setAllMessages([...allMessages, message]);
    socket.emit("chat message", message);
    setMessage("");
  };

  socket.on("chat message", function (msg) {
    setAllMessages([...allMessages, msg]);
  });

  return (
    <div className="chat-box">
      <div className="message-list">
        {allMessages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <ul id="messages"></ul>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
