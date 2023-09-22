import { Box } from "@chakra-ui/react";
import { createContext } from "react";
import "./App.css";
import Home from "./Component/Home";

export const currentUserContext = createContext();

function App() {
  return (
    <Box margin={"auto"} position={"relative"}>
      <Home />
    </Box>
  );
}

export default App;
