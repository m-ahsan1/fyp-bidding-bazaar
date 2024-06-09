import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Subbar from "../../components/Subbar";
import Footer from "../../components/footer";

const BlogContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
`;

const BlogItem = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 25px;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  h3 {
    margin-bottom: 15px;
    color: #333;
    font-size: 2em;
  }

  div {
    margin-bottom: 15px;
    color: #666;
    font-size: 1.1em;
    line-height: 1.6;
  }
`;

const ReadMore = styled(Link)`
  display: inline-block;
  margin-top: 10px;
  padding: 12px 24px;
  background-color: #007bff;
  color: #fff;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  font-size: 1em;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    margin: 0 10px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background-color: #0056b3;
    }
  }
`;

function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

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

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const divStyle = {
    backgroundImage: 'url("../images/listing-pg-bg-img.jpg")', // Replace 'path_to_your_image.jpg' with the actual path to your image file
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh', // Ensure the image covers the entire viewport height
    
  };

  return (
    <>
    <Navbar />
    <Subbar />

    <div  style={divStyle}>
    <br></br>
      <BlogContainer>
        <center>
          <br />
          <h1 style={{ fontSize: "3em", textAlign: "center", color: "#333", marginBottom: "20px" }}><b>Our Blogs</b></h1>
          <hr style={{ marginBottom: "30px", border: "none", height: "2px", backgroundColor: "#007bff", width: "50%" }} />
        </center>
        {currentBlogs.map((blog) => (
          <BlogItem key={blog._id}>
            <h3>{blog.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: blog.body.slice(0, 150) + "..." }}></div>
            <ReadMore to={`/blogs/${blog._id}`}>Read More</ReadMore>
          </BlogItem>
        ))}
        <Pagination>
          <button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button onClick={nextPage} disabled={currentPage * blogsPerPage >= blogs.length}>
            Next
          </button>
        </Pagination>
      </BlogContainer>
      <br></br>
      <Footer />
    </div>
    </>
  );
}

export default BlogsPage;
