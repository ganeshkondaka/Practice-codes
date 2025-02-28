import { chatSession } from './aimodel.js';
const { useState, useEffect } = React;

// Add Babel transform for JSX
const script = document.createElement('script');
script.type = 'text/babel';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatSession.sendMessage(input);

      const botMessage = { text: response.data.reply || 'No response', sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { text: 'Error fetching response', sender: 'bot' };
      setMessages((prev) => [...prev, errorMessage]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        Gemini Chatbot
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-wrapper ${msg.sender === 'user' ? 'user' : ''}`}
          >
            <div className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="loading">Typing...</div>
        )}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="message-input"
        />
        <button
          onClick={sendMessage}
          className="send-button"
        >
          Send
        </button>
      </div>
    </div>
  );
};

// Use createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Chatbot />);