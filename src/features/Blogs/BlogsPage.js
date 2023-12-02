import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogEditor from "./WriteBlog";

import styled from "styled-components";
import Navbar from "../../components/Navbar";

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

function BlogsPage() {
  const [showForm, setShowForm] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <div>
        <button onClick={handleShowForm}>Write a Blog</button>
        {showForm && <BlogEditor />}
      </div>
      <BlogContainer>
        <h2>Blogs </h2>
        {blogs.map((blog) => (
          <BlogItem key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.body}</p>
          </BlogItem>
        ))}
      </BlogContainer>
    </div>
  );
}

export default BlogsPage;
