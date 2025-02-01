import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const AddList = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    images: null,
    phone1: "",
    phone2: "",
    address: "",
    area: "",
    rooms: "",
    washrooms: "",
    size: "",
    description: "",
    rent: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    navigate("/"); // Redirect after submission
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#3F4651]">
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-[#3F4651]">
        <Navbar />
      </div>

      {/* Form Section */}
      <div className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Add Property Listing</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-[#C0BCB5] p-6 rounded-lg shadow-md"
        >
          <div>
            <label className="block font-medium">Upload Images</label>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleChange}
              className="border p-2 w-full bg-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Phone Number 1</label>
              <input
                type="text"
                name="phone1"
                value={formData.phone1}
                onChange={handleChange}
                className="border p-2 w-full bg-white"
                required
              />
            </div>
            <div>
              <label className="block font-medium">
                Phone Number 2 (Optional)
              </label>
              <input
                type="text"
                name="phone2"
                value={formData.phone2}
                onChange={handleChange}
                className="border p-2 w-full bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border p-2 w-full bg-white"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Area</label>
              <select
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="border p-2 w-full bg-white"
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium">Number of Rooms</label>
              <input
                type="number"
                name="rooms"
                value={formData.rooms}
                onChange={handleChange}
                className="border p-2 w-full bg-white"
                required
              />
            </div>

            <div>
              <label className="block font-medium">
                Number of Washrooms (Optional)
              </label>
              <input
                type="number"
                name="washrooms"
                value={formData.washrooms}
                onChange={handleChange}
                className="border p-2 w-full bg-white"
              />
            </div>

            <div>
              <label className="block font-medium">Size (sq ft)</label>
              <input
                type="number"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="border p-2 w-full bg-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 w-full bg-white"
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-medium">Rent Amount</label>
            <input
              type="number"
              name="rent"
              value={formData.rent}
              onChange={handleChange}
              className="border p-2 w-full bg-white"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#3F4651] text-white py-2 px-4 rounded hover:bg-opacity-80"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AddList;
