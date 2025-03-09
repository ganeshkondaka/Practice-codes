const express = require("express"); // Import Express
const http = require("http"); // Import HTTP module
const { Server } = require("socket.io"); // Import Socket.io
const cors = require("cors"); // Import CORS for cross-origin requests

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
    cors: {
        origin: "*", // Adjust according to your frontend's running portr origin is on any port
      }
    });
    

app.use(cors()); // Enable CORS for Express

// Store the last known video state (time, status)
let videoState = {
  playing: false,
  time: 0,
};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Send the latest video state to the new client
  socket.emit("videoState", videoState);

  // Listen for play event
  socket.on("playVideo", (currentTime) => {
    videoState = { playing: true, time: currentTime }; // Update state
    io.emit("playVideo", currentTime); // Broadcast to all clients
  });

  // Listen for pause event
  socket.on("pauseVideo", (currentTime) => {
    videoState = { playing: false, time: currentTime };
    io.emit("pauseVideo", currentTime); // Broadcast pause event
  });

  // Listen for video seek (jump) event
  socket.on("seekVideo", (newTime) => {
    videoState.time = newTime;
    io.emit("seekVideo", newTime); // Broadcast seek event
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});















// const express = require("express"); // Import Express framework
// const http = require("http"); // Import HTTP module to create server
// const { Server } = require("socket.io"); // Import `Server` class from Socket.io
// const cors = require("cors"); // Import CORS to allow cross-origin requests

// const app = express(); // Create an Express application
// const server = http.createServer(app); // Create an HTTP server using Express

// // Initialize Socket.io server and enable CORS for frontend communication
// const io = new Server(server, {
//     cors: {
//         origin: "*", // Adjust according to your frontend's running portr origin is on any port
//       }
//     });
    

// app.use(cors()); // Enable CORS for all Express routes

// // Listen for new client connections
// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id); // Log when a user connects

//   // Listen for "sendMessage" event from a client
//   socket.on("sendMessage", (message) => {
//     console.log("Message received:", message); // Log the received message

//     io.emit("receiveMessage", message); // Broadcast the message to all connected clients
//   });

//   socket.on("play_media",(play)=>{
//     console.log(play);
//     io.emit("play_media",play);
//   })

//   // Listen for disconnection event
//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id); // Log when a user disconnects
//   });
// });

// // Start the server on port 5000
// server.listen(5000, () => {
//   console.log("Server running on port 5000");
// });
