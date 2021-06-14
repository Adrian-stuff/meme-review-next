import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let s = io("http://localhost:8000/");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  return socket;
};
export default useSocket;
