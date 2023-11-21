import React from "react";
import teamMember1Image from "./1.jpg"; // Import your team members' images
import teamMember2Image from "./2.jpg";
import Navbar from "../../components/Navbar";
// ... import other team member images as needed

const Team = () => {
  const teamMembers = [
    {
      name: "John Doe",
      position: "CEO & Founder",
      image: teamMember1Image,
      description:
        "John is an experienced leader with a strong background in project management and strategy.",
    },
    {
      name: "Jane Smith",
      position: "Head of Design",
      image: teamMember2Image,
      description:
        "Jane is a creative designer with a passion for user-centered and visually stunning designs.",
    },
    // Add more team members similarly
  ];

  return (
    <>
    <Navbar />
    <center>
    <div className="container mt-5">
    <h2 className="text-center mb-5">Our Team</h2>
    <div className="row">
      {teamMembers.map((member, index) => (
        <div className="col-md-4" key={index}>
          <div className="card mb-4 shadow-sm">
            <img
              src={member.image}
              className="card-img-top"
              alt={member.name}
              style={{ height: '200px', objectFit: 'cover' }} // Set the image height and object-fit
            />
            <div className="card-body">
              <h5 className="card-title">{member.name}</h5>
              <p className="card-text">{member.position}</p>
              <p className="card-text">{member.description}</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  {/* Add social media links or any other actions */}
                  <button type="button" className="btn btn-sm btn-outline-secondary">
                    LinkedIn
                  </button>
                  <button type="button" className="btn btn-sm btn-outline-secondary">
                    Twitter
                  </button>
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
