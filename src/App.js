import { Box, Heading } from "@chakra-ui/react";
import { createContext } from "react";
import "./App.css";
import Home from "./Component/Home";
import MapContext from "./Component/MapContext";
import Wallpaper from "./Component/Wallpaper";

export const currentUserContext = createContext();

export const Ambohiboss = () => (
  <Heading fontStyle={"italic"} fontWeight={"black"}>
    Ambohiboss
  </Heading>
);

function App() {
  return (
    <Box margin={"auto"} position={"relative"}>
      <MapContext>
        <Wallpaper />
        <Home />
      </MapContext>
    </Box>
  );
}

export default App;
