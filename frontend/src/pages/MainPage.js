import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
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

  return (
    <>
    <Navbar />
    <div className="flex items-center flex-row">
      <div>
        <Sidebar />
      </div>
    </div>

    <center>
    <div className="mb-3" style={{width:"50%"}}>
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <input
            type="search"
            value={search}
            className="relative m-0 block min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
            onChange={(e) => setSearch(e.target.value)}
          />

          <span
            className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
            id="basic-addon2"
          >
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
      </center>

      <div>
        <div className="flex flex-wrap px-10 gap-10">
          {listings
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(search);
            })
            .map((item) => (
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
