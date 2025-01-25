import React, { useState } from "react";
import Footer from "../Components/Footer";

const ProfilePage = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <>
      <div className="min-h-screen bg-[#EBECED] flex flex-col items-center p-6">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6">
          {/* Profile Picture and Info */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src="https://media.istockphoto.com/id/1327592449/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=yqoos7g9jmufJhfkbQsk-mdhKEsih6Di4WZ66t_ib7I="
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-[#C0BCB5]"
            />
            <div className="text-left md:text-left w-full">
              <h2 className="text-3xl font-bold text-[#3F4651]">Mr. XYZ</h2>
              <div className="bg-[#C0BCB5] p-4 rounded-lg mt-4 text-[#3F4651]">
                <p className="mt-2">
                  <strong>Contact:</strong> +019 XXXXX XXX
                </p>
                <p className="mt-2">
                  <strong>Permanent Address:</strong> XYZ, DHAKA, BANGLADESH
                </p>
                <p className="mt-2">
                  <strong>Views:</strong> 1,234
                </p>
                <p className="mt-2">
                  <strong>Total Ratings:</strong> 4.5/5
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
          {/*the listing component will add here*/}
          {/* House Listings */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-[#3F4651] mb-4">
              My Listings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#C0BCB5] p-4 rounded-lg shadow-md">
                <img
                  src="https://media.istockphoto.com/id/1398814566/photo/interior-of-small-apartment-living-room-for-home-office.jpg?s=612x612&w=0&k=20&c=8clwg8hTpvoEwL7253aKdYAUuAp1-usFOacNR5qX-Rg="
                  alt="House"
                  className="rounded-lg"
                />
                <h4 className="text-xl font-bold text-[#3F4651] mt-2">
                  Modern Apartment
                </h4>
                <p className="text-[#3F4651]">
                  Location: Dhanmondi, Dhaka , Bangladesh
                </p>
                <p className="text-[#3F4651]">Monthly rent: 50,000/-</p>
              </div>
              <div className="bg-[#C0BCB5] p-4 rounded-lg shadow-md">
                <img
                  src="https://media.istockphoto.com/id/1398814566/photo/interior-of-small-apartment-living-room-for-home-office.jpg?s=612x612&w=0&k=20&c=8clwg8hTpvoEwL7253aKdYAUuAp1-usFOacNR5qX-Rg="
                  alt="House"
                  className="rounded-lg"
                />
                <h4 className="text-xl font-bold text-[#3F4651] mt-2">
                  Modern Apartment
                </h4>
                <p className="text-[#3F4651]">
                  Location: Dhanmondi, Dhaka , Bangladesh
                </p>
                <p className="text-[#3F4651]">Monthly rent: 80,000/-</p>
              </div>
              <div className="bg-[#C0BCB5] p-4 rounded-lg shadow-md">
                <img
                  src="https://media.istockphoto.com/id/1398814566/photo/interior-of-small-apartment-living-room-for-home-office.jpg?s=612x612&w=0&k=20&c=8clwg8hTpvoEwL7253aKdYAUuAp1-usFOacNR5qX-Rg="
                  alt="House"
                  className="rounded-lg"
                />
                <h4 className="text-xl font-bold text-[#3F4651] mt-2">
                  Modern Apartment
                </h4>
                <p className="text-[#3F4651]">
                  Location: Dhanmondi, Dhaka , Bangladesh
                </p>
                <p className="text-[#3F4651]">Monthly rent: 80,000/-</p>
              </div>
              <div className="bg-[#C0BCB5] p-4 rounded-lg shadow-md">
                <img
                  src="https://media.istockphoto.com/id/1398814566/photo/interior-of-small-apartment-living-room-for-home-office.jpg?s=612x612&w=0&k=20&c=8clwg8hTpvoEwL7253aKdYAUuAp1-usFOacNR5qX-Rg="
                  alt="House"
                  className="rounded-lg"
                />
                <h4 className="text-xl font-bold text-[#3F4651] mt-2">
                  Modern Apartment
                </h4>
                <p className="text-[#3F4651]">
                  Location: Dhanmondi, Dhaka , Bangladesh
                </p>
                <p className="text-[#3F4651]">Monthly rent: 80,000/-</p>
              </div>
              <div className="bg-[#C0BCB5] p-4 rounded-lg shadow-md">
                <img
                  src="https://media.istockphoto.com/id/1398814566/photo/interior-of-small-apartment-living-room-for-home-office.jpg?s=612x612&w=0&k=20&c=8clwg8hTpvoEwL7253aKdYAUuAp1-usFOacNR5qX-Rg="
                  alt="House"
                  className="rounded-lg"
                />
                <h4 className="text-xl font-bold text-[#3F4651] mt-2">
                  Modern Apartment
                </h4>
                <p className="text-[#3F4651]">
                  Location: Dhanmondi, Dhaka , Bangladesh
                </p>
                <p className="text-[#3F4651]">Monthly rent: 80,000/-</p>
              </div>
              {/* House Listings Ends*/}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
