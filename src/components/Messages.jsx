import { useState } from "react";

const Messages = ({ list, handleList }) => {
  const [text, setText] = useState("");
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (text === "") return alert("Type a Message!");
    handleList("message", { text });
    setText("");
  };
  return (
    <div className="tab-content">
      <p className="tab-title">Messages</p>
      {list.map((message) => (
        <div key={message.message_id} className="tab-item">
          <p className="tab-item-text">{message.text}</p>
          <p className="tab-item-label">
            {new Date(message.create_time).toLocaleString()}
          </p>
        </div>
      ))}
      <form className="message-form" onSubmit={handleSendMessage}>
        <input
          className="tab-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="tab-btn-submit" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Messages;
