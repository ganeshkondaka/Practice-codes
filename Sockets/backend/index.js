const express = require("express"); // Import Express framework
const http = require("http"); // Import HTTP module to create server
const { Server } = require("socket.io"); // Import `Server` class from Socket.io
const cors = require("cors"); // Import CORS to allow cross-origin requests

const app = express(); // Create an Express application
const server = http.createServer(app); // Create an HTTP server using Express

// Initialize Socket.io server and enable CORS for frontend communication
const io = new Server(server, {
    cors: {
        origin: "*", // Adjust according to your frontend's running portr origin is on any port
      }
    });
    

app.use(cors()); // Enable CORS for all Express routes

// Listen for new client connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id); // Log when a user connects

  // Listen for "sendMessage" event from a client
  socket.on("sendMessage", (message) => {
    console.log("Message received:", message); // Log the received message

    io.emit("receiveMessage", message); // Broadcast the message to all connected clients
  });

  // Listen for disconnection event
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id); // Log when a user disconnects
  });
});

// Start the server on port 5000
server.listen(5000, () => {
  console.log("Server running on port 5000");
});
