import React, { useEffect, useState, useGlobal } from "reactn";
import { useRouter } from "next/router";
import Head from "next/head";
import SlidingPane from "react-sliding-pane";
import Loading from "../components/Loading/Loading";
import Meme from "../components/Meme/Meme";
import Message from "../components/Message/Message";
import Button from "../components/Forms/Button";
import DarkModeButton from "../components/DarkModeButton";
import useSocket from "../hooks/useSocket";
import "react-sliding-pane/dist/react-sliding-pane.css";
const roomId = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useGlobal("username");
  const [data, setData] = useState();
  const [subreddit, setSubreddit] = useState("");
  const [isMessageDrawerOpen, setisMessageDrawerOpen] = useState(false);
  const [messages, setMessages] = useGlobal("messages");
  const socket = useSocket();
  let tempArr = [];
  useEffect(() => {
    if (username === undefined || "") return router.push("/");
  }, []);
  useEffect(() => {
    if (socket == null) return;
    socket.on("connect", () => {
      setLoading(false);
      socket.emit("joinRoom", { room: roomId, username: username }, (err) => {
        if (!err.success) {
          console.log(err.message);
        }
      });
    });
  }, [socket, roomId, username]);
  useEffect(() => {
    if (socket == null) return;
    socket.on("message", (msg) => {
      tempArr.push(msg);
      setMessages(tempArr);
    });
    socket.on("userJoined", (data) => {
      tempArr.push(data);
      setMessages(tempArr);
    });
    socket.on("reqMeme", (data) => {
      try {
        setSubreddit(data !== undefined ? data.subreddit : "");
        setData(data);
      } catch (error) {
        setSubreddit(null);
        setData(null);
      }
    });
    return () => {
      socket.off("userJoined");
    };
  }, [socket, setMessages]);
  function reqMeme(e) {
    e.preventDefault();
    socket.emit("reqMeme", subreddit);
  }
  return (
    <>
      <Head>
        <title>{roomId && `${roomId} |`} DogeReview</title>
      </Head>
      {loading ? (
        <Loading text="Connecting..." />
      ) : (
        <>
          <nav className="flex justify-around my-2 items-center">
            <Button
              cN="font-bold"
              aCN="hidden md:flex"
              onClick={() => router.push("/")}
              text="Go back"
            />
            <form onSubmit={reqMeme} className="flex flex-row">
              <input
                className="dark:bg-gray-800 rounded-sm sm:w-48 w-36 h-8 text-sm px-2 outline-none ring-1 dark:ring-gray-600 dark:focus:ring-gray-400 ring-gray-200 focus:ring-gray-600"
                placeholder="Enter subreddit"
                onChange={(e) => setSubreddit(e.target.value)}
                value={subreddit || ""}
              />
              <Button
                cN="mx-1"
                onClick={reqMeme}
                type="submit"
                text={data == null ? "Set Subreddit" : "Request Meme"}
              />
            </form>
            <DarkModeButton cN="hidden sm:block" />
          </nav>
          <div className="flex items-center justify-center mx-2">
            <Meme data={data} />
            <Message cN="hidden md:flex w-64" buttonCN="mr-2" socket={socket} />
          </div>
          <div className="flex flex-col justify-center my-2">
            <Button
              text="Chat"
              cN="font-bold"
              aCN="md:hidden"
              onClick={() => setisMessageDrawerOpen(true)}
            />
          </div>
          <SlidingPane
            isOpen={isMessageDrawerOpen}
            className="dark:bg-gray-800"
            hideHeader={true}
            from="bottom"
            width="100%"
            onRequestClose={() => setisMessageDrawerOpen(false)}
          >
            <div className="flex justify-end">
              <DarkModeButton cN="absolute mt-2 mr-2" />
            </div>

            <Message cN="mb-4 flex w-full" buttonCN="mr-2" socket={socket} />
          </SlidingPane>
        </>
      )}
    </>
  );
};

export default roomId;
