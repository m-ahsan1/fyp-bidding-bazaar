import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import "./WriteBlog.css";
import ReactQuill from "react-quill";
import axios from "axios";

const BlogEditor = ({ setShowForm }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // Heading dropdown
      ["bold", "italic", "underline", "strike"], // Text formatting options
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      ["link", "image"], // Links and images
      ["clean"], // Remove formatting
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (value) => {
    setBody(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/api/blogs", {
        title: title,
        body: body,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setBody("");
    setTitle("");
    setShowForm(false);
    console.log("Blog form submitted.");
  };

  return (
    <div className="blog-editor">
      <h2 className="blog-editor__title">Create a Blog</h2>
      <form onSubmit={handleSubmit} className="blog-editor__form">
        <div className="blog-editor__input">
          <label htmlFor="title" className="blog-editor__label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="blog-editor__text-input"
            required
          />
        </div>
        <div className="blog-editor__input">
          <label htmlFor="body" className="blog-editor__label">
            Body:
          </label>
          <ReactQuill
            value={body}
            onChange={handleBodyChange}
            modules={modules}
            formats={formats}
            className="blog-editor__quill-editor"
          />
        </div>

        <button type="submit" className="blog-editor__submit-button">
          Publish
        </button>
      </form>
    </div>
  );
};

export default BlogEditor;
