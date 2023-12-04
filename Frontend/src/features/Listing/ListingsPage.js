// ParentComponent.js
import React, { useEffect, useState } from "react";
import ListingForm from "./ListingForm";
import Navbar from "../../components/Navbar";

const ListingsPage = () => {
  
  const divStyle = {
    backgroundImage: 'url("../images/listing-pg-bg-img.jpg")', // Replace 'path_to_your_image.jpg' with the actual path to your image file
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh', // Ensure the image covers the entire viewport height
    
  };

  return (
    <div style={divStyle}>
      <Navbar />
      {<ListingForm />}

      
    </div>
  );
};

export default ListingsPage;
