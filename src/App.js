import { Box, Heading, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@chakra-ui/react";
import { createContext, useEffect } from "react";
import "./App.css";
import Home from "./Component/Home";
import MapContext from "./Component/MapContext";
import Wallpaper from "./Component/Wallpaper";
import { useNetworkState } from "@uidotdev/usehooks";

export const currentUserContext = createContext();

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { online } = useNetworkState();

  useEffect(() => {
    if (online) onClose();
    else onOpen();
  }, [online]);

  return (
    <Box margin={"auto"} position={"relative"}>
      <MapContext>
        <Wallpaper />
        <Home />
      </MapContext>
      <Modal isOpen={isOpen} onClose={onClose} onOpen={onOpen} isCentered className="modi">
        <ModalContent>
          <ModalHeader>Connectez-vous à un réseau</ModalHeader>
          <ModalBody display={"flex"} flexDirection="column" alignItems={"center"} justifyContent={"center"}>
            Pour utiliser Ambohiboss, activez les données mobiles ou connectez-vous au Wifi.
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export const Ambohiboss = () => (
  <Heading fontStyle={"italic"} fontWeight={"black"}>
    Ambohiboss
  </Heading>
);
export default App;
