import SideDrawerForChat from "../Components/SideDrawerForChat";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

//import React from 'react'

const ChatPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <SideDrawerForChat />
      <Footer />
    </div>
  );
};

export default ChatPage;
