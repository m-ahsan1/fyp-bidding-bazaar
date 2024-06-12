import React, { useEffect, useState } from 'react';
import apiServerNode from "../../apiServerNodeConfig";
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

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
        const response = await apiServerNode.get(`/api/blogs/${id}`);
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
      <BlogContainer>
        <center>
        <h1 style={{ fontSize: "3em", textAlign: "center", color: "#333", marginBottom: "20px" }}>{blog.title}</h1>
        <hr></hr>
        <br></br>
        <div dangerouslySetInnerHTML={{ __html: blog.body }}></div>
        </center>
      </BlogContainer>
    </div>
  );
};

export default BlogDetail;
