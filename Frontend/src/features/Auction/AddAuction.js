import React, { useRef, useState } from "react";
import { auth } from "../../firebase";

export const AddAuction = ({ setAuction }) => {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const itemTitle = useRef();
  const itemDesc = useRef();
  const price = useRef();
  const mileage = useRef();
  const modelYear = useRef();
  const manufacturer = useRef();
  const itemImage = useRef();
  const duration = useRef();

  const currentUser = auth.currentUser;

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const imgTypes = ["image/png", "image/jpeg", "image/jpg"];

  const submitForm = async (e) => {
    e.preventDefault();
    setError("");

    if (!imgTypes.includes(itemImage.current.files[0].type)) {
      return setError("Please use a valid image");
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

    let currentDate = new Date();
    let dueDate = currentDate.setHours(
      currentDate.getHours() + parseInt(duration.current.value)
    );

    let newAuction = {
      email: currentUser.email,
      title: itemTitle.current.value,
      description: itemDesc.current.value,
      price: parseFloat(price.current.value),
      mileage: parseInt(mileage.current.value),
      modelYear: parseInt(modelYear.current.value),
      manufacturer: manufacturer.current.value,
      itemImage: itemImage.current.files[0],
      duration: dueDate,
    };

    setAuction(newAuction);
    closeForm();
  };

  return (
    <>
      <div className="flex justify-center my-3">
        <button onClick={openForm} className="btn btn-outline-secondary mx-2">
          + Add Car Auction
        </button>
      </div>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
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
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700">Description</label>
                  <textarea
                    ref={itemDesc}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Price</label>
                  <input
                    type="number"
                    ref={price}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Mileage</label>
                  <input
                    type="number"
                    ref={mileage}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Model Year</label>
                  <input
                    type="number"
                    ref={modelYear}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Manufacturer</label>
                  <select
                    ref={manufacturer}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    <option value="">Select Manufacturer</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
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
                <div className="col-span-2">
                  <label className="block text-gray-700">Car Image</label>
                  <input
                    type="file"
                    ref={itemImage}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700">
                    Duration (hours)
                  </label>
                  <input
                    type="number"
                    ref={duration}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={closeForm}
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
