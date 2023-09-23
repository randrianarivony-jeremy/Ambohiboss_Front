import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Skeleton,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Ambohiboss } from "../App";
import logo from "../Assets/RANAVALONA.png";
import { mapContext } from "./MapContext";

export default function Wallpaper() {
  const [imgLoading, setImgLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { dataAvailable } = useContext(mapContext);

  useLayoutEffect(() => {
    onOpen();
  }, []);

  useEffect(() => {
    if (dataAvailable) onClose();
  }, [dataAvailable]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} onOpen={onOpen} size="full" motionPreset="scale">
      <ModalContent>
        <ModalBody
          display={"flex"}
          flexDirection="column"
          alignItems={"center"}
          justifyContent={"center"}
          marginTop={20}
        >
          <Ambohiboss />
          <Text fontFamily={"italianno"} fontSize={"3xl"}>
            choose the best place
          </Text>
          <Spinner thickness={"2px"} speed="0.8s" emptyColor="gray.200" color="blue.500" />
        </ModalBody>
        <ModalFooter justifyContent={"center"} flexDirection={"column"} position={"relative"}>
          {/* <AspectRatio ratio={3 / 2} width={16}> */}
          <Image src={logo} height={10} onLoad={() => setImgLoading(false)} onError={() => setImgLoading(false)} />
          {/* <ReactSVG src={logo} style={{ height: "40px", width: "56" }} /> */}
          {/* </AspectRatio> */}
          {imgLoading && <Skeleton top={4} rounded={"sm"} width={14} height={10} position="absolute" zIndex={1} />}
          <Text fontSize={"sm"}>
            par <strong>Ranavalona Inc.</strong>
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
