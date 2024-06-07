// ParentComponent.js
import React from "react";
import ListingForm from "./ListingForm";
import Navbar from "../../components/Navbar";
import Subbar from "../../components/Subbar";
import Footer from "../../components/footer";

const ListingsPage = () => {
  
  const divStyle = {
    backgroundImage: 'url("../images/listing-pg-bg-img.jpg")', // Replace 'path_to_your_image.jpg' with the actual path to your image file
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh', // Ensure the image covers the entire viewport height
    
  };

  return (
    <>
    <Navbar />
      <Subbar />
    <div style={divStyle}>
      {<ListingForm />}
    </div>
    <Footer />
    </>
  );
};

export default ListingsPage;
