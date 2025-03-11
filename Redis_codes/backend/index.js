require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Blog Schema
const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Blog = mongoose.model("Blog", BlogSchema);

// Connect to Redis
const redisClient = redis.createClient({ url: process.env.REDIS_URI });
redisClient.connect();

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

// API to fetch all blogs (With Redis Caching)
app.get("/blogs", async (req, res) => {
  try {
    // fetching from redis
    const cachedBlogs = await redisClient.get("blogs");

    if (cachedBlogs) {
      console.log("Cache hit");
      return res.json(JSON.parse(cachedBlogs));
    }

    console.log("Cache miss");
    const blogs = await Blog.find();

    // adding blogs to redis cache
    await redisClient.setEx("blogs", 60, JSON.stringify(blogs)); // Cache for 60 sec

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API to add a new blog
app.post("/blogs", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newBlog = new Blog({ title, content });
    await newBlog.save();

    await redisClient.del("blogs"); // Clear cache after adding new data

    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
