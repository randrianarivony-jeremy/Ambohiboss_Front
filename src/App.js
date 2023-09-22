import { Box } from "@chakra-ui/react";
import { createContext, useEffect } from "react";
import "./App.css";
import Home from "./Component/Home";
import { useWindowScroll } from "@uidotdev/usehooks";

export const currentUserContext = createContext();

function App() {
  const [, scrollTo] = useWindowScroll();
  useEffect(() => {
    scrollTo(0, 2000);
  }, []);
  return (
    <Box margin={"auto"} position={"relative"} height={"100%"}>
      <Home />
    </Box>
  );
}

export default App;
