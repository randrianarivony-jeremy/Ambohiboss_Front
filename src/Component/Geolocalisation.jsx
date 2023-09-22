import { Box, Spinner, Square, Text, Toast, useToast } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { useGoogleMap } from "@ubilabs/google-maps-react-hooks";
import { locateOutline } from "ionicons/icons";
import React, { useRef, useState } from "react";

export default function Geolocalisation() {
  const google = window.google;
  const [geolocationSupported] = useState(navigator.geolocation);
  const map = useGoogleMap();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleLocationClick = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setLoading(false);
          map.setCenter({ lat: coords.latitude, lng: coords.longitude });
          const marker = new google.maps.Marker({
            map,
            position: { lat: coords.latitude, lng: coords.longitude },
          });
          map.setZoom(15);
          new google.maps.InfoWindow({ content: "Marge: " + coords.accuracy.toFixed(0) / 1000 + "km" }).open({
            map,
            anchor: marker,
          });
        },
        (error) => {
          if (error.code === 1 || error.message === "User denied Geolocation")
            toast({
              status: "error",
              title: "Permission refusée",
              description: "La fonctionnalité de géolocalisation a besoin de la permission de l'utilisateur",
              isClosable: true,
              duration: 5000,
            });
          setLoading(false);
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 300000 }
      );
    }
  };
  return (
    <Square
      size={20}
      onClick={() =>
        geolocationSupported
          ? handleLocationClick()
          : toast({
              status: "error",
              title: "Non supporté",
              description: "La fonctionnalité de géolocalisation n'est pas supporté par votre navigateur",
              duration: 5000,
              isClosable: true,
            })
      }
      opacity={!geolocationSupported && 0.5}
    >
      <Box>
        <Square size={"40px"} margin={"auto"}>
          {loading ? <Spinner /> : <IonIcon icon={locateOutline} style={{ fontSize: "32px" }} />}
        </Square>
        <Text fontSize={"xs"} textAlign={"center"}>
          Localisation
        </Text>
      </Box>
    </Square>
  );
}
