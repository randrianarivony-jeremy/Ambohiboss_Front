import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@chakra-ui/react";
import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";
import { useNetworkState, useWindowSize } from "@uidotdev/usehooks";
import React, { useCallback, useContext, useEffect, useState } from "react";
import About from "./About";
import ClusterDisplayer from "./ClusterDisplayer";
import Location from "./Location";
import { mapContext } from "./MapContext";
import Menu from "./Menu";
import Onboarding from "./Onboarding";
import Search from "./Search";

export const minifiedStyle = [
  {
    featureType: "poi.attraction",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.business",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.government",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.medical",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.place_of_worship",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.school",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.sports_complex",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

const mapOptions = {
  center: { lat: -18.915515990399303, lng: 47.52165967702609 },
  zoom: 12,
  disableDefaultUI: true,
  maxZoom: 20,
  restriction: {
    latLngBounds: {
      north: -11,
      south: -26,
      east: 51,
      west: 42,
    },
  },
  styles: minifiedStyle,
};

export default function Home() {
  const google = window.google;
  const [mapContainer, setMapContainer] = useState(null);
  const { height } = useWindowSize();
  const { addInterface, setAddInterface, setKeyword } = useContext(mapContext);
  const { online } = useNetworkState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const { isSuccess, data, isError, error } = useQuery({
  //   queryKey: [keyword],
  //   queryFn: async () => {
  //     const { data } = await apiCall.get("job/search?query=" + keyword);
  //     return data;
  //   },
  //   enabled: keyword.length > 2,
  //   staleTime: 300000, //5min
  //   refetchOnWindowFocus: false,
  // });

  const mapRef = useCallback((node) => {
    node && setMapContainer(node);
  }, []);

  // const handleDefaultDisplay = useCallback((map) => {
  //   const info = new google.maps.InfoWindow();
  // });

  useEffect(() => {
    if (online) onClose();
  }, [online]);

  return (
    <>
      <GoogleMapsProvider
        googleMapsAPIKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        mapContainer={mapContainer}
        mapOptions={mapOptions}
        libraries={["places"]}
        // onLoadMap={handleDefaultDisplay}
      >
        <div ref={mapRef} id="container" style={{ height: height + "px" }} />
        <ClusterDisplayer />
        {addInterface ? (
          <Button
            pos={"absolute"}
            top={2}
            left={2}
            onClick={() => {
              setAddInterface(false);
              setKeyword("");
            }}
          >
            Retour
          </Button>
        ) : (
          <About />
        )}
        <Menu />
        {addInterface ? <Location /> : <Search display={"home"} />}
        <Onboarding />
      </GoogleMapsProvider>

      {!online && (
        <Modal isOpen={isOpen} onClose={onClose} onOpen={onOpen} isCentered>
          <ModalContent>
            <ModalHeader>Connectez-vous à un réseau</ModalHeader>
            <ModalBody
              display={"flex"}
              flexDirection="column"
              alignItems={"center"}
              justifyContent={"center"}
              marginTop={20}
            >
              Pour utiliser Ambohiboss, activez les données mobiles ou connectez-vous au Wifi.
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
