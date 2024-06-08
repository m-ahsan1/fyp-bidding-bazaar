import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Prepage = () => {
  // State to manage form data and errors
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

  // Fetch user information from Redux store
  const user = useSelector(selectUser);

  const navigate = useNavigate();

  // Function to convert file to base64
  const convertToBase64 = (file) => {
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
  };

  // Handle form input changes
  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setFormData({ ...formData, [name]: base64 });
    } else if (name === "mileage") {
      if (/^\d*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      if (/^(100|[1-9]?[0-9])$/.test(value) || value === "") {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  // Validate form fields
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Check for empty fields and value ranges
    if (!formData.title.trim()) {
      newErrors.title = "Overall Rating is required";
      valid = false;
    } else if (!(formData.title >= 0 && formData.title <= 100)) {
      newErrors.title = "Overall Rating should be between 0 and 100";
      valid = false;
    }

    if (!formData.price.trim()) {
      newErrors.price = "Exterior and Body Condition is required";
      valid = false;
    } else if (!(formData.price >= 0 && formData.price <= 100)) {
      newErrors.price = "Exterior and Body Condition should be between 0 and 100";
      valid = false;
    }

    if (!formData.engine.trim()) {
      newErrors.engine = "Engine and Clutch Condition is required";
      valid = false;
    } else if (!(formData.engine >= 0 && formData.engine <= 100)) {
      newErrors.engine = "Engine and Clutch Condition should be between 0 and 100";
      valid = false;
    }

    if (!formData.mileage.trim()) {
      newErrors.mileage = "Mileage is required";
      valid = false;
    } else if (isNaN(formData.mileage) || formData.mileage < 0) {
      newErrors.mileage = "Mileage should be a positive number or 0";
      valid = false;
    }

    if (!formData.company.trim()) {
      newErrors.company = "Manufacturer is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (user === null) {
        toast.error("You are not logged in!", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      } else {
        const data = {
          ...formData,
          uid: user.uid,
        };
        // Post form data to server
        axios
          .post("http://localhost:3001/api/listings", data)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        // Reset form fields after successful submission
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

        // Display success message
        toast.success("Listing added!", {
          position: toast.POSITION.TOP_CENTER,
        });

        // Redirect to home page
        navigate("/");
      }
    }
  };

  return (
    <>
      <br />
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto"
      >
        <center>
          <h1 style={{ fontSize: "40px" }}>
            <b>Predict Price</b>
          </h1>
        </center>
        <br />
        <hr />
        <br />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Overall Rating:
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Exterior and Body Condition:
            </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="block w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.price && <p className="text-red-500">{errors.price}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Engine and Clutch Condition:
            </label>
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Suspension and Steering Condition:
            </label>
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Interior Condition:
            </label>
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
              AC/Heater Condition:
            </label>
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mileage:
            </label>
            <input
              type="text"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              className="block w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.mileage && <p className="text-red-500">{errors.mileage}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Your Car:
          </label>
          <select
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="block w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Car Make, Model and Year</option>
            <option value="Ford">Ford</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            {/* Add more options as needed */}
          </select>
          {errors.company && <p className="text-red-500">{errors.company}</p>}
        </div>

        <button
          style={{ width: "100%" }}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-40 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
      <br />
      <ToastContainer />
    </>
  );
};

export default Prepage;
