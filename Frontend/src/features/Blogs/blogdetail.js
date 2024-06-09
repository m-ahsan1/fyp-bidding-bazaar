import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import Subbar from '../../components/Subbar';
import Footer from '../../components/footer';

const BlogContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <Subbar />
      <BlogContainer>
        <h2>{blog.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: blog.body }}></div>
      </BlogContainer>
      <Footer />
    </div>
  );
};

export default BlogDetail;
