import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../Components/Footer";
import List from "../Components/List";
import axios from "axios";
import Navbar from "../Components/Navbar";

const OtherUserProfile = () => {
  const { userId } = useParams(); // Get user ID from the URL
  const [user, setUser] = useState(null);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const navigate = useNavigate();

  useEffect(() => {
    const fetchOtherUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/user/profile/${userId}`
        );
        setUser(response.data.user);
        setRating(response.data.user.rating);
        setLoading(false);
      } catch (err) {
        console.error("Profile Fetch Error:", err);
        setError("Failed to load profile. Please try again.");
      }
    };

    fetchOtherUserProfile();
  }, [userId]);

  const handleRating = (rate) => {
    setRating(rate);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="min-h-screen bg-[#EBECED] flex flex-col items-center p-6">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={user.profileImage || "https://via.placeholder.com/150"}
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
                  <strong>Total Ratings:</strong> {rating}/5
                </p>
              </div>
            </div>
          </div>

          {/* Rating System */}
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-bold text-[#3F4651] mb-2">
              Rate this Profile
            </h3>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-3xl cursor-pointer ${
                    star <= rating ? "text-yellow-500" : "text-gray-400"
                  }`}
                  onClick={() => handleRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* House Listings */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-[#3F4651] mb-4">
              Listings by {user.fullName}
            </h3>
            <List userId={userId} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OtherUserProfile;
