import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase";

export const AddAuction = ({ setAuction }) => {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  console.log("auth: ", auth.currentUser.email);
  const itemTitle = useRef();
  const itemDesc = useRef();
  const startPrice = useRef();
  const itemDuration = useRef();
  const itemImage = useRef();

  // const { currentUser } = useContext(AuthContext);
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

    let currentDate = new Date();
    let dueDate = currentDate.setHours(
      currentDate.getHours() + parseInt(itemDuration.current.value)
    );

    let newAuction = {
      email: currentUser.email, // Use user.email instead of currentUser.email
      title: itemTitle.current.value,
      desc: itemDesc.current.value,
      curPrice: parseFloat(startPrice.current.value),
      duration: dueDate,
      itemImage: itemImage.current.files[0],
    };

    setAuction(newAuction);
    closeForm();
  };

  return (
    <>
      <div className="flex justify-center my-3">
        <button onClick={openForm} className="btn btn-outline-secondary mx-2">
          + Auction
        </button>
      </div>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <form onSubmit={submitForm}>
              <div className="mb-4">
                <h2 className="text-2xl font-bold">Create Auction</h2>
                {error && <div className="text-red-500 mt-2">{error}</div>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-gray-700">Item Title</label>
                  <input
                    type="text"
                    ref={itemTitle}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700">
                    Item Description
                  </label>
                  <input
                    type="text"
                    ref={itemDesc}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Start Price</label>
                  <input
                    type="number"
                    ref={startPrice}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">
                    Item Duration (hours)
                  </label>
                  <input
                    type="number"
                    ref={itemDuration}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Seller</label>
                  <input
                    type="text"
                    value={currentUser.email}
                    readOnly
                    className="w-full px-4 py-2 mt-2 border rounded-md bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Item Image</label>
                  <input
                    type="file"
                    ref={itemImage}
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
