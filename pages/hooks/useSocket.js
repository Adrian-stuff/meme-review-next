import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let s = io("https://doge-meme-server.herokuapp.com/");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  return socket;
};
export default useSocket;
