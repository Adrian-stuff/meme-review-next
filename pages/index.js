import React, { useEffect, useState, useGlobal } from "reactn";
import Modal from "react-modal";
import Head from "next/head";
import Link from "next/link";
import router from "next/router";
import Input from "./components/Forms/Input";
import Button from "./components/Forms/Button";
import Alert from "./components/Forms/Alert";
import DarkModeButton from "./components/DarkModeButton";
import useSocket from "./hooks/useSocket";

export default function Home() {
  const [username, setUsername] = useGlobal("username");
  const [rooms, setRooms] = useGlobal("rooms");
  const [roomId, setRoomId] = useState("");
  const [isUserAlert, setIsUserAlert] = useState(false);
  const [isRoomAlert, setIsRoomAlert] = useState(false);

  const [isDialogUserAlert, setIsDialogUserAlert] = useState(false);
  const [isDialogAlert, setIsDialogAlert] = useState(username == undefined);

  const socket = useSocket();

  const enterUsername = (e) => {
    e.preventDefault();
    let user = username.replace(/\s/g, "");
    if (username === undefined || user === "")
      return setIsDialogUserAlert(true);
    localStorage.setItem("username", user);
    setIsDialogAlert(false);
  };
  const joinRoom = (e) => {
    e.preventDefault();
    let user = username.replace(/\s/g, "");
    let room = roomId.replace(/\s/g, "");

    if (username === undefined || user === "") return setIsUserAlert(true);
    if (roomId === undefined || room === "") return setIsRoomAlert(true);
    localStorage.setItem("username", user);
    router.push(`/room/${room}`);
  };
  useEffect(() => {
    if (socket == null) return;
    setInterval(() => socket.emit("getAllRooms"), 2000);
    return () => {
      clearInterval();
    };
  }, [socket]);
  useEffect(() => {
    if (socket == null) return;
    socket.on("getAllRooms", (room) => {
      setRooms(room);
    });
  }, [socket, setRooms]);
  return (
    <>
      <Head>
        <title>DogeReview</title>
      </Head>
      <Modal
        isOpen={isDialogAlert}
        overlayClassName="flex fixed items-center top-0 left-0 right-0 bottom-0 dark:bg-black dark:bg-opacity-75 bg-gray-100 bg-opacity-75"
        className="items-center dark:bg-gray-900 bg-gray-100 mx-auto rounded-lg outline-none p-5 border-2 dark:border-gray-800"
      >
        <h1 className="dark:text-gray-400  text-left font-semibold text-2xl">
          Enter Username:
        </h1>

        <form onSubmit={enterUsername}>
          <Input
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
            cN="w-80"
            aCN="my-2"
            placeholder="Username"
            required={true}
          />
          <Alert isShowed={isDialogUserAlert} message="Username required!" />
          <Button
            type="submit"
            onClick={enterUsername}
            text="Enter"
            disabled={!username ? true : false}
          />
        </form>
      </Modal>

      <div className="flex-col flex justify-center items-center my-2">
        <div className="flex flex-col w-80 sm:w-96 justify-center text-center ring-1 dark:ring-gray-600 rounded-lg p-4 my-2 ">
          <div className="flex flex-col font-bold">
            <DarkModeButton cN="absolute" />
            <h1 className="text-4xl py-2">Join Room</h1>
            <hr className="bg-gray-600" />
            <h1 className="text-4xl py-2">Create Room</h1>
          </div>
          <form onSubmit={joinRoom} className="flex flex-col px-2">
            <Input
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
              cN="max-w-80"
              aCN="my-2"
              placeholder="Username"
              required={true}
            />
            <Alert isShowed={isUserAlert} message="Username required!" />
            <Input
              value={roomId || ""}
              onChange={(e) => setRoomId(e.target.value)}
              cN="max-w-80"
              aCN="my-2"
              placeholder="Room ID"
              required={true}
            />
            <Alert isShowed={isRoomAlert} message="Room ID required!" />

            <Button
              type="submit"
              onClick={joinRoom}
              cN="font-bold text-lg"
              text="Enter"
              disabled={!roomId || !username ? true : false}
            />
          </form>
        </div>

        <div className="w-80 sm:w-96 container ring-1 dark:ring-gray-600 rounded-lg p-2 my-2">
          <h1 className="text-4xl pt-2 font-extrabold  pl-2">Rooms</h1>
          <div className="font-bold text-xl m-2">
            {rooms[0] != null ? (
              rooms.map((i, idx) => {
                return (
                  <Link href={`/room/${i}`} key={idx}>
                    <a className="px-2">{i}</a>
                  </Link>
                );
              })
            ) : (
              <h1 className="text-center dark:text-gray-400">
                Create a room to start reviewing memes with your friends!
              </h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
