import React, { useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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
  });

  const [errors, setErrors] = useState({});
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    const updatedImages = await Promise.all(
      files.map(async (file) => {
        const base64 = await convertToBase64(file);

        try {
          if (!formData.company) {
            return { base64, valid: false, error: "Company field is required." };
          } else {
            const response = await axios.post("http://localhost:3001/api/listings/image_validation", {
              image: base64,
              company: formData.company,
              title: formData.title,
            });

            if (response.data.success) {
              console.log(response.data.message);
              return { base64, valid: true, error: null };
            } else {
              console.log(response.data.message);
              return { base64, valid: false, error: response.data.message || "Image does not match car model." };
            }
          }
        } catch (error) {
          return { base64, valid: false, error: "An error occurred. Please try again." };
        }
      })
    );

    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...updatedImages],
    }));
  };

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

  const handleRemoveImage = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      valid = false;
    }

    if (!formData.engine.trim()) {
      newErrors.engine = "Engine is required";
      valid = false;
    }

    if (!formData.mileage.trim()) {
      newErrors.mileage = "Mileage is required";
      valid = false;
    }

    if (!formData.modelYear.trim()) {
      newErrors.modelYear = "Model Year is required";
      valid = false;
    } else if (!/^\d{4}$/.test(formData.modelYear)) {
      newErrors.modelYear = "Model year should be 4 digits.";
      valid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      valid = false;
    } else if (/[\d]/.test(formData.description)) {
      newErrors.description = "Description should not have numbers.";
      valid = false;
    }

    if (!formData.company.trim()) {
      newErrors.company = "Manufacturer is required";
      valid = false;
    } else if (/[\d]/.test(formData.company)) {
      newErrors.company = "Manufacturer should not have numbers.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (user === null) {
        toast.error("You are not logged in!", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }

      const data = {
        ...formData,
        uid: user.uid,
      };

      axios
        .post("http://localhost:3001/api/listings", data)
        .then((response) => {
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
          });
          toast.success("Listing added!", {
            position: toast.POSITION.TOP_CENTER,
          });
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
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
            Images:
          </label>
          <input
            type="file"
            name="images"
            accept=".jpeg, .png, .jpg"
            multiple
            onChange={handleImageChange}
            ref={fileInputRef}
            className="form-control bg-transparent"
          />
          <div className="mt-2">
            {formData.images &&
              formData.images.map((img, index) => (
                <div key={index} className="flex items-center mb-2">
                  <img
                    src={img.base64}
                    alt={`Uploaded ${index + 1}`}
                    className="w-16 h-16 object-cover mr-2"
                  />
                  {img.error ? (
                    <p className="text-red-500 text-sm">{img.error}</p>
                  ) : (
                    <span className="text-green-500 text-lg mr-2">✓</span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
          </div>
        </div>

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
