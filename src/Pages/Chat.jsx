import "./Chat.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import ChatHeader from "../Components/ChatHeader";
import Message from "../Components/Message";
import MessageInput from "../Components/MessageInput";

function Chat() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("chatUser")
    );

    if (!user) {
      navigate("/login");
      return;
    }

    setCurrentUser(user);
  }, [navigate]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);

    if (!currentUser) {
      return;
    }

    const conversationId = [
      currentUser.id,
      user.id,
    ]
      .sort()
      .join("_");

    const allChats =
      JSON.parse(
        localStorage.getItem("chatMessages")
      ) || {};

    const conversation =
      allChats[conversationId] || [];

    setMessages(conversation);
  };

  const handleSendMessage = (text) => {
    if (
      !text.trim() ||
      !selectedUser ||
      !currentUser
    ) {
      return;
    }

    const conversationId = [
      currentUser.id,
      selectedUser.id,
    ]
      .sort()
      .join("_");

    const newMessage = {
      id: Date.now(),
      senderId: currentUser.id,
      receiverId: selectedUser.id,
      text: text.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const allChats =
      JSON.parse(
        localStorage.getItem("chatMessages")
      ) || {};

    const oldMessages =
      allChats[conversationId] || [];

    const updatedMessages = [
      ...oldMessages,
      newMessage,
    ];

    setMessages(updatedMessages);

    allChats[conversationId] =
      updatedMessages;

    localStorage.setItem(
      "chatMessages",
      JSON.stringify(allChats)
    );
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="chat-page">
      <Navbar />

      <div className="chat-layout">
        <Sidebar
          currentUser={currentUser}
          onSelectUser={handleSelectUser}
          selectedUser={selectedUser}
        />

        <div className="chat-main">
          {selectedUser ? (
            <>
              <ChatHeader user={selectedUser} />

              <div className="messages-area">
                {messages.length === 0 ? (
                  <div className="empty-chat">
                    <div className="empty-chat-icon">
                      👋
                    </div>

                    <h2>
                      Start a conversation
                    </h2>

                    <p>
                      Send your first message to{" "}
                      {selectedUser.name}.
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <Message
                      key={message.id}
                      message={message}
                      currentUser={currentUser}
                    />
                  ))
                )}
              </div>

              <MessageInput
                onSend={handleSendMessage}
              />
            </>
          ) : (
            <div className="empty-chat">
              <div className="empty-chat-icon">
                💬
              </div>

              <h2>
                Welcome to ChatApp
              </h2>

              <p>
                Select a conversation from the
                sidebar to start chatting.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;