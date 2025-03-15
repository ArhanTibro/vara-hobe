import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OtherUserList = ({ userId }) => {
  const [otherListings, setOtherListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("You need to be logged in to view listings.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:4000/api/list/otherListings/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setOtherListings(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch other user's listings");
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Other User's Listings</h2>
      {otherListings.map((listing) => (
        <ListingCard key={listing._id} listing={listing} />
      ))}
    </div>
  );
};

const ListingCard = ({ listing }) => {
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

  return (
    <div className="listing-card">
      <div className="image-container">
        {listing.image.length > 1 ? (
          <Slider {...sliderSettings}>
            {listing.image.map((img, index) => (
              <div key={index}>
                <img src={img} alt={`${listing.title} - Image ${index + 1}`} />
              </div>
            ))}
          </Slider>
        ) : (
          <img src={listing.image[0]} alt={listing.title} />
        )}
      </div>
      <div className="details">
        <h3>{listing.title}</h3>
        <p>
          {listing.type} - {listing.area}
        </p>
        <p>Bedrooms: {listing.roomCount.bedroom}</p>
        <p>Rent: ৳{listing.rent} / month</p>
      </div>
    </div>
  );
};

export default OtherUserList;
