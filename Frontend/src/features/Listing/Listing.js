import apiServerNode from "../../apiServerNodeConfig";
import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import { auth } from "../../firebase";
import { deleteListing } from "../..//redux/slices/listingSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Listing({
  id,
  images,
  title,
  price,
  engine,
  mileage,
  modelYear,
  description,
  company,
  currentBid,
  uid,
  color,
  transmission,
  city,
  regno,
}) {
  const navigate = useNavigate();

  const shortenDescription =
    description.length > 150
      ? description.substring(0, 150) + "..."
      : description;

  return (
    <div
      className="w-[400px] overflow-hidden rounded-lg shadow-lg"
      onClick={() => { navigate(`/sell/${id}`); }}
    >
      {images != null && images.length > 1 && (
        <img
          className="w-[400px] h-[200px] text-center"
          src={images[0].base64}
          alt="Image not loaded"
        ></img>
      )}

      <div className="px-6 py-4">
        <div className="flex flex-row justify-between">
          <div className="font-bold text-lg mb-2 whitespace-normal">
            {title}
          </div>
          <div className="font-bold text-lg mb-2 whitespace-normal text-green-400">
            {price} PKR
          </div>
        </div>
        <p className="text-gray-700 text-sm">{shortenDescription}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
          {company}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
          {engine} cc
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
          {modelYear}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
          {mileage} kms
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
          {color}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
          {transmission}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
          {city}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
          {regno}
        </span>
      </div>
    </div>
  );
}
export default Listing;
