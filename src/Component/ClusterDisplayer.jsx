import { useToast } from "@chakra-ui/react";
import { MarkerClusterer, SuperClusterAlgorithm } from "@googlemaps/markerclusterer";
import { useQuery } from "@tanstack/react-query";
import { useGoogleMap } from "@ubilabs/google-maps-react-hooks";
import { useContext, useEffect, useRef } from "react";
import { apiCall } from "..";
import { mapContext } from "./Home";
import { useNetworkState } from "@uidotdev/usehooks";

export default function ClusterDisplayer() {
  const google = window.google;
  const map = useGoogleMap();
  const state = useNetworkState();
  const toast = useToast();
  const initial = useRef(true);
  const { markerClusterRef, clusterDisplay, keyword, setDataAvailable } = useContext(mapContext);
  console.log(state);

  const { isSuccess, data, isError, error } = useQuery({
    queryKey: [keyword],
    queryFn: async () => {
      const { data } = await apiCall.get("job/search?query=" + keyword);
      return data;
    },
    enabled: keyword.length > 2,
    staleTime: 300000, //5min
    refetchOnWindowFocus: false,
  });

  clusterDisplay.current = (list) => {
    const infoWindow = new google.maps.InfoWindow();

    const markers = list.map(({ name, lat, lng }) => {
      const marker = new google.maps.Marker({ position: { lat, lng } });

      marker.addListener("click", () => {
        infoWindow.setPosition({ lat, lng });
        infoWindow.setContent(`
          <div class="info-window">
            <h2>${name}</h2>
          </div>
        `);
        infoWindow.open({ map });
      });

      return marker;
    });
    if (markerClusterRef.current) markerClusterRef.current.clearMarkers();
    markerClusterRef.current = new MarkerClusterer({
      markers,
      map,
      algorithm: new SuperClusterAlgorithm({ radius: 200 }),
    });
    map.setZoom(12);
  };

  useEffect(() => {
    if (map && isSuccess && initial.current) {
      if (data.length > 0) clusterDisplay.current(data[0]);
      if (data.length === 0 && !toast.isActive("emptyToast"))
        toast({
          id: "emptyToast",
          status: "info",
          title: "Aucun résultat",
          description: "Aucun résultat trouvé pour " + keyword,
          isClosable: true,
        });
      setDataAvailable(true);
      initial.current = false;
    }
    if (map && isError && !toast.isActive("errorToast"))
      toast({ id: "errorToast", status: "error", title: "Erreur", description: error.message, isClosable: true });
  }, [isSuccess, map]);
}
