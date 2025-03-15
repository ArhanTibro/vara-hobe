import { useEffect, useState } from "react";
import axios from "axios";

const Contacts = ({ setReceiver, recentContacts }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // For search
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      const token = localStorage.getItem("accessToken");
      if (!token || !searchQuery.trim()) return;

      setIsLoading(true); // Start loading
      try {
        const response = await axios.get(
          `http://localhost:4000/api/user/search?username=${searchQuery}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

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
                  onClick={() => {
                    console.log("Setting receiver:", user._id); // Debugging
                    setReceiver(user._id);
                  }}
                >
                  {user.username}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Display Recently Contacted Users */}
      <h3 className="text-md font-semibold mb-2">Recent Contacts</h3>
      <ul>
        {Array.isArray(recentContacts) &&
          recentContacts.map((user) => (
            <li
              key={user._id}
              className="cursor-pointer hover:bg-gray-200 p-2 rounded"
              onClick={() => {
                console.log("Setting receiver:", user._id); // Debugging
                setReceiver(user._id);
              }}
            >
              {user.username}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Contacts;
