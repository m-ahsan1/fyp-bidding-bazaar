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
  const navigate = useNavigate();
  const [showAuctionForm, setShowAuctionForm] = useState(false);
  const [auction, setAuction] = useState(null);

  const handleSimpleSell = () => {
    setShowModal(false);
    navigate("/listings");
  };

  const handleAuction = () => {
    setShowModal(false);
    setShowAuctionForm(true);
  };

  return (
    <div>
      {auction && <ProgressBar auction={auction} setAuction={setAuction} />}
      {showAuctionForm && <AddAuction setAuction={setAuction} onClose={() => setShowAuctionForm(false)} />}

      <div id="secondBar">
        <br />
        <center>
          <span>
            &nbsp;
            {user ? (
              <a href="#" onClick={() => setShowModal(true)}>Post a Car</a>
            ) : null}
            &nbsp; &nbsp;
            <Link to="/blogs">Blogs</Link> &nbsp; &nbsp;
            <Link to="/team">Team</Link> &nbsp; &nbsp;
            <Link to="/predict">Predict Price</Link> &nbsp; &nbsp;
            <Link to="/listingsmain">Simple Listings</Link>
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
            {user && <Dropdown.Item onClick={() => setShowModal(true)}>Post Car</Dropdown.Item>}
            <Dropdown.Item as={Link} to="/predict">Predict Price</Dropdown.Item>
            <Dropdown.Item as={Link} to="/blogs">Blogs</Dropdown.Item>
            <Dropdown.Item as={Link} to="/team">Team</Dropdown.Item>
            <Dropdown.Item as={Link} to="/listingsmain">Simple Listings</Dropdown.Item>
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
      <br />
    </div>
  );
};

export default Subbar;
