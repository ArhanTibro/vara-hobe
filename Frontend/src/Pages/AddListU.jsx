import { useState, useEffect } from "react";
import axios from "axios";

const AddListingForm = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [formData, setFormData] = useState({
    title: "",
    type: "Residential",
    bedroom: 0,
    washroom: 0,
    balcony: 0,
    size: "",
    rent: "", // ✅ Add rent field
    description: "",
    location: "",
    area: "Dhanmondi",
    images: [],
  });

  const areas = [
    "Dhanmondi",
    "Gulshan",
    "Banani",
    "Mirpur",
    "Uttara",
    "Bashundhara",
    "Mohammadpur",
    "Banasree",
    "Motijheel",
    "Shyamoli",
  ];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, images: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((image) => form.append("image", image));
        } else if (["bedroom", "washroom", "balcony"].includes(key)) {
          form.append(`roomCount[${key}]`, value);
        } else {
          form.append(key, value);
        }
      });

      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:4000/api/list",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Listing added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding listing:", error);
      alert("Failed to add listing");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#C0BCB5] p-8">
      <h1 className="text-3xl text-black mb-8">Add New Listing</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="p-3 border rounded-lg"
          required
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="p-3 border rounded-lg"
        >
          <option value="Residential">Residential</option>
          <option value="Office">Office</option>
          <option value="Warehouse">Warehouse</option>
        </select>

        {/* Room Count Section with Labels Instead of Placeholders */}
        <div className="flex gap-4">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Bedrooms</label>
            <input
              type="number"
              name="bedroom"
              value={formData.bedroom}
              onChange={handleChange}
              className="p-3 border rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Washrooms</label>
            <input
              type="number"
              name="washroom"
              value={formData.washroom}
              onChange={handleChange}
              className="p-3 border rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Balconies</label>
            <input
              type="number"
              name="balcony"
              value={formData.balcony}
              onChange={handleChange}
              className="p-3 border rounded-lg"
              required
            />
          </div>
        </div>

        {/* ✅ Rent Field */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Rent (BDT)</label>
          <input
            type="number"
            name="rent"
            value={formData.rent}
            onChange={handleChange}
            className="p-3 border rounded-lg"
            required
          />
        </div>

        <input
          type="number"
          name="size"
          placeholder="Size (sq ft)"
          value={formData.size}
          onChange={handleChange}
          className="p-3 border rounded-lg"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="p-3 border rounded-lg"
          required
        ></textarea>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="p-3 border rounded-lg"
          required
        />

        <select
          name="area"
          value={formData.area}
          onChange={handleChange}
          className="p-3 border rounded-lg"
        >
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>

        <input
          type="file"
          name="images"
          onChange={handleChange}
          multiple
          accept="image/*"
          className="p-3 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="bg-[#C0BCB5] text-black p-3 rounded-lg hover:bg-black hover:text-white"
        >
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default AddListingForm;
