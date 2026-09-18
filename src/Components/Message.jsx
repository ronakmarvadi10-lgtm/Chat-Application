import "./Message.css";

function Message({ message, currentUser }) {
  if (!message || !currentUser) {
    return null;
  }

  const isMe =
    message.senderId === currentUser.id;

  return (
    <div
      className={
        isMe
          ? "message-row message-row-me"
          : "message-row message-row-other"
      }
    >
      <div
        className={
          isMe
            ? "message-bubble message-bubble-me"
            : "message-bubble message-bubble-other"
        }
      >
        <p className="message-text">
          {message.text}
        </p>

        <span className="message-time">
          {message.time}

          {isMe && (
            <span className="message-status">
              ✓✓
            </span>
          )}
        </span>
      </div>
    </div>
  );
}

export default Message;