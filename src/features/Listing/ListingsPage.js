// ParentComponent.js
import React, { useState } from "react";
import ListingForm from "./ListingForm";
import Listing from "./Listing";
import carData from "./carData";
import Navbar from "../../components/Navbar";

const ListingsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleFormSubmit = (newSubmission) => {
    setSubmissions([...submissions, newSubmission]);
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <Navbar />
      {showForm && <ListingForm onFormSubmit={handleFormSubmit} />}
      <div>
        <button
          type="button"
          onClick={handleShowForm}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Post a Car
        </button>
        <div className="flex flex-wrap">
          {carData.map((car) => (
            <div key={car.id} className="px-4 py-10">
              <Listing
                image={car.image}
                title={car.title}
                price={car.price}
                engine={car.engine}
                mileage={car.mileage}
                modelYear={car.modelYear}
                description={car.description}
                company={car.company}
              />
            </div>
          ))}

          {submissions.map((submission) => (
            <div key={submission.id} className="">
              <Listing
                image={submission.image}
                title={submission.title}
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
