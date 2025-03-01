import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const List = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch properties from the API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Get the token from localStorage

        if (!token) {
          setError("You need to be logged in to view listings.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:4000/api/list/", {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the header
          },
        });

        setProperties(response.data);
      } catch (err) {
        setError("Failed to fetch properties. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const sliderSettings = (imageCount) => ({
    dots: imageCount > 1,
    infinite: imageCount > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: imageCount > 1,
  });

  return (
    <div className="container mx-auto p-4 flex flex-col gap-6">
      {loading ? (
        <p className="text-center text-gray-600">Loading properties...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : properties.length === 0 ? (
        <p className="text-center text-gray-600">No properties available.</p>
      ) : (
        properties.map((property) => {
          // Ensure images is always defined and is an array
          const images = Array.isArray(property.images) ? property.images : [];
          return (
            <Link
              to={`/property/${property.id}`}
              key={property.id} // Unique key for each property
              className="block"
            >
              <div
                className="bg-[#C0BCB5] p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4 
                transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
              >
                {/* Image Slider */}
                <div className="w-full md:w-1/3">
                  <Slider
                    {...sliderSettings(images.length)}
                    className="rounded-lg overflow-hidden"
                  >
                    {images.map((image, i) => (
                      <div key={`${property.id}-image-${i}`}>
                        {" "}
                        {/* Unique key for each image */}
                        <img
                          src={image}
                          alt={`Property ${i + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>

                {/* Property Details */}
                <div className="w-full md:w-1/3">
                  <h3 className="text-xl font-semibold">{property.address}</h3>
                  <hr className="my-2 border-gray-400" />
                  <p className="text-gray-700">{property.description}</p>
                </div>

                {/* Additional Details */}
                <div className="w-full md:w-1/3 flex flex-col gap-2">
                  <p>
                    <strong>Rooms:</strong> {property.rooms}
                  </p>
                  <p>
                    <strong>Washrooms:</strong> {property.washrooms}
                  </p>
                  <p>
                    <strong>Size:</strong> {property.size} sq ft
                  </p>
                  <p>
                    <strong>Rent:</strong> ${property.rent}
                  </p>
                  <p>
                    <strong>Contact:</strong> {property.phone1}{" "}
                    {property.phone2 && `/ ${property.phone2}`}
                  </p>
                </div>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default List;
