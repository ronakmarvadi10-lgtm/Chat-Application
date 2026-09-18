import "./MessageInput.css";

import { useState } from "react";

function MessageInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    onSend(message);

    setMessage("");
  };

  return (
    <div className="message-input-container">

      <form
        className="message-input-form"
        onSubmit={handleSubmit}
      >

        <button
          type="button"
          className="attach-btn"
          onClick={() =>
            alert("File attachment will be added later.")
          }
        >
          +
        </button>

        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
        />

        <button
          type="submit"
          className="send-btn"
        >
          ➤
        </button>

      </form>

    </div>
  );
}

export default MessageInput;