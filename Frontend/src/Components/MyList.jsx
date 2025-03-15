import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const MyList = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId"); // Get the userId from localStorage

    if (!token || !userId) {
      setError("You need to be logged in to view your listings.");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:4000/api/list/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Filter listings to only include those created by the logged-in user
        const userListings = response.data.filter(
          (listing) => listing.seller._id === userId
        );
        setListings(userListings);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userId");
          navigate("/login");
        } else {
          setError("Failed to fetch your listings");
          setLoading(false);
        }
      });
  }, [navigate]);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  if (loading)
    return (
      <p className="text-center text-gray-600 animate-pulse">Loading...</p>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        My Listings
      </h2>
      {listings.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          You have no listed properties. Start by adding a new listing!
        </p>
      ) : (
        <div className="space-y-8">
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row"
            >
              {/* Left: Image Carousel or Single Image */}
              <div className="w-full md:w-1/2">
                {listing.image.length > 1 ? (
                  // Render slider only if there are multiple images
                  <Slider {...sliderSettings}>
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
                  // Render single image directly if there's only one
                  <div>
                    <img
                      src={listing.image[0]}
                      alt={listing.title}
                      className="w-full h-96 object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Right: Details */}
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                  {listing.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {listing.type} - {listing.area}
                </p>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Bedrooms:</strong> {listing.roomCount.bedroom}
                  </p>
                  <p>
                    <strong>Washrooms:</strong> {listing.roomCount.washroom}
                  </p>
                  <p>
                    <strong>Balconies:</strong> {listing.roomCount.balcony}
                  </p>
                  <p>
                    <strong>Size:</strong> {listing.size} sqft
                  </p>
                  <p className="text-xl font-bold text-blue-600">
                    à§³{listing.rent} / month
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/property/${listing._id}`)}
                  className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyList;
