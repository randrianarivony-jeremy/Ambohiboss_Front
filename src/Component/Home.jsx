import {
  Button,
  Heading,
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
import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";
import { useWindowSize } from "@uidotdev/usehooks";
import React, { createContext, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import logo from "../Assets/logo.svg";
import About from "./About";
import ClusterDisplayer from "./ClusterDisplayer";
import Location from "./Location";
import Menu from "./Menu";
import Onboarding from "./Onboarding";
import Search from "./Search";
import { Ambohiboss } from "../App";

export const mapContext = createContext();
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
  const [mapContainer, setMapContainer] = useState(null);
  const [selected, setSelected] = useState(false);
  const [dataAvailable, setDataAvailable] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const searchDefaultTab = useRef("place");
  const markerClusterRef = useRef();
  const clusterDisplay = useRef();
  const [addInterface, setAddInterface] = useState(false);
  const [keyword, setKeyword] = useState("gargotte");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { height } = useWindowSize();

  const mapRef = useCallback((node) => {
    node && setMapContainer(node);
  }, []);

  useLayoutEffect(() => {
    onOpen();
  }, []);

  useEffect(() => {
    if (dataAvailable) onClose();
  }, [dataAvailable]);

  return (
    <>
      {/* O N L O A D I N G  */}
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
            <Image src={logo} height={10} onLoad={() => setImgLoading(false)} onError={() => setImgLoading(false)} />
            {imgLoading && <Skeleton top={4} rounded={"sm"} width={14} height={10} position="absolute" zIndex={1} />}
            <Text fontSize={"sm"}>
              par <strong>Ranavalona Inc.</strong>
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <GoogleMapsProvider
        googleMapsAPIKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        mapContainer={mapContainer}
        mapOptions={mapOptions}
        libraries={["places"]}
      >
        <div ref={mapRef} id="container" style={{ height: height + "px" }} />
        <mapContext.Provider
          value={{
            selected,
            setSelected,
            setAddInterface,
            mapRef,
            searchDefaultTab,
            keyword,
            setKeyword,
            dataAvailable,
            setDataAvailable,
            markerClusterRef,
            clusterDisplay,
          }}
        >
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
        </mapContext.Provider>
      </GoogleMapsProvider>
    </>
  );
}
