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
    <div>
      <h4>Messages</h4>
      {list.length > 0
        ? list.map((message) => (
            <div key={message.message_id}>
              <h6>{message.text}</h6>
            </div>
          ))
        : ""}
      <br />
      <h4>Type Message Below</h4>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Messages;
