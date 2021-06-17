import React, { useState, useGlobal } from "reactn";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import ChatMessages from "./ChatMessages";
const Message = ({ socket, cN, buttonCN }) => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useGlobal("username");
  const sendMessage = (e) => {
    e.preventDefault();
    let filteredMessage = message.replace(/\s/g, "");
    if (message === undefined || filteredMessage === "") return;
    socket.emit("message", {
      username: username,
      message: message,
    });
    setMessage("");
  };
  return (
    <form
      onSubmit={sendMessage}
      className={`${cN} flex-col dark:ring-gray-600 ring-gray-400 ring-1 rounded-lg`}
    >
      <ChatMessages />
      <Input
        value={message || ""}
        cN="w-full"
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
      >
        <Button aCN={buttonCN} onClick={sendMessage} text="Send" />
      </Input>
    </form>
  );
};

export default Message;
