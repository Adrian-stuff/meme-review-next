import { setGlobal } from "reactn";

const isServer = typeof window === "undefined";

const globalState = () => {
  setGlobal({
    username: !isServer
      ? localStorage.getItem("username") || undefined
      : undefined,
    messages: [],
    rooms: [],
  });
};
export default globalState;
