import Footer from "../Components/Footer";
import Contacs from "../Components/Contacs";
import ChatBox from "../Components/ChatBox";

//import React from 'react'

const ChatPage = () => {
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
