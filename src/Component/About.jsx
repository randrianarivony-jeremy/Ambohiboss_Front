import {
  AspectRatio,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Image,
  ListItem,
  Skeleton,
  Stack,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { useWindowSize } from "@uidotdev/usehooks";
import React, { useState } from "react";
import { Ambohiboss } from "../App";
import sample from "../Assets/Sample.png";
import logo from "../Assets/logo.svg";

export default function About() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { height } = useWindowSize();
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <>
      <Box position={"absolute"} top={2} left={2} onClick={onOpen}>
        <Ambohiboss />
      </Box>
      <Drawer isOpen={isOpen} onClose={onClose} onOpen={onOpen} placement="right" size="full">
        <DrawerContent height={height}>
          <DrawerCloseButton />
          <DrawerHeader paddingX={3}>
            <Ambohiboss />
          </DrawerHeader>
          <DrawerBody paddingX={3}>
            <Stack spacing={5}>
              <AspectRatio ratio={3 / 2} width="80vw" maxW={420} position="relative" margin={"auto"}>
                {/* do not delete this fragment*/}
                <>
                  <Image
                    src={sample}
                    alt="representation"
                    width={"100%"}
                    objectFit={"contain"}
                    onLoad={() => setImgLoading(false)}
                    onError={() => setImgLoading(false)}
                  />
                  {imgLoading && <Skeleton width="100%" height={"100%"} position="absolute" zIndex={1} />}
                </>
              </AspectRatio>

              <Image src={logo} height={10} />
              <Text>
                <strong>Ambohiboss</strong> est un outil conçu pour visualiser les emplacements géographiques des
                activités économiques.
              </Text>
              <Text>
                Ses utilisateurs peuvent ajouter les emplacements de leurs activités,les modifier ou supprimer.
              </Text>
              <Text>Vous pourrez ainsi trouver plus facilement :</Text>
              <UnorderedList paddingLeft={5}>
                <ListItem>
                  dans quel endroit n'existe-t-il pas encore le genre d'activité que vous voulez lancer.
                </ListItem>
                <ListItem>dans quel endroit votre genre activité marche le plus.</ListItem>
                <ListItem>où se trouve les concurrents.</ListItem>
              </UnorderedList>
              <Text>
                Ceci afin de vous aider à lancer des activités plus prospères parce qu'un bon emplacement est très
                favorable au dévéloppement d'une activité économique.
              </Text>
            </Stack>
          </DrawerBody>
          <DrawerFooter paddingY={0} justifyContent={"space-between"} paddingX={3}>
            <strong>Ranavalona Inc.</strong>
            <span>2023</span>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
