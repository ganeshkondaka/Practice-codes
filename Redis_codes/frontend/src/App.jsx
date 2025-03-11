import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/blogs").then((response) => {
      setBlogs(response.data);
    });
  }, []);

  const handleAddBlog = async () => {
    await axios.post("http://localhost:5000/blogs", { title, content });
    setTitle("");
    setContent("");

    // Refresh the list after adding a blog
    const response = await axios.get("http://localhost:5000/blogs");
    setBlogs(response.data);
  };

  return (
  
    <div style={{ padding: "20px" }}>
      <h2>Blog List</h2>
      {blogs.map((blog) => (
        <div key={blog._id} style={{ border: "1px solid black", padding: "10px", margin: "10px 0" }}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
        </div>
      ))}
      <h2>Add Blog</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content"></textarea>
      <button onClick={handleAddBlog}>Add Blog</button>
    </div>
  );
}

export default App;
