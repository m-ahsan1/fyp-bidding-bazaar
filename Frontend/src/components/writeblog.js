import React, { useState } from "react";
import BlogEditor from "../features/Blogs/WriteBlog";
import AdminNavigation from "./AdminNavigation";

function Writeblog() {


  return (
    <div>
      <center>
        <br />
        <BlogEditor/>
      </center>
    </div>
  );
}

export default Writeblog;
