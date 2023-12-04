// ParentComponent.js
import React, { useEffect, useState } from "react";
import ListingForm from "./ListingForm";
import Navbar from "../../components/Navbar";

const ListingsPage = () => {
  

  return (
    <div>
      <Navbar />
      {<ListingForm />}

      
    </div>
  );
};

export default ListingsPage;
