import "../styles/globals.css";
import globalState from "../globalState";
import { ThemeProvider } from "next-themes";

globalState();
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
