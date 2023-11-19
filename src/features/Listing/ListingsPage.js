// ParentComponent.js
import React, { useState } from "react";
import ListingForm from "./ListingForm";
import Listing from "./Listing";
import carData from "./carData";

const ListingsPage = () => {
  const [submissions, setSubmissions] = useState([]);

  const handleFormSubmit = (newSubmission) => {
    setSubmissions([...submissions, newSubmission]);
  };

  return (
    <div>
      <ListingForm onFormSubmit={handleFormSubmit} />
      <div>
        <h2>Submissions</h2>
        <div className="flex flex-wrap">
          {carData.map((car) => (
            <div key={car.id} className="">
              <Listing
                image={car.image}
                price={car.price}
                title={car.title}
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
