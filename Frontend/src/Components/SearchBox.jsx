//import React from "react";

const SearchBox = () => {
  return (
    <div className="p-4 md:p-8 bg-[#EBECED]">
      {/* First Row */}
      <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-4 mb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-[#3F4651]">
          Search Apartments
        </h2>
        <button className="bg-[#3F4651] text-white px-6 py-2 rounded hover:bg-[#505967]">
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
            htmlFor="location"
            className="block text-sm md:text-base font-medium text-[#3F4651] mb-1"
          >
            Location/Area:
          </label>
          <select
            id="location"
            className="w-full p-2 border border-[#C0BCB5] rounded focus:outline-none"
            style={{ backgroundColor: "#EBECED" }}
          >
            <option value="">Select Location</option>
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

        {/* Room Count Dropdown */}
        <div className="flex-1 mb-4 md:mb-0">
          <label
            htmlFor="rooms"
            className="block text-sm md:text-base font-medium text-[#3F4651] mb-1"
          >
            Room Count:
          </label>
          <select
            id="rooms"
            className="w-full p-2 border border-[#C0BCB5] rounded focus:outline-none"
            style={{ backgroundColor: "#EBECED" }}
          >
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
            className="w-full p-2 border border-[#C0BCB5] rounded focus:outline-none"
            style={{ backgroundColor: "#EBECED" }}
          >
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="sublet">Sublet</option>
            <option value="hostel">Hostel</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
