import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import axios from "axios";
//import Navbar from "../Components/Navbar";

const OtherUserProfile = () => {
  const { userId } = useParams(); // Get user ID from the URL
  const [user, setUser] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0); // Track the selected rating
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratingError, setRatingError] = useState(null); // Track rating submission errors
  const [ratingLoading, setRatingLoading] = useState(false); // Track rating submission loading state
  const navigate = useNavigate();

  // Fetch other user's profile data
  useEffect(() => {
    const fetchOtherUserProfile = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        navigate("/login"); // Redirect to login if no token found
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:4000/api/user/${userId}`,
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
        setLoading(false);
      }
    };

    fetchOtherUserProfile();
  }, [userId, navigate]);

  // Handle rating submission
  const handleRateUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    // Check if the user is trying to rate themselves
    const loggedInUserId = JSON.parse(localStorage.getItem("user")).id;
    if (loggedInUserId === userId) {
      setRatingError("You cannot rate yourself.");
      return;
    }

    setRatingLoading(true);
    try {
      await axios.post(
        `http://localhost:4000/api/user/${userId}/rate`,
        { rating: selectedRating },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Rating submitted successfully!");
      setUser((prevUser) => ({ ...prevUser, rating: selectedRating })); // Update the displayed rating
      setSelectedRating(0); // Reset the selected rating
      setRatingError(null); // Clear any previous errors
    } catch (err) {
      console.error("Rating Error:", err);
      setRatingError("Failed to submit rating. Please try again.");
    } finally {
      setRatingLoading(false);
    }
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

          {/* Rating System */}
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-bold text-[#3F4651] mb-2">
              Rate this User
            </h3>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-3xl cursor-pointer ${
                    star <= selectedRating ? "text-yellow-500" : "text-gray-400"
                  }`}
                  onClick={() => setSelectedRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            {ratingError && (
              <p className="text-center text-red-500 mt-2">{ratingError}</p>
            )}
            <button
              onClick={handleRateUser}
              disabled={ratingLoading}
              className={`mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 ${
                ratingLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {ratingLoading ? "Submitting..." : "Submit Rating"}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OtherUserProfile;
