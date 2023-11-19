// ListingForm.js
import React, { useState } from "react";

const ListingForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    engine: "",
    mileage: "",
    modelYear: "",
    description: "",
    company: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.engine) newErrors.engine = "Engine is required";
    if (!formData.mileage) newErrors.mileage = "Mileage is required";
    if (!formData.modelYear) newErrors.modelYear = "Model Year is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.company) newErrors.company = "Company is required";

    setErrors(newErrors);

    // If there are no errors, handle form submission logic here
    if (Object.keys(newErrors).length === 0) {
      console.log(formData);
      // Handle form submission logic here
      const newSubmission = { ...formData, id: Date.now() };
      onFormSubmit(newSubmission);

      // Clear the form
      setFormData({
        image: null,
        title: "",
        engine: "",
        mileage: "",
        modelYear: "",
        description: "",
        company: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-center flex-col bg-gray-500">
        <div>
          <label>Image:</label>
          <input type="file" name="image" onChange={handleChange} />
        </div>

        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <p>{errors.title}</p>}
        </div>

        <div>
          <label>Engine:</label>
          <input
            type="text"
            name="engine"
            value={formData.engine}
            onChange={handleChange}
          />
          {errors.engine && <p>{errors.engine}</p>}
        </div>

        <div>
          <label>Mileage:</label>
          <input
            type="text"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
          />
          {errors.mileage && <p>{errors.mileage}</p>}
        </div>

        <div>
          <label>Model Year:</label>
          <input
            type="text"
            name="modelYear"
            value={formData.modelYear}
            onChange={handleChange}
          />
          {errors.modelYear && <p>{errors.modelYear}</p>}
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          {errors.description && <p>{errors.description}</p>}
        </div>

        <div>
          <label>Company:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
          {errors.company && <p>{errors.company}</p>}
        </div>

        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default ListingForm;
