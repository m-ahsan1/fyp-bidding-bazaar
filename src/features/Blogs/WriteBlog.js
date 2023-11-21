import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import './WriteBlog.css'; // Import your CSS file for styling
import ReactQuill from 'react-quill'; // Import ReactQuill component
import Navbar from '../../components/Navbar';

const BlogEditor = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageURL, setImageURL] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // Heading dropdown
      ['bold', 'italic', 'underline', 'strike'], // Text formatting options
      [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Lists
      ['link', 'image'], // Links and images
      ['clean'], // Remove formatting
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link', 'image'
  ];

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (value) => {
    setBody(value);
  };

  const handleImageChange = (e) => {
    setImageURL(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission logic here
    console.log('Title:', title);
    console.log('Body:', body);
    console.log('Image URL:', imageURL);
  };

  return (
    <> 
    <Navbar />
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
        <div className="blog-editor__input">
          <label htmlFor="imageURL" className="blog-editor__label">
            Image URL:
          </label>
          <input
            type="text"
            id="imageURL"
            value={imageURL}
            onChange={handleImageChange}
            className="blog-editor__text-input"
          />
        </div>
        <button type="submit" className="blog-editor__submit-button">
          Publish
        </button>
      </form>
    </div>
    </>
  );
};

export default BlogEditor;
