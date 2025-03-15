import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
//import List from "../Components/List";
import axios from "axios";
import MyList from "../Components/MyList";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  // Fetch user profile data
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        navigate("/login"); // Redirect to login if no token found
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:4000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data.user);
        setLoading(false);
      } catch (err) {
        console.error("Profile Fetch Error:", err);
        setError("Failed to load profile. Please try again.");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  // Search users by username
  const handleSearch = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token || !searchQuery.trim()) return;

    try {
      const response = await axios.get(
        `http://localhost:4000/api/user/search?username=${searchQuery}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSearchResults(response.data);
    } catch (err) {
      console.error("Search Error:", err);
      setSearchResults([]);
      setError("Failed to search users. Please try again.");
    }
  };

  // Navigate to the OtherUser page
  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`); // Updated to match the route in App.jsx
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="min-h-screen bg-[#EBECED] flex flex-col items-center p-6">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6">
          {/* Search Bar for Other Users */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-[#3F4651] mb-4">
              Search Other Users
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search by username"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Search
              </button>
            </div>

            {/* Display Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2">Search Results</h4>
                <ul className="space-y-2">
                  {searchResults.map((user) => (
                    <li
                      key={user._id}
                      className="flex justify-between items-center p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100"
                      onClick={() => handleUserClick(user._id)}
                    >
                      <span>{user.username}</span>
                      <span className="text-sm text-gray-500">
                        {user.fullName}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* User Profile Details */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={
                "https://media.istockphoto.com/id/1327592449/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=yqoos7g9jmufJhfkbQsk-mdhKEsih6Di4WZ66t_ib7I="
              }
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-[#C0BCB5]"
            />
            <div className="w-full">
              <h2 className="text-3xl font-bold text-[#3F4651]">
                {user.fullName}
              </h2>
              <div className="bg-[#C0BCB5] p-4 rounded-lg mt-4 text-[#3F4651]">
                <p>
                  <strong>Contact:</strong> {user.phoneNumber}
                </p>
                <p>
                  <strong>Address:</strong> {user.presentAddress}
                </p>
                <p>
                  <strong>Views:</strong> {user.views || "N/A"}
                </p>
                <p>
                  <strong>Rating:</strong> {user.rating}/5
                </p>
              </div>
            </div>
          </div>

          {/* House Listings */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-[#3F4651] mb-4">
              My Listings
            </h3>
            <MyList />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
