import React, { useEffect, useRef, useGlobal } from "reactn";

const ChatMessages = () => {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useGlobal("messages");
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });
  useEffect(() => {
    return () => {
      setMessages("");
    };
  }, []);

  return (
    <div
      style={{ height: "512px" }}
      className="flex flex-col overflow-y-auto p-2 break-all"
    >
      {messages &&
        messages.map((i, idx) => {
          return (
            <div className="flex " key={idx}>
              <p className="dark:text-gray-400">
                <span className="dark:text-blue-300 text-purple-500">
                  {i.username}:{" "}
                </span>{" "}
                {i.message}
              </p>
            </div>
          );
        })}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatMessages;
