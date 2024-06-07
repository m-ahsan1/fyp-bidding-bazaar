import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogEditor from "./WriteBlog";
import { MdDelete } from "react-icons/md";
import Footer from "../../components/footer";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Subbar from "../../components/Subbar";

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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px;
    margin: 0 5px;
    cursor: pointer;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;

function BlogsPage() {
  const [showForm, setShowForm] = useState(false);
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

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        "http://localhost:3001/api/blogs/" + id
      );

      console.log("Delete successful:", response);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <Navbar />
      <Subbar />
      {/*<div>
        <button
          onClick={handleShowForm}
          className="bg-black text-white rounded-2xl w-[150px] h-[35px]"
        >
          Write a Blog
        </button>
        {showForm && <BlogEditor setShowForm={setShowForm} />}
      </div>*/}
      <BlogContainer>
      <center>
        <br></br>
        <h1 style={{ fontSize: 20, textAlign: "center" }}><b>Blogs</b></h1>
        <br></br>
        </center>
        {currentBlogs.map((blog) => (
          <BlogItem key={blog._id}>
            <h3 style={{ fontSize: 25, textAlign: "center" }}>{blog.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: blog.body }}></div>
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
      <Footer />
    </div>
  );
}

export default BlogsPage;
