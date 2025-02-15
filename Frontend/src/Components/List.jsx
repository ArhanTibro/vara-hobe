import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";

const properties = [
  {
    id: "1",
    images: [img1, img2],
    address: "456 Park Ave, Gulshan",
    description:
      "Luxurious 4-bedroom apartment with premium facilities and security.",
    rooms: 4,
    washrooms: 3,
    size: 2000,
    rent: 40000,
    phone1: "01711223344",
    phone2: "",
  },
  {
    id: "2",
    images: [img3],
    address: "123 Main St, Dhanmondi",
    description:
      "A spacious 3-bedroom apartment with a modern kitchen and large balcony.",
    rooms: 3,
    washrooms: 2,
    size: 1500,
    rent: 25000,
    phone1: "0123456789",
    phone2: "9876543210",
  },
  {
    id: "3",
    images: [img4, img5],
    address: "789 Lake Rd, Banani",
    description: "Cozy 2-bedroom apartment with a stunning view of the lake.",
    rooms: 2,
    washrooms: 1,
    size: 1000,
    rent: 18000,
    phone1: "01899887766",
    phone2: "01655443322",
  },
];

const List = () => {
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
      {properties.map((property, index) => (
        <Link to={`/property/${property.id}`} key={index} className="block">
          <div
            className="bg-[#C0BCB5] p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4 
          transition-transform duration-300 hover:scale-105 hover:shadow-lg 
           cursor-pointer"
          >
            {/* Image Slider */}
            <div className="w-full md:w-1/3">
              <Slider
                {...sliderSettings(property.images.length)}
                className="rounded-lg overflow-hidden"
              >
                {property.images.map((image, i) => (
                  <div key={i}>
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
      ))}
    </div>
  );
};

export default List;
