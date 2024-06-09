import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const Prepage = () => {
  let params=useParams();
  const [errors, setErrors] = useState({});
  const [uniqueCars, setUniqueCars] = useState([]);
  const [prediction, setprediction] = useState('');

  const [formData, setFormData] = useState({
    rating: 0,
    exterior: 0,
    engine: 0,
    suspension: 0,
    interior: 0,
    heater: 0,
    mileage: 0,
    company: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/dropdown");
        console.log(response);
        setUniqueCars(response.data.unique_cars);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mileage") {
      if (/^\d*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === "company") {
      setFormData({ ...formData, [name]: value });
    } else {
      if (/^(100|[1-9]?[0-9])$/.test(value) || value === "") {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.rating) {
      newErrors.rating = "Overall Rating is required";
      valid = false;
    } else if (!(formData.rating >= 0 && formData.rating <= 100)) {
      newErrors.rating = "Overall Rating should be between 0 and 100";
      valid = false;
    }

    if (!formData.exterior) {
      newErrors.exterior = "Exterior and Body Condition is required";
      valid = false;
    } else if (!(formData.exterior >= 0 && formData.exterior <= 100)) {
      newErrors.exterior = "Exterior and Body Condition should be between 0 and 100";
      valid = false;
    }

    if (!formData.engine) {
      newErrors.engine = "Engine and Clutch Condition is required";
      valid = false;
    } else if (!(formData.engine >= 0 && formData.engine <= 100)) {
      newErrors.engine = "Engine and Clutch Condition should be between 0 and 100";
      valid = false;
    }

    if (!formData.suspension) {
      newErrors.suspension = "Suspension and Steering Condition is required";
      valid = false;
    } else if (!(formData.suspension >= 0 && formData.suspension <= 100)) {
      newErrors.suspension = "Suspension and Steering Condition should be between 0 and 100";
      valid = false;
    }

    if (!formData.interior) {
      newErrors.interior = "Interior Condition is required";
      valid = false;
    } else if (!(formData.interior >= 0 && formData.interior <= 100)) {
      newErrors.interior = "Interior Condition should be between 0 and 100";
      valid = false;
    }

    if (!formData.heater) {
      newErrors.heater = "AC/Heater Condition is required";
      valid = false;
    } else if (!(formData.heater >= 0 && formData.heater <= 100)) {
      newErrors.heater = "AC/Heater Condition should be between 0 and 100";
      valid = false;
    }

    if (!formData.mileage) {
      newErrors.mileage = "Mileage is required";
      valid = false;
    } else if (isNaN(formData.mileage) || formData.mileage < 1000) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    try {
      // Format formData object as JSON string
      const formDataJSON = JSON.stringify(formData);
      
      // Send formDataJSON as a parameter named 'formData'
      const response = await axios.get(`http://127.0.0.1:5000/predict?formData=${encodeURIComponent(formDataJSON)}`).then((response) => {
      console.log("response", response.data);
      setprediction(response.data);
      console.log("prediction", prediction);
      });

      /*setFormData({
        rating: 0,
        exterior: 0,
        engine: 0,
        suspension: 0,
        interior: 0,
        heater: 0,
        mileage: 0,
        company: "",
      });*/
  
      toast.success("Hang tight! We're crunching the numbers...", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
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
              htmlFor="rating"
            >
              Overall Rating(1-100):
            </label>
            <input
              type="text"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="block w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.rating && <p className="text-red-500">{errors.rating}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Exterior and Body Condition(1-100):
            </label>
            <input
              type="text"
              name="exterior"
              value={formData.exterior}
              onChange={handleChange}
              className="block w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.exterior && <p className="text-red-500">{errors.exterior}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Engine and Clutch Condition(1-100):
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
              Suspension and Steering Condition(1-100):
            </label>
            <input
              type="text"
              name="suspension"
              value={formData.suspension}
              onChange={handleChange}
              className="block w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.suspension && <p className="text-red-500">{errors.suspension}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Interior Condition(1-100):
            </label>
            <input
              type="text"
              name="interior"
              value={formData.interior}
              onChange={handleChange}
              className="block w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.interior && <p className="text-red-500">{errors.interior}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              AC/Heater Condition(1-100):
            </label>
            <input
              type="text"
              name="heater"
              value={formData.heater}
              onChange={handleChange}
              className="block w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.heater && <p className="text-red-500">{errors.heater}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mileage(KM):
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
            {uniqueCars.map((car, index) => (
              <option key={index} value={car}>
                {car}
              </option>
            ))}
          </select>
          {errors.company && <p className="text-red-500">{errors.company}</p>}
        </div>

        <button
          type="submit"
          style={{ width: "100%" }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-40 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
            
        {prediction && prediction.prediction && (
        <div>
          <br />
          <center>
          <h1 style={{fontSize:'30px'}} >Estimated Price: <strong>{prediction.prediction} PKR</strong></h1>
          </center>
        </div>
      )}

      </form>

      
      <br />
      <ToastContainer />
    </>
  );
};

export default Prepage;
