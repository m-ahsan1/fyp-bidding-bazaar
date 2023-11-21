import React, { useState } from 'react';
import './WriteBlog.css'; // Import your CSS file for styling

const BlogEditor = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleImageChange = (e) => {
    setImageURL(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle submission logic here, like sending the blog data to a server
    console.log('Title:', title);
    console.log('Body:', body);
    console.log('Image URL:', imageURL);
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
          <textarea
            id="body"
            value={body}
            onChange={handleBodyChange}
            className="blog-editor__textarea"
            required
          ></textarea>
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
  );
};

export default BlogEditor;