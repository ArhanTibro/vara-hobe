import Footer from "../Components/Footer";
import Contacts from "../Components/Contacts";
import ChatBox from "../Components/ChatBox";
import axios from "axios";
import { useEffect, useState } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState(null);

  const fetchMessages = async (receiverId) => {
    const token = localStorage.getItem("accessToken");
    if (!token || !receiver.trim()) return;
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

  const sendMessage = async (message) => {
    const token = localStorage.getItem("accessToken");
    if (!token || !receiver.trim()) return;
    try {
      const response = await axios.post(
        `http://localhost:4000/api/chat/send?receiver=${receiver}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchMessages(receiver); // Refresh messages after sending
    } catch (error) {
      console.error("Send Message Error:", error);
    }
  };

  useEffect(() => {
    if (receiver) {
      fetchMessages(receiver);
    }
  }, [receiver]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row min-h-screen">
        <Contacts setReceiver={setReceiver} />
        <ChatBox messages={messages} sendMessage={sendMessage} />
      </div>
      <Footer />
    </div>
  );
};

export default ChatPage;
