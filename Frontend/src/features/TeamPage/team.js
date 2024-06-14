import React from "react";
import teamMember1Image from "./1.png"; // Import your team members' images
import teamMember2Image from "./2.jpg";
import teamMember3Image from "./1.jpeg";

const Team = () => {
  const teamMembers = [
    {
      name: "Abdullah Sohail",
      position: "Data Collection, Price Prediction and Overall Design",
      image: teamMember1Image,
      description:
        "Bidding Bazaar is something which is needed in Pakistani market. Our goal was to provide a platform where people can buy and sell their used car. I was mainly responsible for data collection and price prediction, but I have worked on nearly everything from API to React component.I have done my bachelors in Computer Science. \n Thank you Reading this!!",
      linkedin: "https://www.linkedin.com/in/abdullahsohailcs/",
      twitter: "https://twitter.com/2AbdullahSohail",
    },
    {
      name: "Muhammad Usman Ghani",
      position: "Development, Design, and Testing",
      image: teamMember2Image,
      description:
        "Bidding Bazaar will revolutionize Pakistan's car market by providing a convenient, transparent online auction platform with AI-driven price predictions for accurate and fair vehicle valuations. is a creative designer with a passion for user-centered and visually stunning designs.",
      linkedin: "https://www.linkedin.com/in/mug11/",
      twitter: "https://twitter.com/",
    },
    {
      name: "Muhammad Ahsan",
      position: "Depvelopment and Testing",
      image: teamMember3Image,
      description:
        "Ahsan has sworked with a number of different tools and technologies. He has a strong background in software development and has worked on a number of different projects. He has a strong background in software development and has worked on a number of different projects.",
    },
  ];

  return (
    <>
      <center>
        <div className="container mt-5">
          <h2 className="text-center mb-5 font-weight-bold text-uppercase text-black" style={{ fontSize: '2.5rem' }}>
            Our Amazing Team
          </h2>
          <hr></hr>
          <br></br>
          <div className="row align-items-center">
            {teamMembers.map((member, index) => (
              <div className="col-md-4" key={index}>
                <div className="card mb-4 shadow-sm">
                  <br />
                  <img
                    src={member.image}
                    className="card-img-top"
                    alt={member.name}
                    style={{ height: '200px', objectFit: 'contain' }} // Set the image height and object-fit
                  />
                  <div className="card-body">
                    <h5 className="card-title"><strong>{member.name}</strong></h5>
                    <p className="card-text">{member.position}</p>
                    <hr />
                    <br></br>
                    <p className="card-text">{member.description}</p>
                    <br />
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="btn-group">
                        {/* Add social media links or any other actions */}
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <button type="button" className="btn btn-sm btn-outline-secondary">
                            LinkedIn
                          </button>
                        </a>&nbsp;
                        <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                          <button type="button" className="btn btn-sm btn-outline-secondary">
                            Twitter
                          </button>
                        </a>
                        {/* Add more social media buttons or actions */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </center>
    </>
  );
};

export default Team;
