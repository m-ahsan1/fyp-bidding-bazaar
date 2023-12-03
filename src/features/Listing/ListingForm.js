// ListingForm.js
import React, { useState } from "react";
import axios from "axios";

const ListingForm = () => {
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    price: "",
    engine: "",
    mileage: "",
    modelYear: "",
    description: "",
    company: "",
  });

  const [errors, setErrors] = useState({});

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleChange = async (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      console.log(base64);
      setFormData({ ...formData, [e.target.name]: base64 });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.engine) newErrors.engine = "Engine is required";
    if (!formData.mileage) newErrors.mileage = "Mileage is required";
    if (!formData.modelYear) newErrors.modelYear = "Model Year is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.company) newErrors.company = "Company is required";

    setErrors(newErrors);

    // If there are no errors, handle form submission logic here
    // if (Object.keys(newErrors).length === 0) {

    console.log(formData);
    axios
      .post("http://localhost:3001/api/listings", formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("Listing form submitted.");

    setFormData({
      image: "",
      title: "",
      price: "",
      engine: "",
      mileage: "",
      modelYear: "",
      description: "",
      company: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center flex-col bg-gray-500 p-8"
    >
      <div className="mb-4">
        <label className="text-white">Image:</label>
        <input
          type="file"
          name="image"
          accept=".jpeg, .png, .jpg"
          onChange={handleChange}
          className="block py-2.5 px-4 w-full text-white bg-gray-800 border-2 border-gray-600 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="text-white">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="block py-2.5 px-4 w-full text-white bg-gray-800 border-2 border-gray-600 rounded-md"
        />
        {errors.title && <p className="text-red-500">{errors.title}</p>}
      </div>

      <div className="mb-4">
        <label className="text-white">Price:</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="block py-2.5 px-4 w-full text-white bg-gray-800 border-2 border-gray-600 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="text-white">Engine:</label>
        <input
          type="text"
          name="engine"
          value={formData.engine}
          onChange={handleChange}
          className="block py-2.5 px-4 w-full text-white bg-gray-800 border-2 border-gray-600 rounded-md"
        />
        {errors.engine && <p className="text-red-500">{errors.engine}</p>}
      </div>

      <div className="mb-4">
        <label className="text-white">Mileage:</label>
        <input
          type="text"
          name="mileage"
          value={formData.mileage}
          onChange={handleChange}
          className="block py-2.5 px-4 w-full text-white bg-gray-800 border-2 border-gray-600 rounded-md"
        />
        {errors.mileage && <p className="text-red-500">{errors.mileage}</p>}
      </div>

      <div className="mb-4">
        <label className="text-white">Model Year:</label>
        <input
          type="text"
          name="modelYear"
          value={formData.modelYear}
          onChange={handleChange}
          className="block py-2.5 px-4 w-full text-white bg-gray-800 border-2 border-gray-600 rounded-md"
        />
        {errors.modelYear && <p className="text-red-500">{errors.modelYear}</p>}
      </div>

      <div className="mb-4">
        <label className="text-white">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="block py-2.5 px-4 w-full text-white bg-gray-800 border-2 border-gray-600 rounded-md"
        ></textarea>
        {errors.description && (
          <p className="text-red-500">{errors.description}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="text-white">Company</label>
        <select
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="block py-2.5 px-4 w-full text-white bg-gray-800 border-2 border-gray-600 rounded-md"
        >
          <option value="">Select Car Make</option>
          <option value="Ford">Ford</option>
          <option value="Toyota">Toyota</option>
          <option value="Honda">Honda</option>
          {/* Add more options as needed */}
        </select>
        {errors.company && <p className="text-red-500">{errors.company}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default ListingForm;
