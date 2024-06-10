import axios from "axios";
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
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const publishableKey =
    "pk_test_51OJKAXLYINFqcfoRE0wdt2axn9TVcPLJMeGZzmFBavqw5c8x2xTSRqxnVsjuGMWZIWDsYT6M4MB7eW8bUPFRNy2Z00u3wQxOhi";
  const payNow = async (token, price) => {
    try {
      const response = await axios({
        url: "http:localhost:3001/api/payment",
        method: "post",
        data: {
          amount: price,
          token,
        },
      });

      if (response.status === 200) {
        console.log("Payment was sucessful!");
        await postInteraction("pay");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postInteraction = async (type) => {
    if (!auth.currentUser) {
      console.log("User is not logged in!");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/userInteractions",
        {
          userId: auth.currentUser.uid,
          listingId: id,
          interactionType: type,
        }
      );

      if (response.status === 200) {
        console.log("Interaction was sucessful!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
    // url is after semi-colon
    try {
      doc.addImage(images[0], "JPEG", 10, 10, 150, 100);
      doc.setFontSize(16);
      doc.text(title, 70, 120);
      doc.text(`Price: ${price} PKR`, 70, 140);
      doc.setFontSize(12);
      doc.text(`Manufacturer: ${company}`, 70, 160);
      doc.text(`Engine: ${engine} cc`, 70, 175);
      doc.text(`Mileage: ${mileage} kms`, 70, 190);
      doc.text(`Model Year: ${modelYear}`, 70, 205);
      doc.text(description, 70, 220, { align: "justify", width: 150 });

      doc.save("car-details.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const [newBid, setNewBid] = useState(0);
  const [showPayButton, setShowPayButton] = useState(false);
  const handleBid = () => {
    if (newBid > currentBid) {
      axios
        .patch(`http://localhost:3001/api/listings/${id}`, {
          currentBid: newBid,
        })
        .then((response) => {
          console.log("Updated listing:", response.data);
          setShowPayButton(true);
          toast.success("Bid placed successfully! You can Pay.");
        })
        .catch((error) => {
          console.error(
            "Error updating listing:",
            error.response ? error.response.data : error.message
          );
        });
    } else {
      toast.error("New bid must be greater than the current bid");
    }
  };

  const handleDelete = () => {
    dispatch(deleteListing(id));
  };

  const shortenDescription =
    description.length > 150
      ? description.substring(0, 150) + "..."
      : description;

  return (
    <div
      className="w-[400px] overflow-hidden rounded-lg shadow-lg"
      onClick={handleClick}
    >
      {images != null && images.length > 1 && (
        <>
          {(() => {
            debugger;
          })()}
          <img
            className="w-[400px] h-[200px] text-center"
            src={images[0].base64}
            alt="Image not loaded"
            onClick = {() => { navigate(`/product/${id}`); }}
          ></img>
        </>
      )}

      <div className="px-6 py-4">
        <div className="flex flex-row justify-between">
          <div className="font-bold text-lg mb-2 whitespace-normal">
            {title}
          </div>
          <div className="font-bold text-lg mb-2 whitespace-normal text-green-400">
            {price} PKR
          </div>
          {/* <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            onClick={generatePDF}
          >
            PDF
          </button> */}
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
        <span>Current Bid: {currentBid}</span>

        {uid && auth.currentUser?.uid !== uid ? (
          <div className="flex flex-row justify-between">
            <Popup
              trigger={
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                  Bid
                </button>
              }
              position="right center"
            >
              <input
                type="text"
                placeholder="Enter bid amount"
                value={newBid}
                onChange={(e) => setNewBid(e.target.value)}
              />

              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => handleBid()}
              >
                Bid
              </button>
            </Popup>

            {showPayButton && (
              <StripeCheckout
                stripeKey={publishableKey}
                label="Pay"
                name="Pay with Credit Card"
                billingAddress
                shippingAddress
                amount={price}
                description={"Your total is " + price}
                token={payNow}
              />
            )}
          </div>
        ) : (
          <div>
            <div>
              <button
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
            <div>
              <button
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={handleDelete}
              >
                Start Bid
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Listing;
