import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavigation from './AdminNavigation';
import { useNavigate } from "react-router-dom";

const AdminListings = () => {
  const [listings, setListings] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/listings');
        setListings(response.data.reverse());
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Assuming the admin is authenticated and token is stored in localStorage
      await axios.delete(`http://localhost:3001/api/listings/${id}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setMessage('Listing deleted successfully');
      setListings(listings.filter(listing => listing._id !== id));
    } catch (error) {
      console.error('Error deleting listing:', error);
      setMessage('Error deleting listing');
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token exists, redirect to /admin
      navigate('/admin', { replace: true });
    }
  }, []);

  return (
    <>
      <AdminNavigation />
      <div className="container mt-5">
        <div className="card">
          <div className="card-header text-center">
            <h2>All Listings</h2>
          </div>
          <div className="card-body">
            {message && <p className="alert alert-info">{message}</p>}
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Engine</th>
                  <th>Mileage</th>
                  <th>Model Year</th>
                  <th>Company</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing) => (
                  <tr key={listing._id}>
                    <td>
                      <img src={listing.image} alt={listing.title} width="100" />
                    </td>
                    <td>{listing.title}</td>
                    <td>{listing.price}</td>
                    <td>{listing.engine}</td>
                    <td>{listing.mileage}</td>
                    <td>{listing.modelYear}</td>
                    <td>{listing.company}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(listing._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminListings;
