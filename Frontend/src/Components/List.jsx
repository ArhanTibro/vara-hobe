import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const List = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({
    area: "",
    bedrooms: "",
    propertyType: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("You need to be logged in to view listings.");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:4000/api/list/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setListings(response.data);
        setFilteredListings(response.data); // Initialize filtered listings with all listings
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch listings");
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    const { area, bedrooms, propertyType } = searchParams;
    const filtered = listings.filter((listing) => {
      return (
        (area === "" || listing.area === area) &&
        (bedrooms === "" || listing.roomCount.bedroom === parseInt(bedrooms)) &&
        (propertyType === "" || listing.type === propertyType)
      );
    });
    setFilteredListings(filtered);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

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
      {/* Search Section */}
      <div className="p-4 md:p-8 bg-[#EBECED]">
        {/* First Row */}
        <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-4 mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-[#3F4651]">
            Search Apartments
          </h2>
          <button
            onClick={handleSearch}
            className="bg-[#3F4651] text-white px-6 py-2 rounded hover:bg-[#505967]"
          >
            Search
          </button>
        </div>

        {/* Underline */}
        <div className="h-[2px] bg-[#3F4651] w-full mb-6"></div>

        {/* Second Row */}
        <div className="flex flex-col md:flex-row md:gap-6">
          {/* Location Dropdown */}
          <div className="flex-1 mb-4 md:mb-0">
            <label
              htmlFor="area"
              className="block text-sm md:text-base font-medium text-[#3F4651] mb-1"
            >
              Area:
            </label>
            <select
              id="area"
              name="area"
              value={searchParams.area}
              onChange={handleChange}
              className="w-full p-2 border border-[#C0BCB5] rounded focus:outline-none"
              style={{ backgroundColor: "#EBECED" }}
            >
              <option value="">Select Area</option>
              <option value="Dhanmondi">Dhanmondi</option>
              <option value="Gulshan">Gulshan</option>
              <option value="Banani">Banani</option>
              <option value="Mirpur">Mirpur</option>
              <option value="Uttara">Uttara</option>
              <option value="Bashundhara">Bashundhara</option>
              <option value="Mohammadpur">Mohammadpur</option>
              <option value="Banasree">Banasree</option>
              <option value="Motijheel">Motijheel</option>
              <option value="Shyamoli">Shyamoli</option>
            </select>
          </div>

          {/* Bedrooms Dropdown */}
          <div className="flex-1 mb-4 md:mb-0">
            <label
              htmlFor="bedrooms"
              className="block text-sm md:text-base font-medium text-[#3F4651] mb-1"
            >
              Bedrooms:
            </label>
            <select
              id="bedrooms"
              name="bedrooms"
              value={searchParams.bedrooms}
              onChange={handleChange}
              className="w-full p-2 border border-[#C0BCB5] rounded focus:outline-none"
              style={{ backgroundColor: "#EBECED" }}
            >
              <option value="">Select Bedrooms</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          {/* Property Type Dropdown */}
          <div className="flex-1">
            <label
              htmlFor="propertyType"
              className="block text-sm md:text-base font-medium text-[#3F4651] mb-1"
            >
              Property Type:
            </label>
            <select
              id="propertyType"
              name="propertyType"
              value={searchParams.propertyType}
              onChange={handleChange}
              className="w-full p-2 border border-[#C0BCB5] rounded focus:outline-none"
              style={{ backgroundColor: "#EBECED" }}
            >
              <option value="">Select Property Type</option>
              <option value="Residential">Residential</option>
              <option value="Office">Office</option>
              <option value="Warehouse">Warehouse</option>
            </select>
          </div>
        </div>
      </div>
      <br />
      {/* Listings Section */}
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Available Listings
      </h2>
      <div className="space-y-8">
        {filteredListings.map((listing) => (
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
                  ৳{listing.rent} / month
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
    </div>
  );
};

export default List;
