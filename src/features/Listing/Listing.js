import React from "react";

function Listing({ title, company, engine, modelYear, mileage }) {
  return (
    <div className="h-[50px] w-[50px]">
      <h1>{title}</h1>
      <p>{company}</p>
    </div>
  );
}

export default Listing;
