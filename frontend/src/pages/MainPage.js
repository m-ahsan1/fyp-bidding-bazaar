import React, { useEffect, useState } from "react";
import Subbar from "../components/Subbar";
import Navbar from "../components/Navbar";
import Listing from "../features/Listing/Listing";
import axios from "axios";

function MainPage() {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");

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

        
        <div className="flex flex-wrap gap-10" style={{paddingLeft:"7%"}}> 
          {filteredListings.map((item) => (
             <div key={item._id}>
              <Listing
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
