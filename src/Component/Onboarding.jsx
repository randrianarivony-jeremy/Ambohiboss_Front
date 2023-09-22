import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import SwiperOnboarding from "./SwiperOnboarding";

export default function Onboarding() {
  const seen = useRef(localStorage.getItem("ambxhibxss_xnbxarding"));
  const initialFocusRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (seen.current === null) onOpen();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      initialFocusRef={initialFocusRef}
      size={"xl"}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent marginBottom={0} roundedTop={"xl"} roundedBottom={0}>
        <ModalBody paddingX={3} paddingTop={4}>
          <SwiperOnboarding />
        </ModalBody>
        <ModalFooter paddingTop={0} paddingX={3}>
          <Button
            variant={"ghost"}
            onClick={() => {
              onClose();
              localStorage.setItem("ambxhibxss_xnbxarding", false);
            }}
          >
            Ne plus afficher
          </Button>
          <Button marginLeft={2} onClick={onClose} ref={initialFocusRef}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
