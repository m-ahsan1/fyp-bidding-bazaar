import React, { useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// Utility function to convert a file to base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = (error) => reject(error);
  });
};

const ListingForm = () => {
  const [formData, setFormData] = useState({
    images: [],
    title: "",
    price: "",
    engine: "",
    mileage: "",
    modelYear: "",
    description: "",
    company: "",
    color: "",
    transmission: "",
    city: "",
    regno: "",
  });

  const [errors, setErrors] = useState({});
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const file = files[0];
    const base64 = await convertToBase64(file);

    if (!formData.company || !formData.title) {
      toast.error("Manufacturer and Title fields are required.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/listings/image_validation", {
        image: base64,
        company: formData.company,
        title: formData.title,
      });

      const updatedImages = [...formData.images];
      if (response.data.success) {
        updatedImages.push({ base64, valid: true, error: null });
        toast.success("Image uploaded successfully.", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        updatedImages.push({ base64, valid: false, error: response.data.message || "Image does not match car model." });
        toast.error(response.data.message || "Image does not match car model.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }

      setFormData((prevData) => ({ ...prevData, images: updatedImages }));
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    const requiredFields = [
      { name: "title", message: "Title is required" },
      { name: "price", message: "Price is required", pattern: /^\d+$/, patternMessage: "Price should be a number." },
      { name: "engine", message: "Engine is required" },
      { name: "mileage", message: "Mileage is required" },
      { name: "modelYear", message: "Model Year is required", pattern: /^\d{4}$/, patternMessage: "Model year should be 4 digits." },
      { name: "description", message: "Description is required", pattern: /^[^\d]+$/, patternMessage: "Description should not have numbers." },
      { name: "company", message: "Manufacturer is required", pattern: /^[^\d]+$/, patternMessage: "Manufacturer should not have numbers." },
      { name: "color", message: "Color is required", pattern: /^[^\d]+$/, patternMessage: "Color should not have numbers." },
      { name: "transmission", message: "Transmission is required", pattern: /^[^\d]+$/, patternMessage: "Transmission should not have numbers." },
      { name: "city", message: "City is required", pattern: /^[^\d]+$/, patternMessage: "City should not have numbers." },
      { name: "regno", message: "Registration No is required" },
    ];

    requiredFields.forEach(field => {
      const value = formData[field.name].trim();
      if (!value) {
        newErrors[field.name] = field.message;
        isValid = false;
      } else if (field.pattern && !field.pattern.test(value)) {
        newErrors[field.name] = field.patternMessage;
        isValid = false;
      }
    });

    if (formData.images.length < 4) {
      toast.error("At least four images are required.", {
        position: toast.POSITION.TOP_CENTER,
      });
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (!user) {
        toast.error("You are not logged in!", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }

      formData.images.forEach((img, index) => {
        if (!img.valid) {
          toast.error(`Image ${index + 1} is invalid. Please upload a valid image.`, {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        }
      });

      const data = { ...formData, uid: user.uid };

      try {
        const response = await axios.post("http://localhost:3001/api/listings", data);
        console.log(response);
        setFormData({
          images: [],
          title: "",
          price: "",
          engine: "",
          mileage: "",
          modelYear: "",
          description: "",
          company: "",
          color: "",
          transmission: "",
          city: "",
          regno: "",
        });
        toast.success("Listing added!", {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-4 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold my-4">Add Listing</h1>
        <hr />
        <br />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
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
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price (PKR):
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
            Engine (cc):
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

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Model Year:
          </label>
          <input
            type="text"
            name="modelYear"
            value={formData.modelYear}
            onChange={handleChange}
            className="block w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.modelYear && (
            <p className="text-red-500">{errors.modelYear}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
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
            <option value="Mitsubishi">Mitsubishi</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Suzuki">Suzuki</option>
            <option value="Changan">Changan</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Nissan">Nissan</option>
          </select>
          {errors.company && <p className="text-red-500">{errors.company}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Color:
          </label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="block w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.color && <p className="text-red-500">{errors.color}</p>}

          <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
            Transmission:
          </label>
          <select
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            className="block w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
          {errors.transmission && (<p className="text-red-500">{errors.transmission}</p>)}

          <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
            City:
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="block w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.city && <p className="text-red-500">{errors.city}</p>}

          <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
            Registration No:
          </label>
          <input
            type="text"
            name="regno"
            value={formData.regno}
            onChange={handleChange}
            className="block w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.regno && <p className="text-red-500">{errors.regno}</p>}
        </div>


        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Add Images:</label>
          <input
            type="file"
            name="images"
            accept=".jpeg, .png, .jpg"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="form-control bg-transparent"
          />
          <div className="mt-2">
            {formData.images &&
              formData.images.map((img, index) => (
                <div
                  key={index}
                  className="flex items-center mb-4 p-4 border rounded-lg shadow-lg bg-white relative"
                >
                  <img
                    src={img.base64}
                    alt={`Uploaded ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg shadow-md mr-4"
                  />
                  <div className="flex flex-col">
                    {img.error ? (
                      <p className="text-red-500 text-sm">{img.error}</p>
                    ) : (
                      <span className="text-green-500 text-lg flex items-center">
                        <svg
                          className="w-5 h-5 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Uploaded Successfully
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition duration-300"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
          </div>
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

export default ListingForm;
