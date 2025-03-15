import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // Fetch property details
  useEffect(() => {
    const fetchListing = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("You need to be logged in to view this listing.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:4000/api/list/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setListing(response.data);
        // eslint-disable-next-line no-unused-vars
      } catch (_) {
        setError("Failed to fetch listing details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  // Fetch user role
  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const response = await axios.get(
          `http://localhost:4000/api/user/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      }
    };

    fetchUserRole();
  }, []);

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
      // eslint-disable-next-line no-unused-vars
    } catch (_) {
      setSearchResults([]);
      setError("Failed to search users. Please try again.");
    }
  };

  // Give access to a user
  const handleGiveAccess = async () => {
    if (!selectedUser) {
      alert("Please select a user to give access.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      await axios.patch(
        `http://localhost:4000/api/list/${id}/access`,
        { userId: selectedUser._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Access granted successfully!");
      setListing((prev) => ({ ...prev, access: selectedUser._id }));
      setSelectedUser(null);
      // eslint-disable-next-line no-unused-vars
    } catch (_) {
      alert("Failed to grant access.");
    }
  };

  // Handle payment initiation
  const handlePayment = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const response = await axios.post(
        `http://localhost:4000/api/list/${id}/purchase`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      } else {
        alert("Failed to retrieve payment URL.");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  // Handle delete listing
  const handleDeleteListing = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      await axios.delete(`http://localhost:4000/api/list/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Listing deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Delete Listing Error:", error);
      alert("Failed to delete listing. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-gray-600 animate-pulse">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );

  if (!listing)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-gray-600">No listing found.</p>
      </div>
    );

  const loggedInUserId = localStorage.getItem("userId");
  const isOwner = listing.seller?._id === loggedInUserId;
  const hasAccess = listing.access === loggedInUserId;
  const isAdmin = userRole === "admin";

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        {listing.title}
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Image Carousel or Single Image */}
        <div className="w-full md:w-1/2">
          {listing.image?.length > 1 ? (
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              autoplay={true}
              autoplaySpeed={3000}
              arrows={true}
            >
              {listing.image.map((img, index) => (
                <div key={index}>
                  <img
                    src={img}
                    alt={`${listing.title} - Image ${index + 1}`}
                    className="w-full h-96 object-cover"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <img
              src={listing.image?.[0]}
              alt={listing.title}
              className="w-full h-96 object-cover"
            />
          )}

          {/* Seller Information (Owner) */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Owner</h3>
            <p className="text-gray-700">
              <strong>Name:</strong> {listing.seller?.fullName}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> {listing.seller?.phoneNumber}
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> {listing.seller?.presentAddress}
            </p>
          </div>
        </div>

        {/* Right: Property Details */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Property Details
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Type:</strong> {listing.type}
            </p>
            <p>
              <strong>Location:</strong> {listing.location}
            </p>
            <p>
              <strong>Area:</strong> {listing.area}
            </p>
            <p>
              <strong>Bedrooms:</strong> {listing.roomCount?.bedroom}
            </p>
            <p>
              <strong>Washrooms:</strong> {listing.roomCount?.washroom}
            </p>
            <p>
              <strong>Balconies:</strong> {listing.roomCount?.balcony}
            </p>
            <p>
              <strong>Size:</strong> {listing.size} sqft
            </p>
            <p>
              <strong>Rent:</strong> ৳{listing.rent} / month
            </p>
            <p>
              <strong>Description:</strong> {listing.description}
            </p>
          </div>

          {/* Give Access Section (Only for Owner) */}
          {isOwner && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Give Access
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search user by username"
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
                        className="flex justify-between items-center p-2 border border-gray-200 rounded-lg"
                      >
                        <span>{user.username}</span>
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                        >
                          Select
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Give Access Button */}
              {selectedUser && (
                <button
                  onClick={handleGiveAccess}
                  className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                  Give Access to {selectedUser.username}
                </button>
              )}
            </div>
          )}

          {/* Pay Button (Only for Users with Access) */}
          {!isOwner && hasAccess && (
            <div className="mt-8">
              <button
                onClick={handlePayment}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
              >
                Pay ৳{listing.rent} / month
              </button>
            </div>
          )}

          {/* Delete Button (Only for Owner or Admin) */}
          {(isOwner || isAdmin) && (
            <div className="mt-8">
              <button
                onClick={handleDeleteListing}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
              >
                Delete Listing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
