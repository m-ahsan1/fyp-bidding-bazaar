// ParentComponent.js
import React from "react";
import Prepage from "./predictionpage";

const Prediction = () => {
  
  const divStyle = {
    backgroundImage: 'url("../images/listing-pg-bg-img.jpg")', // Replace 'path_to_your_image.jpg' with the actual path to your image file
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh', // Ensure the image covers the entire viewport height
    
  };

  return (
    <>
    <div style={divStyle}>
      <Prepage />
    </div>
    </>
  );
};

export default Prediction;
