import React, { useEffect, useState } from "react";
import Subbar from "../components/Subbar";
import Navbar from "../components/Navbar";
import Listing from "../features/Listing/Listing";
import axios from "axios";
import { auth } from "../firebase";

function MainPage() {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/listings");
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!auth.currentUser) {
        console.log("User is not logged in!");
        return;
      }
      try {
        const userId = auth.currentUser.uid;
        const response = await axios.get(`http://localhost:3001/api/userRecommendations/${userId}`);
        setRecommendations(response.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [auth.currentUser]); // Ensure that this effect runs only once on component mount


  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredListings = listings.filter((item) =>
    search.toLowerCase() === "" ? true : item.title.toLowerCase().includes(search)
  );

  return (
    <>
      <Navbar />
      <Subbar />

      <div className="ml-4 flex flex-col items-center"> {/* Updated container */}
        <div className="mb-3" style={{ width: "50%" }}>
          <div className="relative flex w-full items-stretch">
            <input
              type="search"
              value={search}
              className="border rounded px-3 py-1.5 text-base w-full"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
              onChange={handleSearchChange}
            />
            <span className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>
        {search === "" && auth.currentUser && recommendations.length > 0 && (
          // console.log(recommendations),
          <>
            <h2 className="text-2xl font-bold mb-2" style={{ paddingTop: "2%" }}>Recommended Listings</h2>
            <div className="flex flex-wrap gap-10 justify-around" style={{ paddingLeft: "2%", paddingRight: "2%" }}>
              {/* Display recommendations at the top */}
              {recommendations.map((recommendationId) => {
                const recommendedListing = listings.find((item) => item._id === recommendationId);
                // console.log("user" + recommendedListing.title);
                return recommendedListing && (
                  <div key={recommendedListing._id}>
                    <Listing
                      id={recommendedListing._id}
                      image={recommendedListing.image}
                      title={recommendedListing.title}
                      price={recommendedListing.price}
                      engine={recommendedListing.engine}
                      mileage={recommendedListing.mileage}
                      modelYear={recommendedListing.modelYear}
                      description={recommendedListing.description}
                      company={recommendedListing.company} />
                  </div>
                )
              })}
            </div>
          </>
        )}

        {search === "" ?
          (<h2 className="text-2xl font-bold mb-2" style={{ paddingTop: "5%" }}>All Listings</h2>) :
          (<h2 className="text-2xl font-bold mb-2" style={{ paddingTop: "2%" }}>Search Results</h2>)
        }
        <div className="flex flex-wrap gap-10 justify-around" style={{ paddingLeft: "2%", paddingRight: "2%" }}>
          {filteredListings.map((item) => (
            <div key={item}>
              <Listing
                id={item._id}
                image={item.image}
                title={item.title}
                price={item.price}
                engine={item.engine}
                mileage={item.mileage}
                modelYear={item.modelYear}
                description={item.description}
                company={item.company}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MainPage;
