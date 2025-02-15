import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";

const properties = [
  {
    id: "1",
    images: [img1, img2],
    title: "Luxurious 4-bedroom Apartment",
    type: "Apartment",
    address: "456 Park Ave, Gulshan",
    rooms: 4,
    washrooms: 3,
    size: 2000,
    rent: 40000,
    features: ["24/7 Security", "Swimming Pool", "Gym", "Parking"],
    description:
      "This luxurious apartment offers modern amenities, spacious rooms, and top-tier security in a prime location.",
    seller: {
      name: "John Doe",
      phone: "01711223344",
      email: "john@example.com",
      description:
        "Experienced real estate agent with 10+ years in the industry.",
    },
  },
  {
    id: "2",
    images: [img3, img2],
    title: "Spacious 3-bedroom Apartment",
    type: "Apartment",
    address: "123 Main St, Dhanmondi",
    rooms: 3,
    washrooms: 2,
    size: 1500,
    rent: 25000,
    features: ["Balcony", "Garden", "Modern Kitchen"],
    description:
      "A beautiful 3-bedroom apartment with a modern kitchen and a large balcony for relaxing evenings.",
    seller: {
      name: "Sarah Khan",
      phone: "0123456789",
      email: "sarah@example.com",
      description: "Helping families find their dream homes for over 5 years.",
    },
  },

  {
    id: "3",
    images: [img4, img5],
    title: "Spacious 3-bedroom Apartment",
    type: "Apartment",
    address: "123 Main St, Dhanmondi",
    rooms: 3,
    washrooms: 2,
    size: 1500,
    rent: 25000,
    features: ["Balcony", "Garden", "Modern Kitchen"],
    description:
      "A beautiful 3-bedroom apartment with a modern kitchen and a large balcony for relaxing evenings.",
    seller: {
      name: "Shakil Khan",
      phone: "0123456789",
      email: "sarah@example.com",
      description: "Helping families find their dream homes for over 5 years.",
    },
  },
];

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const foundProperty = properties.find((prop) => prop.id === id);
    setProperty(foundProperty);
  }, [id]);

  if (!property) {
    return <p className="text-center text-gray-500">Property not found.</p>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <>
      <div className="container mx-auto p-4 text-[#3F4651]">
        {/* Image Slider & Features Section */}
        <div className="bg-[#EBECED] p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Slider */}
          <div className="w-full max-w-md md:max-w-lg mx-auto">
            <Slider {...sliderSettings} className="rounded-lg overflow-hidden">
              {property.images.map((image, i) => (
                <div key={i}>
                  <img
                    src={image}
                    alt={`Property ${i + 1}`}
                    className="w-full h-48 md:h-64 lg:h-80 object-cover rounded-lg"
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Features Section */}
          <div className="bg-[#C0BCB5] p-4 rounded-md shadow-md flex flex-col items-center">
            <h3 className="text-3xl p-4 font-bold mb-3 text-center">
              Key Features
            </h3>
            <ul className="list-disc pl-5 text-center md:text-left">
              {property.features.map((feature, index) => (
                <li key={index} className="text-gray-700">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Property Details */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Property Details
          </h1>
          <h2 className="text-xl font-semibold mb-2">
            <strong>Address: </strong> {property.address}
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            <strong>Description: </strong>
            {property.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Rooms: </strong> {property.rooms}
            </p>
            <p>
              <strong>Washrooms: </strong> {property.washrooms}
            </p>
            <p>
              <strong>Size: </strong> {property.size} sq ft
            </p>
            <p>
              <strong>Rent: </strong> ${property.rent}
            </p>
          </div>
        </div>

        {/* Seller Information */}
        <div className="mt-6 p-4 bg-[#C0BCB5] rounded-lg shadow-md flex flex-col md:flex-row gap-4 items-center">
          <img
            src="https://media.istockphoto.com/id/1327592449/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=yqoos7g9jmufJhfkbQsk-mdhKEsih6Di4WZ66t_ib7I="
            alt="Seller"
            className="w-24 h-24 rounded-full object-cover border-2 border-[#3F4651]"
          />
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-semibold">{property.seller.name}</h3>
            <p className="text-gray-700">{property.seller.description}</p>
            <p>
              <strong>Contact:</strong> {property.seller.phone}
            </p>
            <Link to="/chatPage">
              <button className="mt-3 bg-[#3F4651] text-white px-4 py-2 rounded-lg hover:bg-[#2C3138] transition">
                Message Seller
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PropertyDetail;
