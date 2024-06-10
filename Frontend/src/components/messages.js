import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavigation from "./AdminNavigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import './messages.css'; // Create and import your custom CSS
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage] = useState(5); // Number of messages per page

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/contactus");
        setMessages(response.data.reverse());
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  // Pagination logic
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            <h2>All Messages</h2>
          </div>
          <ul className="list-group list-group-flush">
            {currentMessages.map((message) => (
              <li key={message._id} className="list-group-item">
                <p><strong>Name:</strong>{message.name}</p>
                <p><strong>Email:</strong> {message.email}</p>
                <p><strong>Message:</strong> {message.message}</p>
              </li>
            ))}
          </ul>
          <div className="card-footer">
            {/* Pagination */}
            <nav>
              <ul className="pagination justify-content-center">
                {Array.from({ length: Math.ceil(messages.length / messagesPerPage) }, (_, index) => (
                  <li key={index} className="page-item">
                    <button onClick={() => paginate(index + 1)} className="page-link">
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
