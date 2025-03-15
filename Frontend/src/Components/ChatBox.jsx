import { useState } from "react";

const ChatBox = ({ messages, sendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex-1 p-4">
      <div className="h-[80vh] overflow-y-auto mb-4">
        {Array.isArray(messages) &&
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-2 rounded ${
                msg.sender === localStorage.getItem("userId")
                  ? "bg-blue-500 text-white ml-auto w-3/4"
                  : "bg-gray-200 mr-auto w-3/4"
              }`}
            >
              {msg.message}
            </div>
          ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded-l"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
