// ParentComponent.js
import React, { useState } from "react";
import ListingForm from "./ListingForm";

const ListingsPage = () => {
  const [submissions, setSubmissions] = useState([]);

  const handleFormSubmit = (newSubmission) => {
    setSubmissions([...submissions, newSubmission]);
  };

  return (
    <div>
      <ListingForm onFormSubmit={handleFormSubmit} />
      <div>
        <h2>Submissions</h2>
        <ul>
          {submissions.map((submission) => (
            <li key={submission.id}>
              <strong>Title:</strong> {submission.title},{" "}
              <strong>Company:</strong> {submission.company}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListingsPage;
