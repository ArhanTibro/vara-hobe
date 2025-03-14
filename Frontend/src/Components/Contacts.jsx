import { useEffect, useState } from "react";
import axios from "axios";

const Contacts = ({ setReceiver }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/user/search", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Fetch Users Error:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="w-1/4 bg-gray-100 p-4">
      <h2 className="text-lg font-bold mb-4">Contacts</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user._id}
            className="cursor-pointer hover:bg-gray-200 p-2 rounded"
            onClick={() => setReceiver(user._id)}
          >
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
