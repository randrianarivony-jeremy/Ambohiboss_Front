import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  Input,
  InputGroup,
  InputRightElement,
  Square,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { useWindowSize } from "@uidotdev/usehooks";
import { searchOutline } from "ionicons/icons";
import React, { useContext, useEffect } from "react";
import { mapContext } from "./MapContext";
import JobSearch from "./JobSearch";
import PlaceSearch from "./PlaceSearch";

function Search({ setCloseOnBlur, display }) {
  const { setSelected, inputRef, searchDefaultTab, keyword } = useContext(mapContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { height } = useWindowSize();

  useEffect(() => {
    if (!isOpen && display === "menu") setCloseOnBlur(true);
  }, [isOpen]);
  return (
    <>
      {display === "menu" ? (
        <Square
          size={20}
          onClick={() => {
            searchDefaultTab.current = "place";
            setCloseOnBlur(false);
            setSelected(false);
            onOpen();
          }}
        >
          <Box>
            <Square size={"40px"} margin={"auto"}>
              <IonIcon icon={searchOutline} style={{ fontSize: "32px" }} />
            </Square>
            <Text fontSize={"xs"} textAlign={"center"}>
              Recherche
            </Text>
          </Box>
        </Square>
      ) : (
        <InputGroup position={"absolute"} bottom={0} size={"lg"}>
          <Input
            type="text"
            variant={"filled"}
            value={keyword}
            onFocus={() => {
              searchDefaultTab.current = "job";
              onOpen();
            }}
            onChange={() => {
              searchDefaultTab.current = "job";
              onOpen();
            }}
            placeholder="Activité, profession, job, ..."
          />
          <InputRightElement>
            <IonIcon icon={searchOutline} style={{ fontSize: "24px" }} />
          </InputRightElement>
        </InputGroup>
      )}
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={inputRef}
        onOpen={onOpen}
        placement="bottom"
        size="full"
      >
        <DrawerContent height={height}>
          <DrawerCloseButton />
          <DrawerBody paddingX={0}>
            <Tabs isFitted isLazy={true} defaultIndex={searchDefaultTab.current === "job" ? 0 : 1}>
              <TabList>
                <Tab>Activité</Tab>
                <Tab>Lieu</Tab>
              </TabList>
              <TabPanels height={"100%"}>
                <TabPanel>
                  <JobSearch onClose={onClose} />
                </TabPanel>
                <TabPanel height={"100%"} paddingX={2}>
                  <PlaceSearch onClose={onClose} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Search;
