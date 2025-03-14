import { useEffect, useState } from "react";
import axios from "axios";

const Contacts = ({ setReceiver }) => {
  const [users, setUsers] = useState([]); // Initialize as an empty array
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [searchResults, setSearchResults] = useState([]); // State for search results

  // Fetch all users for the contacts list
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/user/searchUserForMessenger", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("API Response:", response.data); // Debugging

        // Ensure the response is an array
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error("Invalid response format:", response.data);
          setUsers([]); // Set to empty array if response is not an array
        }
      } catch (error) {
        console.error("Fetch Users Error:", error);
        setUsers([]); // Set to empty array on error
      }
    };
    fetchUsers();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const [isLoading, setIsLoading] = useState(false);

  // For search
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      setIsLoading(true); // Start loading
      try {
        const response = await axios.get("/user/searchUserForMessenger", {
          params: { username: searchQuery },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Search Results:", response.data);

        if (Array.isArray(response.data)) {
          setSearchResults(response.data);
        } else {
          console.error("Invalid search response format:", response.data);
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Search Users Error:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div className="w-1/4 bg-gray-100 p-4">
      <h2 className="text-lg font-bold mb-4">Contacts</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by username"
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      {/* Display Search Results */}
      {searchQuery && (
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2">Search Results</h3>
          {isLoading ? (
            <p>Loading...</p>
          ) : searchResults.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <ul>
              {searchResults.map((user) => (
                <li
                  key={user._id}
                  className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                  onClick={() => setReceiver(user._id)}
                >
                  {user.username}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Display Contacts List */}
      <h3 className="text-md font-semibold mb-2">All Contacts</h3>
      <ul>
        {Array.isArray(users) &&
          users.map((user) => (
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
