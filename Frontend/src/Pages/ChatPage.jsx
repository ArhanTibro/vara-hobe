import Footer from "../Components/Footer";
import Contacts from "../Components/Contacts";
import ChatBox from "../Components/ChatBox";
import axios from "axios";
import { useEffect, useState } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState(null);

  console.log("ChatPage Initialized");

  const fetchMessages = async (receiverId) => {
    try {
      const response = await axios.get(
        `/chat/messages?receiver=${receiverId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Fetch Messages Error:", error);
    }
  };

  const sendMessage = async (message) => {
    try {
      await axios.post(
        "/chat/send",
        { receiver, message },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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
