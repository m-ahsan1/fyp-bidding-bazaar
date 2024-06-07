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
    if (e.target.name === "image") {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setFormData({ ...formData, [e.target.name]: base64 });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Validate form fields
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Check for empty fields
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      valid = false;
    } else {
      newErrors.title = "";
    }

    if (!formData.engine.trim()) {
      newErrors.engine = "Engine is required";
      valid = false;
    } else {
      newErrors.engine = "";
    }

    if (!formData.mileage.trim()) {
      newErrors.mileage = "Mileage is required";
      valid = false;
    } else {
      newErrors.mileage = "";
    }

    if (!formData.modelYear.trim()) {
      newErrors.modelYear = "Model Year is required";
      valid = false;
    } else {
      // Model year should be a number and exactly 4 digits
      if (!/^\d{4}$/.test(formData.modelYear)) {
        newErrors.modelYear = "Model year should be 4 digits.";
        valid = false;
      } else {
        newErrors.modelYear = "";
      }
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      valid = false;
    } else {
      // Description should not contain numbers
      if (/[\d]/.test(formData.description)) {
        newErrors.description = "Description should not have numbers.";
        valid = false;
      } else {
        newErrors.description = "";
      }
    }

    if (!formData.company.trim()) {
      newErrors.company = "Manufacturer is required";
      valid = false;
    } else {
      // Company should not contain numbers
      if (/[\d]/.test(formData.company)) {
        newErrors.company = "Manufacturer should not have numbers.";
        valid = false;
      } else {
        newErrors.company = "";
      }
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
              Transmission Condition:
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
            Manufacturer
          </label>
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
