import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

// ✅ Validation Schema
const AddListSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  type: Yup.string().required("Property type is required"),
  size: Yup.number().required("Size is required"),
  bedroom: Yup.number().required("Number of bedrooms is required"),
  washroom: Yup.number().required("Number of washrooms is required"),
  balcony: Yup.number().required("Number of balconies is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  location: Yup.string().required("Location is required"),
  images: Yup.mixed().required("At least one image is required"),
});

const AddListU = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      type: "",
      size: "",
      bedroom: "",
      washroom: "",
      balcony: "",
      description: "",
      location: "",
      images: null,
    },
    validationSchema: AddListSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("type", values.type);
      formData.append("size", values.size);
      formData.append("bedroom", values.bedroom);
      formData.append("washroom", values.washroom);
      formData.append("balcony", values.balcony);
      formData.append("description", values.description);
      formData.append("location", values.location);

      if (selectedFiles) {
        Array.from(selectedFiles).forEach((file) => {
          formData.append("images", file);
        });
      }

      try {
        const token = localStorage.getItem("accessToken");

        await axios.post("http://localhost:4000/api/listings", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Listing added successfully!");
        navigate("/");
      } catch (error) {
        console.error("Error adding listing:", error);
        alert("Failed to add listing. Please try again.");
      }
    },
  });

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
    formik.setFieldValue("images", e.target.files);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#3F4651]">
      <div className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Add Property Listing</h2>
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-4 bg-[#C0BCB5] p-6 rounded-lg shadow-md"
        >
          {/* File Upload */}
          <div>
            <label className="block font-medium">Upload Images</label>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleFileChange}
              className="border p-2 w-full bg-[#EBECED]"
            />
            {formik.errors.images && (
              <p className="text-red-500">{formik.errors.images}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border p-2 w-full bg-white"
            />
            {formik.errors.title && (
              <p className="text-red-500">{formik.errors.title}</p>
            )}
          </div>

          {/* Property Type */}
          <div>
            <label className="block font-medium">Property Type</label>
            <select
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border p-2 w-full bg-white"
            >
              <option value="">Select Type</option>
              <option value="Residential">Residential</option>
              <option value="Office">Office</option>
              <option value="Warehouse">Warehouse</option>
            </select>
            {formik.errors.type && (
              <p className="text-red-500">{formik.errors.type}</p>
            )}
          </div>

          {/* Bedrooms, Washrooms, Balconies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["bedroom", "washroom", "balcony"].map((field) => (
              <div key={field}>
                <label className="block font-medium">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="number"
                  name={field}
                  value={formik.values[field]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border p-2 w-full bg-white"
                />
                {formik.errors[field] && (
                  <p className="text-red-500">{formik.errors[field]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Size */}
          <div>
            <label className="block font-medium">Size (sq ft)</label>
            <input
              type="number"
              name="size"
              value={formik.values.size}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border p-2 w-full bg-white"
            />
            {formik.errors.size && (
              <p className="text-red-500">{formik.errors.size}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border p-2 w-full bg-white"
            />
            {formik.errors.location && (
              <p className="text-red-500">{formik.errors.location}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border p-2 w-full bg-white"
            ></textarea>
            {formik.errors.description && (
              <p className="text-red-500">{formik.errors.description}</p>
            )}
          </div>

          {/* Submit Button */}
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

export default AddListU;
