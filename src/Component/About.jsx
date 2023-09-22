import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Heading,
  Image,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import sample from "../Assets/Sample.png";
import { useWindowSize } from "@uidotdev/usehooks";

export default function About() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { height } = useWindowSize();
  return (
    <>
      <Heading size={"lg"} position={"absolute"} top={2} left={2} onClick={onOpen}>
        Ambohiboss
      </Heading>
      <Drawer isOpen={isOpen} onClose={onClose} onOpen={onOpen} placement="right" size="full" Z>
        <DrawerContent height={height}>
          <DrawerCloseButton />
          <DrawerHeader paddingX={3}>Ambohiboss</DrawerHeader>
          <DrawerBody paddingX={3}>
            <Stack spacing={5}>
              <Image src={sample} width={"80vw"} margin={"auto"} />
              <Text>
                <strong>Ambohiboss</strong> est un outil conçu pour visualiser les emplacements géographiques des
                activités économiques.
              </Text>
              <Text>
                Ses utilisateurs peuvent ajouter les emplacements de leurs activités,les modifier ou supprimer.
              </Text>
              <Text>Vous pourrez ainsi trouver plus facilement :</Text>
              <UnorderedList>
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
