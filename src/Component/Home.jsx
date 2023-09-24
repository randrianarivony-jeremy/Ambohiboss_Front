import { Button } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";
import { useWindowSize } from "@uidotdev/usehooks";
import { add } from "ionicons/icons";
import React, { useCallback, useContext, useState } from "react";
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
  const [mapContainer, setMapContainer] = useState(null);
  const { height } = useWindowSize();
  const { addInterface, setAddInterface, setKeyword } = useContext(mapContext);

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

  return (
    <GoogleMapsProvider
      googleMapsAPIKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      mapContainer={mapContainer}
      mapOptions={mapOptions}
      libraries={["places"]}
      // onLoadMap={handleDefaultDisplay}
    >
      <div ref={mapRef} id="container" style={{ height: height + "px" }} />
      <ClusterDisplayer />
      {!addInterface && <About />}
      {!addInterface && (
        <Button
          pos={"absolute"}
          top={2}
          paddingX={0}
          right={16}
          boxSize={12}
          bgColor={"#4D9DFF"}
          color={"white"}
          rounded={"full"}
          onClick={() => setAddInterface(true)}
        >
          <IonIcon icon={add} style={{ fontSize: "24px" }} />
        </Button>
      )}
      <Menu />
      {addInterface ? <Location /> : <Search display={"home"} />}
      <Onboarding />
    </GoogleMapsProvider>
  );
}
