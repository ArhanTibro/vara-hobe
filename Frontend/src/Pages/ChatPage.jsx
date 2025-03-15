import Footer from "../Components/Footer";
import Contacts from "../Components/Contacts";
import ChatBox from "../Components/ChatBox";
import axios from "axios";
import { useEffect, useState } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const [receiverName, setReceiverName] = useState(""); // State to store the receiver's name

  // Fetch messages for the selected receiver
  const fetchMessages = async (receiver) => {
    const token = localStorage.getItem("accessToken");

    console.log("Token:", token);
    if (!token || !receiver) return;

    try {
      const response = await axios.get(
        `http://localhost:4000/api/chat/messages?receiver=${receiver}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Fetch Messages Error:", error);
    }
  };

  // Fetch the receiver's details (e.g., name)
  const fetchReceiverDetails = async (receiver) => {
    const token = localStorage.getItem("accessToken");

    if (!token || !receiver) return;

    try {
      const response = await axios.get(
        `http://localhost:4000/api/user/searchForMessenger?userId=${receiver}`, // API endpoint to fetch user details
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReceiverName(response.data.username); // Assuming the API returns the user's fullName
    } catch (error) {
      console.error("Fetch Receiver Details Error:", error);
    }
  };

  // Send a message to the receiver
  const sendMessage = async (message) => {
    const token = localStorage.getItem("accessToken");

    console.log("Receiver: ", receiverName);
    if (!token || !receiver) return;

    try {
      const response = await axios.post(
        `http://localhost:4000/api/chat/send?receiver=${receiver}`,
        { receiver, message }, // Request body
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Message sent:", response.data); // Debugging
      fetchMessages(receiver); // Refresh messages after sending
    } catch (error) {
      console.error("Send Message Error:", error);
    }
  };

  // When the receiver changes, fetch their details and messages
  useEffect(() => {
    if (receiver) {
      fetchReceiverDetails(receiver); // Fetch receiver's details
      fetchMessages(receiver); // Fetch messages
    }
  }, [receiver]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row min-h-screen">
        {/* Contacts Panel (Left Side) */}
        <Contacts setReceiver={setReceiver} />

        {/* Chat Section (Right Side) */}
        <div className="flex-1 flex flex-col">
          {/* Receiver's Name */}
          {receiverName && (
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold">{receiverName}</h2>
            </div>
          )}

          {/* ChatBox Component */}
          <ChatBox messages={messages} sendMessage={sendMessage} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatPage;
