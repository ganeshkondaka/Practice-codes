'use client';
import { useState } from 'react';

export default function HomePage() {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    const res = await fetch('/api/send', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    alert(data.status);
  };

  return (
    <main className="p-10">
      <textarea
        className="border p-2 w-full"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message to send via SQS..."
      />
      <br />
      <button className="bg-blue-600 text-white px-4 py-2 mt-2" onClick={sendMessage}>
        Send to Queue
      </button>
    </main>
  );
}
