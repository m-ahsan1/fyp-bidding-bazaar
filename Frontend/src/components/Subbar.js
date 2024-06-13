import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { AddAuction } from "../features/Auction/AddAuction";
import { ProgressBar } from "../features/Auction/ProgressBar";

const Subbar = () => {
  const user = useSelector(selectUser);
  const [showModal, setShowModal] = useState(false);
  const Navigate = useNavigate();
  const [showAuctionForm, setShowAuctionForm] = useState(false);
  const [auction, setAuction] = useState(null);

  const handleSimpleSell = () => {
    setShowModal(false);
    Navigate("/listings")
  };

  const handleAuction = () => {
    setShowModal(false);
    setShowAuctionForm(true);
    console.log("Auction form opened");
  };

  return (
    <div>
      {auction && <ProgressBar auction={auction} setAuction={setAuction} />}
      {showAuctionForm && <AddAuction setAuction={setAuction} onClose={()=>setShowAuctionForm(false)}/>}
      {showAuctionForm && (console.log("Auction form opened"))}
      <div id="secondBar">
        <br />
        <center>
          <span>
            &nbsp;
            {user ? (
              <>
                <a href="#" onClick={() => setShowModal(true)}>Post a Car</a>
              </>
            ) : null}
            &nbsp; &nbsp;
            <a href="#"><Link to="/blogs">Blogs</Link></a> &nbsp; &nbsp;
            <a href="#"><Link to="/team">Team</Link></a> &nbsp; &nbsp;
            <a href="#"><Link to="/predict">Predict Price</Link></a>
          </span>
        </center>
        <hr />
      </div>
      <div id="secondBarMobile">
        <hr />
        <Dropdown>
          <hr />
          <Dropdown.Toggle
            variant="primary"
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "grey"
            }}
          >
            More options
          </Dropdown.Toggle>
          <hr />

          <Dropdown.Menu style={{ width: "100%" }}>
            {user && <Dropdown.Item href="#"><Link to="/listings">Post Car</Link></Dropdown.Item>}
            <Dropdown.Item href="#"><Link to="/predict">Predict Price</Link></Dropdown.Item>
            <Dropdown.Item href="#"><Link to="/blogs">Blogs</Link></Dropdown.Item>
            <Dropdown.Item href="#"><Link to="/team">Team</Link></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Post a Car</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p className="mb-4">Choose how you want to post your car:</p>
          <Button variant="primary" onClick={handleSimpleSell} className="w-100 bg-blue-400">
            Simple Selling
          </Button>
          <Button variant="secondary" onClick={handleAuction} className="w-100 mt-3 bg-gray-500">
            Auction
          </Button>
        </Modal.Body>
      </Modal>
      <br></br>
    </div>
  );
};

export default Subbar;
