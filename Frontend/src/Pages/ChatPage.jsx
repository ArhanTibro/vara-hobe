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
  const [currentUser, setCurrentUser] = useState(null); // State for the currently logged-in user

  // Hardcoded list of all users
  const allUsers = [
    {
      _id: "67d584dba6c923696f32ad24",
      username: "alamin",
      fullName: "Al Amin",
    },
    {
      _id: "67d58522a6c923696f32ad27",
      username: "zihad",
      fullName: "Zihad",
    },
    {
      _id: "67d58552a6c923696f32ad2a",
      username: "zisan",
      fullName: "Zisan",
    },
    {
      _id: "67d58585a6c923696f32ad2d",
      username: "adel",
      fullName: "Adel",
    },
    {
      _id: "67d550a24349bfe6070b75dc",
      username: "ifti123",
      fullName: "Ifti Bin Islam",
    },
    {
      _id: "67d58427a6c923696f32ad1e",
      username: "dhruvo123",
      fullName: "AR Dhruvo",
    },
    {
      _id: "67d58483a6c923696f32ad21",
      username: "hridoy123",
      fullName: "AH Hridoy",
    },
    {
      _id: "67d47fdbba1787452911912f",
      username: "arhan123",
      fullName: "Arhan Tibro",
    },
    {
      _id: "67d48009ba17874529119132",
      username: "nehal123",
      fullName: "Nehal",
    },
  ];

  // Fetch the currently logged-in user's details
  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const response = await axios.get(
        "http://localhost:4000/api/user/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCurrentUser(response.data.user); // Set the current user
    } catch (error) {
      console.error("Fetch Current User Error:", error);
    }
  };

  // Filter out the current user from the recent contacts
  const filterOutCurrentUser = (users) => {
    if (!currentUser) return users; // If currentUser is not set, return all users
    return users.filter((user) => user.username !== currentUser.username);
  };

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

      // Refresh messages after sending
      fetchMessages(receiver);
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

  // Fetch the current user when the component mounts
  useEffect(() => {
    fetchRecentContacts();
    window.scrollTo(0, 0);
  }, []);

  // Set recent contacts (filter out the current user)
  useEffect(() => {
    if (currentUser) {
      const filteredContacts = filterOutCurrentUser(allUsers);
      setRecentContacts(filteredContacts);
    }
  }, [currentUser]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row min-h-screen">
        {/* Contacts Panel (Left Side) */}
        <Contacts
          setReceiver={setReceiver}
          recentContacts={recentContacts} // Pass filtered recent contacts
          selectedReceiver={receiver} // Pass the selected receiver
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
