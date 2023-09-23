import {
  Box,
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Square,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { useGoogleMap } from "@ubilabs/google-maps-react-hooks";
import { addOutline, contractOutline, earthOutline, expandOutline, menu } from "ionicons/icons";
import React, { useContext, useState } from "react";
import Geolocalisation from "./Geolocalisation";
import MapStyle from "./MapStyle";
import Search from "./Search";
import { mapContext } from "./MapContext";
import { useClickAway } from "@uidotdev/usehooks";

export default function MenuBtn() {
  const map = useGoogleMap();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [satelliteView, setSatelliteView] = useState(false);
  const [closeOnBlur, setCloseOnBlur] = useState(true);
  const { setAddInterface } = useContext(mapContext);
  const focusRef = useClickAway(() => {
    if (closeOnBlur) onClose();
  });

  const handleMapType = () => {
    if (satelliteView) {
      map.setMapTypeId("roadmap");
      setSatelliteView(false);
    } else {
      map.setMapTypeId("satellite");
      setSatelliteView(true);
    }
  };

  return (
    <Popover placement="bottom-end" isLazy closeOnBlur={closeOnBlur} isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button position={"absolute"} top={2} right={2} onClick={onToggle} bgColor={"blackAlpha.500"} color={"white"}>
          <IonIcon icon={menu} />
        </Button>
      </PopoverTrigger>
      <PopoverContent ref={focusRef} width={"fit-content"} maxW={"calc(100vw - 16px)"}>
        <PopoverArrow />
        <PopoverBody>
          <HStack wrap={"wrap"} justify={"center"}>
            <Square
              size={20}
              onClick={() => {
                setAddInterface(true);
                onClose();
              }}
            >
              <Box>
                <Square size={"40px"} margin={"auto"}>
                  <IonIcon icon={addOutline} style={{ fontSize: "32px" }} />
                </Square>
                <Text fontSize={"xs"} textAlign={"center"}>
                  Ajouter
                </Text>
              </Box>
            </Square>
            <Search setCloseOnBlur={setCloseOnBlur} display={"menu"} />
            <MapStyle />
            <Geolocalisation />
            <Square size={20} onClick={handleMapType} bgColor={satelliteView && "blue.500"}>
              <Box>
                <Square size={"40px"} margin={"auto"}>
                  <IonIcon icon={earthOutline} style={{ fontSize: "32px" }} />
                </Square>
                <Text fontSize={"xs"} textAlign={"center"}>
                  Satellite
                </Text>
              </Box>
            </Square>
            <Square size={20} onClick={() => map.setZoom(map.getZoom() + 1)}>
              <Box>
                <Square size={"40px"} margin={"auto"}>
                  <IonIcon icon={expandOutline} style={{ fontSize: "32px" }} />
                </Square>
                <Text fontSize={"xs"} textAlign={"center"}>
                  Zoom plus
                </Text>
              </Box>
            </Square>
            <Square size={20} onClick={() => map.setZoom(map.getZoom() - 1)}>
              <Box>
                <Square size={"40px"} margin={"auto"}>
                  <IonIcon icon={contractOutline} style={{ fontSize: "32px" }} />
                </Square>
                <Text fontSize={"xs"} textAlign={"center"}>
                  Zoom moins
                </Text>
              </Box>
            </Square>
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
