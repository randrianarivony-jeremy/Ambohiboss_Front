import { Box, Heading } from "@chakra-ui/react";
import { createContext } from "react";
import "./App.css";
import Home from "./Component/Home";

export const currentUserContext = createContext();

export const Ambohiboss = () => (
  <Heading fontStyle={"italic"} fontWeight={"black"}>
    Ambohiboss
  </Heading>
);

function App() {
  return (
    <Box margin={"auto"} position={"relative"}>
      <Home />
    </Box>
  );
}

export default App;
