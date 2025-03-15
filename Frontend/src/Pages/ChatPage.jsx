import Footer from "../Components/Footer";
import Contacts from "../Components/Contacts";
import ChatBox from "../Components/ChatBox";
import axios from "axios";
import { useEffect, useState } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const [receiverName, setReceiverName] = useState("");
  const [recentContacts, setRecentContacts] = useState([]); // State for recent contacts

  // Fetch messages for the selected receiver
  const fetchMessages = async (receiverId) => {
    const token = localStorage.getItem("accessToken");
    if (!token || !receiverId) return;

    try {
      const response = await axios.get(
        `http://localhost:4000/api/chat/messages?receiver=${receiverId}`,
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
  const fetchReceiverDetails = async (receiverId) => {
    const token = localStorage.getItem("accessToken");
    if (!token || !receiverId) return;

    try {
      const response = await axios.get(
        `http://localhost:4000/api/user/searchUserForMessenger?userId=${receiverId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Check if the response contains a user
      if (Array.isArray(response.data) && response.data.length > 0) {
        const user = response.data[0]; // Get the first user in the array
        setReceiverName(user.username); // Set the username
      } else {
        console.error("No user found for receiverId:", receiverId);
        setReceiverName(""); // Reset the receiver name if no user is found
      }
    } catch (error) {
      console.error("Fetch Receiver Details Error:", error);
    }
  };

  // Fetch recent contacts
  const fetchRecentContacts = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const response = await axios.get(
        "http://localhost:4000/api/chat/recent-contacts",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRecentContacts(response.data); // Update recent contacts
    } catch (error) {
      console.error("Fetch Recent Contacts Error:", error);
    }
  };

  // Send a message to the receiver
  const sendMessage = async (message) => {
    const token = localStorage.getItem("accessToken");
    if (!token || !receiver) return;

    try {
      const response = await axios.post(
        "http://localhost:4000/api/chat/send",
        { receiver, message },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Message sent:", response.data); // Debugging

      // Update recent contacts
      const newContact = {
        _id: receiver,
        username: receiverName, // Assuming receiverName is already set
      };

      // Add the new contact to the top of the list (if not already present)
      setRecentContacts((prevContacts) => {
        const updatedContacts = prevContacts.filter(
          (contact) => contact._id !== receiver
        );
        return [newContact, ...updatedContacts];
      });

      fetchMessages(receiver); // Refresh messages after sending
    } catch (error) {
      console.error("Send Message Error:", error);
    }
  };

  // When the receiver changes, fetch their details and messages
  useEffect(() => {
    if (receiver) {
      fetchReceiverDetails(receiver);
      fetchMessages(receiver);
    }
  }, [receiver]);

  // Fetch recent contacts when the component mounts
  useEffect(() => {
    fetchRecentContacts();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row min-h-screen">
        {/* Contacts Panel (Left Side) */}
        <Contacts
          setReceiver={setReceiver}
          recentContacts={recentContacts} // Pass recentContacts as a prop
        />

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
