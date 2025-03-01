import Footer from "../Components/Footer";
import Contacs from "../Components/Contacs";
import ChatBox from "../Components/ChatBox";
import axios from "axios";
import { useEffect } from "react";

const ChatPage = () => {
  const fetchChats = async () => {
    const data = await axios.get("/api/chat");
  };
  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row min-h-screen">
        <Contacs />
        <ChatBox />
      </div>
      <Footer />
    </div>
  );
};

export default ChatPage;
