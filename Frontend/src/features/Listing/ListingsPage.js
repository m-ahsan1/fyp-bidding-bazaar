// ParentComponent.js
import React from "react";
import ListingForm from "./ListingForm";

const ListingsPage = () => {
  
  const divStyle = {
    backgroundImage: 'url("../images/listing-pg-bg-img.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    
  };

  return (
    <>
    <div style={divStyle}>
      {<ListingForm />}
    </div>
    </>
  );
};

export default ListingsPage;
