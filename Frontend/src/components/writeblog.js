import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogEditor from "../features/Blogs/WriteBlog";
import AdminNavigation from "./AdminNavigation";

function Writeblog(){
    const [showForm, setShowForm] = useState(false);
    const [blogs, setBlogs] = useState([]);
  


    const handleShowForm = () => {
        setShowForm(!showForm);
      };

    return(
        <>
      <center>
      <div>
        <button
          onClick={handleShowForm}
          className="bg-black text-white rounded-2xl w-[150px] h-[35px]"
        >
          Write a Blog
        </button>
        <br></br>
        <BlogEditor setShowForm={setShowForm} />
      </div>
      </center>
        </>

    );
}

export default Writeblog;