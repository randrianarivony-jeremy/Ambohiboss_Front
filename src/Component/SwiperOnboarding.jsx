import { Heading, List, ListItem, OrderedList, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SwiperOnboarding() {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      autoplay={{ delay: 2000 }}
      pagination={true}
      style={{ paddingBottom: "30px" }}
      autoHeight={true}
    >
      <SwiperSlide>
        <Stack spacing={5}>
          <Heading size={"lg"} textAlign={"center"}>
            Bienvenue
          </Heading>
          <Heading size={"sm"} textAlign={"center"}>
            Trouver le meilleur emplacement pour votre future activité
          </Heading>
        </Stack>
      </SwiperSlide>
      <SwiperSlide>
        <Stack spacing={5}>
          <Heading size={"lg"} textAlign={"center"}>
            Facile
          </Heading>
          <OrderedList paddingLeft={5} fontSize={"sm"}>
            <ListItem>Trouver l'emplacement de votre activité sur la carte.</ListItem>
            <ListItem>Cliquer sur l'endroit exact.</ListItem>
            <ListItem>Choisir.</ListItem>
            <ListItem>Remplissez vos informations.</ListItem>
            <ListItem>Enregistrer.</ListItem>
          </OrderedList>
        </Stack>
      </SwiperSlide>
      <SwiperSlide>
        <Stack spacing={5}>
          <Heading size={"lg"} textAlign={"center"}>
            Equipé
          </Heading>
          <Text>Des outils sont disponibles dans le Menu en haut à droite pour faciliter votre navigation.</Text>
          <List paddingLeft={3} fontSize={"sm"}>
            <ListItem>
              <strong>Recherche</strong> : pour trouver l'emplacement d'un <i>lieu</i> ou d'une <i>activité</i> en
              particulier.
            </ListItem>
            <ListItem>
              <strong>Détails</strong> : pour afficher une carte plus détaillée.
            </ListItem>
            <ListItem>
              <strong>Localisation</strong> : pour localiser votre emplacement actuel.
            </ListItem>
            <ListItem>
              <strong>Satellite</strong> : pour activer la visualisation par satellite.
            </ListItem>
            <ListItem>
              <strong>Zoom</strong> : pour zoomer manuellement la carte.
            </ListItem>
          </List>
        </Stack>
      </SwiperSlide>
    </Swiper>
  );
}
