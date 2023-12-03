import axios from "axios";
import React from "react";
import StripeCheckout from "react-stripe-checkout";

function Listing({
  image,
  title,
  price,
  engine,
  mileage,
  modelYear,
  description,
  company,
}) {
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
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" w-[400px] overflow-hidder rounded shadow-lg">
      <img className="w-[400px] h-[200px]" src={image} alt="Listed Car"></img>
      <div className="px-6 py-4">
        <div className="flex flex-row justify-between">
          <div className="font-bold text-xl mb-2  whitespace-normal">
            {title}
          </div>
          <div className="font-bold text-xl mb-2  whitespace-normal text-green-400">
            {price}
          </div>
        </div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {company}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {engine}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {modelYear}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {mileage}
        </span>
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
      </div>
    </div>
  );
}

export default Listing;
