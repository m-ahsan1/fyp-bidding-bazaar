// ParentComponent.js
import React, { useEffect, useState } from "react";
import ListingForm from "./ListingForm";
import Listing from "./Listing";
import axios from "axios";
import Navbar from "../../components/Navbar";

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/listings");
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      {showForm && <ListingForm />}
      <div>
        <button
          type="button"
          onClick={handleShowForm}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Post a Car
        </button>
        <div className="flex flex-wrap px-10 gap-10">
          {listings.map((submission) => (
            <div key={submission._id}>
              <Listing
                image={submission.image}
                title={submission.title}
                price={submission.price}
                engine={submission.engine}
                mileage={submission.mileage}
                modelYear={submission.modelYear}
                description={submission.description}
                company={submission.company}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;
