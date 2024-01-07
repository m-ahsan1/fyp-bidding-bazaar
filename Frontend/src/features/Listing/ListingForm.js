// ListingForm.js
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const user = useSelector(selectUser)

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

    if (user === null) {
      toast.error("You are not logged in!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    else {
      const data = {
        ...formData,
        uid: user.uid,
      }
      axios.post("http://localhost:3001/api/listings", data)
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
      
    }
  };

  return (
    <>
      <br></br>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md mx-auto"
      >
        <center><h1 style={{ fontSize: "40px" }}><b>Post Car</b></h1></center>
        <br></br><hr></hr><br></br>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Image:
          </label>
          <input
            type="file"
            name="image"
            accept=".jpeg, .png, .jpg"
            onChange={handleChange}
            className="block w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="block w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="block w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Engine:</label>
          <input
            type="text"
            name="engine"
            value={formData.engine}
            onChange={handleChange}
            className="block w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.engine && <p className="text-red-500">{errors.engine}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Mileage:</label>
          <input
            type="text"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            className="block w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.mileage && <p className="text-red-500">{errors.mileage}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Model Year:</label>
          <input
            type="text"
            name="modelYear"
            value={formData.modelYear}
            onChange={handleChange}
            className="block w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.modelYear && <p className="text-red-500">{errors.modelYear}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="block w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Company</label>
          <select
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="block w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Car Make</option>
            <option value="Ford">Ford</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            {/* Add more options as needed */}
          </select>
          {errors.company && <p className="text-red-500">{errors.company}</p>}
        </div>

        <button style={{ width: "100%" }}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-40 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
      <br></br>
      <ToastContainer />
    </>
  );
};

export default ListingForm;
