import React from 'react'

export const Blogs = ({allblogs}) => {
    console.log('allblogs :',allblogs)
    return (
        <div>
            <div style={{ padding: "20px" }}>
                <h2>Blog List</h2>
                {allblogs.map((blog) => (
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
        </div>
    )
}
