import { Box } from "@chakra-ui/react";
import { createContext } from "react";
import "./App.css";
import Home from "./Component/Home";
import { useWindowScroll } from "@uidotdev/usehooks";

export const currentUserContext = createContext();

function App() {
  const [, scrollTo] = useWindowScroll();
  scrollTo(0, 2000);
  return (
    <Box margin={"auto"} position={"relative"}>
      <Home />
    </Box>
  );
}

export default App;
