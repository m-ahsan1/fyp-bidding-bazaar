import React, { useRef, useState } from "react";
import { auth } from "../../firebase";
import apiServerNode from "../../apiServerNodeConfig";
import { toast } from "react-toastify";
import { setLoading } from "../../redux/slices/loadingSlice";
import { useDispatch } from "react-redux";

export const AddAuction = ({ setAuction, onClose }) => {
  const [showForm, setShowForm] = useState(true);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [transmission, setTransmission] = useState("Automatic"); // Default value for transmission
  const itemTitle = useRef();
  const itemDesc = useRef();
  const price = useRef();
  const mileage = useRef();
  const modelYear = useRef();
  const manufacturer = useRef();
  const itemImage = useRef();
  const duration = useRef();
  const regNumber = useRef(); // New field for registration number
  const city = useRef(); // New field for city
  const carColor = useRef(); // New field for car color
  const engineCapacity = useRef(); // New field for engine capacity

  const currentUser = auth.currentUser;
  const dispatch = useDispatch();

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const file = files[0];
    const base64 = await convertToBase64(file);

    if (!manufacturer.current.value || !itemTitle.current.value) {
      toast.error("Manufacturer and Title fields are required.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    try {
      dispatch(setLoading(true));
      const response = await apiServerNode.post(
        "/api/listings/image_validation",
        {
          image: base64,
          company: manufacturer.current.value,
          title: itemTitle.current.value,
        }
      );

      const updatedImages = [...images];
      if (response.data.success) {
        updatedImages.push({
          src: file,
          base64: base64,
          valid: true,
          error: null,
        });
        toast.success("Image uploaded successfully.", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        updatedImages.push({
          src: file,
          base64: base64,
          valid: false,
          error: response.data.message || "Image does not match car model.",
        });
        toast.error(
          response.data.message || "Image does not match car model.",
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      }

      setImages(updatedImages);
      dispatch(setLoading(false));
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(setLoading(false));
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setError("");

    if (images.length === 0) {
      return setError("Please upload at least one image.");
    }

    const validImages = images.filter((img) => img.valid);
    if (validImages.length === 0) {
      return setError("Please upload valid images.");
    }

    if (isNaN(price.current.value) || price.current.value <= 0) {
      return setError("Price should be a positive number");
    }

    if (isNaN(mileage.current.value) || mileage.current.value <= 0) {
      return setError("Mileage should be a positive number");
    }

    if (
      isNaN(modelYear.current.value) ||
      modelYear.current.value.length !== 4 ||
      modelYear.current.value < 1886
    ) {
      return setError("Model Year should be a valid year");
    }

    if (isNaN(duration.current.value) || duration.current.value <= 0) {
      return setError(
        "Duration should be a positive number representing hours"
      );
    }

    if (!regNumber.current.value) {
      return setError("Registration Number is required");
    }

    if (!city.current.value) {
      return setError("City is required");
    }

    if (!carColor.current.value) {
      return setError("Car Color is required");
    }

    if (
      isNaN(engineCapacity.current.value) ||
      engineCapacity.current.value <= 0
    ) {
      return setError("Engine Capacity should be a positive number");
    }

    let currentDate = new Date();
    let dueDate = currentDate.setHours(
      currentDate.getHours() + parseInt(duration.current.value)
    );

    const temp_images = images.map((img) => {
      return img.src;
    });

    let newAuction = {
      email: currentUser.email,
      title: itemTitle.current.value,
      description: itemDesc.current.value,
      price: parseFloat(price.current.value),
      mileage: parseInt(mileage.current.value),
      modelYear: parseInt(modelYear.current.value),
      manufacturer: manufacturer.current.value,
      images: temp_images,
      duration: dueDate,
      status: "active",
      nextPrice: parseFloat(price.current.value),
      regNumber: regNumber.current.value, // New field
      city: city.current.value, // New field
      transmission, // New field
      carColor: carColor.current.value, // New field
      engineCapacity: parseInt(engineCapacity.current.value), // New field
    };

    setAuction(newAuction);
    onClose();
    closeForm();
  };

  return (
    <>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-full max-h-full overflow-y-auto transition-transform transform scale-95">
            <form onSubmit={submitForm}>
              <div className="mb-4">
                <h2 className="text-2xl font-bold">Create Car Auction</h2>
                {error && <div className="text-red-500 mt-2">{error}</div>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-gray-700">Car Title</label>
                  <input
                    type="text"
                    ref={itemTitle}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700">Description</label>
                  <textarea
                    ref={itemDesc}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Price</label>
                  <input
                    type="number"
                    ref={price}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Mileage</label>
                  <input
                    type="number"
                    ref={mileage}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Model Year</label>
                  <input
                    type="number"
                    ref={modelYear}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Manufacturer</label>
                  <select
                    ref={manufacturer}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">Select Manufacturer</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="Suzuki">Suzuki</option>
                    <option value="Ford">Ford</option>
                    <option value="Chevrolet">Chevrolet</option>
                    <option value="BMW">BMW</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Nissan">Nissan</option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Kia">Kia</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    ref={regNumber}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">City</label>
                  <input
                    type="text"
                    ref={city}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Transmission</label>
                  <select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Car Color</label>
                  <input
                    type="text"
                    ref={carColor}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">
                    Engine Capacity (cc)
                  </label>
                  <input
                    type="number"
                    ref={engineCapacity}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700">Car Images</label>
                  <input
                    type="file"
                    accept=".jpeg, .png, .jpg"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 form-control bg-transparent"
                  />
                  <div className="mt-2">
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className="flex items-center mb-4 p-4 border rounded-lg shadow-lg bg-gray-100 relative"
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
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
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
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700">
                    Duration (hours)
                  </label>
                  <input
                    type="number"
                    ref={duration}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};