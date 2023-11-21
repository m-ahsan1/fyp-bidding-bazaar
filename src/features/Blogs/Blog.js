import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';


const BlogContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const BlogItem = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;

  h3 {
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 5px;
  }
`;

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setBlogs(response.data.slice(0, 5)); // Limiting to first 5 blogs for example
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
    <Navbar />
    <BlogContainer>
      <h2>Blog List</h2>
      {blogs.map(blog => (
        <BlogItem key={blog.id}>
          <h3>{blog.title}</h3>
          <p>
            <strong>User ID:</strong> {blog.userId}
          </p>
          <p>{blog.body}</p>
        </BlogItem>
      ))}
    </BlogContainer>
    </>
  );
};

export default BlogList;
