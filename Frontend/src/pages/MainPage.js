import React, { useEffect, useState } from "react";
import Listing from "../features/Listing/Listing";
import apiServerNode from "../apiServerNodeConfig";
import { auth } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { fetchListings } from "../redux/slices/listingSlice";
import styled from "styled-components";

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px;
    margin: 0 5px;
    cursor: pointer;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;

function MainPage() {
  const [search, setSearch] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 15;
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listing.items);

  useEffect(() => {
    if (user) {
      console.log("User is logged in!");
      return;
    }
    setRecommendations([]);
  }, [user]);

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!auth.currentUser) {
        console.log("User is not logged in!");
        return;
      }
      try {
        const userId = auth.currentUser.uid;
        const response = await apiServerNode.get(
          `/api/userRecommendations/${userId}`
        );
        setRecommendations(response.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [auth.currentUser]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const filteredListings = Array.isArray(listings)
    ? listings.filter((item) =>
        search.toLowerCase() === ""
          ? true
          : item.title.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = filteredListings.slice(
    indexOfFirstListing,
    indexOfLastListing
  );

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="ml-4 flex flex-col items-center">
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
          <>
            <h2 className="text-2xl font-bold mb-2" style={{ paddingTop: "2%" }}>
              Recommended Listings
            </h2>
            <div className="flex flex-wrap gap-10 justify-around" style={{ paddingLeft: "2%", paddingRight: "2%" }}>
              {recommendations.map((recommendationId) => {
                const recommendedListing = listings.find((item) => item._id === recommendationId);
                return (
                  recommendedListing && (
                    <div key={recommendedListing._id}>
                      <Listing
                        id={recommendedListing._id}
                        images={recommendedListing.images}
                        title={recommendedListing.title}
                        price={recommendedListing.price}
                        engine={recommendedListing.engine}
                        mileage={recommendedListing.mileage}
                        modelYear={recommendedListing.modelYear}
                        description={recommendedListing.description}
                        company={recommendedListing.company}
                        color={recommendedListing.color}
                        transmission={recommendedListing.transmission}
                        city={recommendedListing.city}
                        regno={recommendedListing.regno}
                      />
                    </div>
                  )
                );
              })}
            </div>
          </>
        )}
        {search === "" ? (
          <h2 className="text-2xl font-bold mb-2" style={{ paddingTop: "5%" }}>
            All Listings
          </h2>
        ) : (
          <h2 className="text-2xl font-bold mb-2" style={{ paddingTop: "2%" }}>
            Search Results
          </h2>
        )}
        <div className="flex flex-wrap gap-10 justify-around" style={{ paddingLeft: "2%", paddingRight: "2%" }}>
          {currentListings.map((item) => (
            <div key={item._id}>
              <Listing
                id={item._id}
                images={item.images}
                title={item.title}
                price={item.price}
                engine={item.engine}
                mileage={item.mileage}
                modelYear={item.modelYear}
                description={item.description}
                company={item.company}
                currentBid={item.currentBid}
                uid={item.uid}
                color={item.color}
                city={item.city}
                transmission={item.transmission}
                regno={item.regno}
              />
            </div>
          ))}
        </div>
        <Pagination>
          <button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button onClick={nextPage} disabled={indexOfLastListing >= filteredListings.length}>
            Next
          </button>
        </Pagination>
        <br></br>
      </div>

    </>
  );
}

export default MainPage;
