import React, { useState, useEffect } from "react"; // Import React, useState, and useEffect hooks
import { io } from "socket.io-client"; // Import `io` from Socket.io-client to connect with the server

// Connect to the backend Socket.io server
const socket = io("http://localhost:5000");

function App() {
  const [message, setMessage] = useState(""); // State to store the input message
  const [messages, setMessages] = useState([]); // State to store received messages

  // useEffect runs once when the component mounts
  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on("receiveMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]); // Append the message to the state
    });

    // Cleanup function to remove the listener when the component unmounts
    return () => socket.off("receiveMessage");
  }, []);

  // Function to send a message
  const sendMessage = () => {
    if (message.trim()) { // Check if the message is not empty
      socket.emit("sendMessage", message); // Send the message to the server
      setMessage(""); // Clear input field after sending
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Real-time Chat</h2>

      {/* Display all received messages */}
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p> // Render each message
        ))}
      </div>

      {/* Input field to type a message */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)} // Update state when user types
        placeholder="Type a message..."
      />

      {/* Button to send message */}
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
