import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import YouTube from "react-youtube";

// Connect to the backend Socket.io server
const socket = io("http://localhost:5000");

function App() {
  const [videoId] = useState("vsWxs1tuwDk?si=V2Obngjvct7xHFR2"); // YouTube Video ID (change this)
  const playerRef = useRef(null); // Ref to YouTube player

  useEffect(() => {
    // Sync existing state when a new client connects
    socket.on("videoState", (state) => {
      if (state.playing) {
        playerRef.current.seekTo(state.time);
        playerRef.current.playVideo();
      } else {
        playerRef.current.seekTo(state.time);
        playerRef.current.pauseVideo();
      }
    });

    // Play video event listener
    socket.on("playVideo", (time) => {
      playerRef.current.seekTo(time);
      playerRef.current.playVideo();
    });

    // Pause video event listener
    socket.on("pauseVideo", (time) => {
      playerRef.current.seekTo(time);
      playerRef.current.pauseVideo();
    });

    // Seek video event listener
    socket.on("seekVideo", (time) => {
      playerRef.current.seekTo(time);
    });

    return () => {
      socket.off("videoState");
      socket.off("playVideo");
      socket.off("pauseVideo");
      socket.off("seekVideo");
    };
  }, []);

  // Function to handle play
  const handlePlay = (event) => {
    const time = event.target.getCurrentTime();
    socket.emit("playVideo", time);
  };

  // Function to handle pause
  const handlePause = (event) => {
    const time = event.target.getCurrentTime();
    socket.emit("pauseVideo", time);
  };

  // Function to handle seek (jump in video)
  const handleSeek = (event) => {
    const time = event.target.getCurrentTime();
    socket.emit("seekVideo", time);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>🎥 Real-time YouTube Sync</h2>
      <YouTube
        videoId={videoId} // Set video ID
        opts={{ playerVars: { autoplay: 1 } }} // Auto-play enabled
        onReady={(event) => (playerRef.current = event.target)} // Store player reference
        onPlay={handlePlay} // Sync play
        onPause={handlePause} // Sync pause
        onStateChange={(event) => {
          if (event.data === 1) handlePlay(event); // Handle play
          if (event.data === 2) handlePause(event); // Handle pause
        }}
        onSeek={handleSeek} // Sync seek
      />
    </div>
  );
}

export default App;













// import React, { useState, useEffect } from "react"; // Import React, useState, and useEffect hooks
// import { io } from "socket.io-client"; // Import `io` from Socket.io-client to connect with the server

// // Connect to the backend Socket.io server
// const socket = io("http://localhost:5000");

// function App() {
//   const [message, setMessage] = useState(""); // State to store the input message
//   const [messages, setMessages] = useState([]); // State to store received messages
//   const [play, setplay] = useState(false); // State to store received messages

//   // useEffect runs once when the component mounts
//   useEffect(() => {
//     // Listen for incoming messages from the server
//     socket.on("receiveMessage", (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]); // Append the message to the state
//     });

//     // Cleanup function to remove the listener when the component unmounts
//     return () => socket.off("receiveMessage");
//   }, []);

//   // Function to send a message
//   const sendMessage = () => {
//     setplay(!play);
//     socket.emit("play_media", play);
    
//     // if (message.trim()) { // Check if the message is not empty
//     //   socket.emit("sendMessage", message); // Send the message to the server
//     //   setMessage(""); // Clear input field after sending
//     // }
//   };

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h2>Real-time Chat</h2>

//       {/* Display all received messages */}
//       <div>
//         {messages.map((msg, index) => (
//           <p key={index}>{msg}</p> // Render each message
//         ))}
//       </div>

//       {/* Input field to type a message */}
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)} // Update state when user types
//         placeholder="Type a message..."
//       />

//       {/* Button to send message */}
//       <iframe width="560" height="315" src="https://www.youtube.com/embed/IJkYipYNEtI?si=5uteKhZFiNg6fIsE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

//       <button onClick={sendMessage}>play</button>
//     </div>
//   );
// }

// export default App;
