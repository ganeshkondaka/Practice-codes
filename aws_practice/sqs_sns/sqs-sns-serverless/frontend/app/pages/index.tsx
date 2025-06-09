'use client';

import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    alert('Message sent to queue!');
  };

  return (
    <div className="p-10">
      <textarea
        className="border p-2"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <br />
      <button className="bg-blue-600 text-white p-2 mt-2" onClick={sendMessage}>
        Send to Queue
      </button>
    </div>
  );
}
