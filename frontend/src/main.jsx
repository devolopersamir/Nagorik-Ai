import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../style.css';

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [mode, setMode] = useState("normal");

  const sendMessage = async () => {
    if (!message) return;
    const newChat = [...chat, { sender: 'user', text: message }];
    setChat(newChat);
    setMessage("");

    const res = await fetch('https://nagorik-backend.onrender.com/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, mode })
    });

    const data = await res.json();
    setChat([...newChat, { sender: 'bot', text: data.reply }]);
  };

  return (
    <div className="container">
      <h2>নাগরিক.Ai</h2>
      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="normal">সাধারণ আলাপ</option>
        <option value="study">পড়াশোনার সাথী</option>
        <option value="routine">রুটিন তৈরি</option>
        <option value="fun">মজার আলাপ</option>
      </select>
      <div className="chat-box">
        {chat.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            <b>{msg.sender === 'user' ? 'তুমি' : 'নাগরিক.Ai'}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="তোমার প্রশ্ন লিখো..."
      />
      <button onClick={sendMessage}>পাঠাও</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
