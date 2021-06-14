import React, { useEffect, useState, useGlobal } from "reactn";
import { useRouter } from "next/router";
import Head from "next/head";
import Loading from "../components/Loading/Loading";
import Meme from "../components/Meme/Meme";
import Message from "../components/Message/Message";
import Button from "../components/Forms/Button";
import DarkModeButton from "../components/DarkModeButton";
import useSocket from "../hooks/useSocket";
const roomId = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useGlobal("username");
  const [data, setData] = useState();
  const [subreddit, setSubreddit] = useState("");
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
              onClick={() => router.push("/")}
              text="Go back"
            />
            <form onSubmit={reqMeme} className="flex flex-row">
              <input
                className="dark:bg-gray-800 rounded-sm w-48 h-8 text-sm px-2 outline-none ring-1 dark:ring-gray-600 dark:focus:ring-gray-400 ring-gray-200 focus:ring-gray-600"
                placeholder="Enter subreddit"
                onChange={(e) => setSubreddit(e.target.value)}
                value={subreddit || ""}
              />
              <Button
                cN=" mx-1"
                onClick={reqMeme}
                type="submit"
                text={data == null ? "Set subreddit" : "Request Meme"}
              />
            </form>
            <DarkModeButton />
          </nav>
          <div className="flex items-center justify-center mx-2">
            <Meme data={data} />
            <Message socket={socket} />
          </div>
        </>
      )}
    </>
  );
};

// export async function getServerSideProps() {
//   const data = {
//     author: "Adora__18",
//     img: "https://i.redd.it/af0px6pdav471.jpg",
//     postLink: "https://redd.it/nyjt8q",
//     subreddit: "asda",
//     title: "Do you like this kind of selfie",
//     ups: 36,
//   };
//   return { props: { data } };
// }
export default roomId;
