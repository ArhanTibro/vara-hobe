import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { useFormik } from "formik";
import { AddListSchema } from "../../../Backend/models/AddList";

const onSubmit = () => {
  console.log("Submitted");
};

const AddListU = () => {
  const navigate = useNavigate();
  const { values, errors, handleBlur, handleSubmit } = useFormik({
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
    onSubmit,
  });

  //const { name, value, type, files } = e.target;
  //const handleChange = (e) => {
  //  setFormData({
  //    ...formData,
  //    [name]: type === "file" ? files : value,
  //  });
  //};

  //const handleSubmit = (e) => {
  //  e.preventDefault();
  //  console.log("Form submitted", formData);
  //  navigate("/"); // Redirect after submission
  //};

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#3F4651]">
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
              className="border p-2 w-full bg-[#EBECED]"
              onBlur={handleBlur}
            />
          </div>
          {/* title */}
          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              className={`border p-2 w-full bg-white ${
                errors.title && touched.title ? "input-error" : ""
              }`}
              onBlur={handleBlur}
              required
            />
          </div>

          {/* type */}

          <div>
            <label className="block font-medium">Property Type</label>
            <select
              name="type"
              value={values.type}
              onChange={handleChange}
              className={`border p-2 w-full bg-white ${
                errors.type && touched.type ? "input-error" : ""
              }`}
              onBlur={handleBlur}
            >
              <option value="">Select Area</option>
              <option value="Residential">Residential</option>
              <option value="Office">Office</option>
              <option value="Warehouse">Warehouse</option>
            </select>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium">Bedroom</label>
              <input
                type="text"
                name="bedroom"
                value={values.bedroom}
                onChange={handleChange}
                className={`border p-2 w-full bg-white ${
                  errors.bedroom && touched.bedroom ? "input-error" : ""
                }`}
                onBlur={handleBlur}
                required
              />
            </div>
            <div>
              <label className="block font-medium">Washroom</label>
              <input
                type="text"
                name="washroom"
                value={values.washroom}
                onChange={handleChange}
                className={`border p-2 w-full bg-white ${
                  errors.washroom && touched.washroom ? "input-error" : ""
                }`}
                onBlur={handleBlur}
                required
              />
            </div>
            <div>
              <label className="block font-medium">Balcony</label>
              <input
                type="text"
                name="balcony"
                value={values.balcony}
                onChange={handleChange}
                className={`border p-2 w-full bg-white ${
                  errors.balcony && touched.balcony ? "input-error" : ""
                }`}
                onBlur={handleBlur}
                required
              />
            </div>
          </div>

          {/* size */}

          <div>
            <label className="block font-medium">Size</label>
            <input
              type="text"
              name="size"
              value={values.size}
              onChange={handleChange}
              className={`border p-2 w-full bg-white ${
                errors.size && touched.size ? "input-error" : ""
              }`}
              onBlur={handleBlur}
              required
            />
          </div>

          {/* Address */}

          <div>
            <label className="block font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`border p-2 w-full bg-white ${
                errors.address && touched.address ? "input-error" : ""
              }`}
              required
            />
          </div>

          {/* Description */}

          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`border p-2 w-full bg-white ${
                errors.description && touched.description ? "input-error" : ""
              }`}
              required
            ></textarea>
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

export default AddListU;
