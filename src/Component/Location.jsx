import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  HStack,
  Input,
  List,
  ListItem,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useGoogleMap } from "@ubilabs/google-maps-react-hooks";
import React, { useContext, useEffect, useRef, useState } from "react";
import { apiCall } from "..";
import { usePrevious, useWindowSize } from "@uidotdev/usehooks";
import { mapContext } from "./MapContext";

export default function Location() {
  const google = window.google;
  const { selected, setSelected, activeMarkerRef, markerClusterRef, setAddInterface, setKeyword, infoWindowRef } =
    useContext(mapContext);
  const map = useGoogleMap();
  const [queryKeyword, setQueryKeyword] = useState("");
  const nameRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const openingDate = useRef();
  const positionRef = useRef();
  const submitBtn = useRef();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { onOpen: autocompleteOpen, isOpen: autocompleteOpened, onClose: autocompleteClose } = useDisclosure();
  const toast = useToast();
  const { height } = useWindowSize();
  const previousHeight = usePrevious(height);

  const { data, isSuccess: autocompleteSuccess } = useQuery({
    queryKey: [queryKeyword, "autocomplete"],
    queryFn: async () => {
      const { data } = await apiCall.get("job/autocomplete?query=" + queryKeyword);
      return data;
    },
    enabled: queryKeyword.length > 2,
    staleTime: 300000, //5min
    refetchOnWindowFocus: false,
  });

  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: () =>
      apiCall.post("job", {
        name: nameRef.current.value,
        category: categoryRef.current.value,
        description: descriptionRef.current.value,
        opening: openingDate.current.value,
        lat: positionRef.current.lat(),
        lng: positionRef.current.lng(),
      }),
  });

  const handleClear = () => {
    setSelected(false);
    activeMarkerRef.current.setMap(null);
    activeMarkerRef.current = undefined;
  };

  useEffect(() => {
    if (markerClusterRef.current) markerClusterRef.current.clearMarkers();
    if (!toast.isActive("tips"))
      toast({
        id: "tips",
        status: "info",
        position: "top",
        description: "Cliquer sur l'endroit précis que vous voulez marquer",
      });
  }, []);

  useEffect(() => {
    if (data?.length > 0) autocompleteOpen();
  }, [autocompleteSuccess]);

  useEffect(() => {
    if (!map) return;
    const listener = map.addListener("click", (event) => {
      if (map.getZoom() < 17) return map.setZoom(17);
      setSelected(true);
      positionRef.current = event.latLng;
      map.panTo(event.latLng);

      if (!activeMarkerRef.current)
        activeMarkerRef.current = new google.maps.Marker({
          map,
        });
      activeMarkerRef.current.setPosition(event.latLng);
    });
    return () => listener.remove();
  }, [map]);

  // M U T A T I O N
  useEffect(() => {
    if (isSuccess) {
      onClose();
      setAddInterface(false);
      infoWindowRef.current.setContent(`
      <div class='infowindow'>
      <p class='infowindow-name'>${nameRef.current.value}</p>
      <p class='infowindow-category'>${categoryRef.current.value}</p>
      <p class='infowindow-description'>${descriptionRef.current.value}</p>
      </div>
        `);
      infoWindowRef.current.open({ map, anchor: activeMarkerRef.current });
      setSelected(false);
      if (!toast.isActive("submitSuccess"))
        toast({
          id: "submitSuccess",
          status: "success",
          title: "Enregistrement réussi",
        });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      onClose();
      if (!toast.isActive("submitError"))
        toast({
          id: "submitError",
          status: "error",
          title: "Enregistrement échoué",
          description: error.message,
        });
    }
  }, [isError]);

  return (
    <>
      <Button
        pos={"absolute"}
        top={2}
        left={2}
        onClick={() => {
          activeMarkerRef.current && activeMarkerRef.current.setMap(null);
          setAddInterface(false);
          setKeyword("");
        }}
      >
        Retour
      </Button>
      {selected && (
        <HStack bgColor={"white"} position={"absolute"} bottom={5} width={"100%"} justify={"center"} padding={2}>
          <Button width={"50%"} variant={"solid"} maxWidth={"250px"} onClick={handleClear}>
            Effacer
          </Button>
          <Button width={"50%"} maxW={"250px"} onClick={onOpen} colorScheme="blue">
            Choisir
          </Button>
        </HStack>
      )}
      <Drawer isOpen={isOpen} onClose={onClose} onOpen={onOpen} placement="right" size="full">
        <DrawerOverlay />
        <DrawerContent height={height}>
          <DrawerHeader>Ajouter votre emplacement</DrawerHeader>
          <DrawerBody>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                mutate();
              }}
            >
              <Stack>
                <FormLabel>Le nom de votre activité :</FormLabel>
                <Input type="text" isRequired ref={nameRef} placeholder="Gargotte Matsiro, Poissonerie Bevata, ..." />
                <Textarea placeholder="Description" ref={descriptionRef} />
                <FormLabel>Catégorie :</FormLabel>
                <Popover
                  onOpen={autocompleteOpen}
                  isOpen={autocompleteOpened}
                  onClose={autocompleteClose}
                  initialFocusRef={categoryRef}
                  placement="bottom-start"
                >
                  <PopoverTrigger>
                    <Input
                      type="text"
                      value={queryKeyword}
                      isRequired
                      ref={categoryRef}
                      onBlur={autocompleteClose}
                      placeholder="gargotte, poissonerie, cyber, ..."
                      onChange={({ target }) => setQueryKeyword(target.value)}
                    />
                  </PopoverTrigger>
                  {data && data.length > 0 && (
                    <PopoverContent width={"100%"}>
                      <PopoverBody>
                        <List>
                          {data.map((word, key) => (
                            <ListItem
                              key={key}
                              onClick={() => {
                                setQueryKeyword(word);
                                autocompleteClose();
                              }}
                            >
                              {word}
                            </ListItem>
                          ))}
                        </List>
                      </PopoverBody>
                    </PopoverContent>
                  )}
                </Popover>
                <FormLabel>Année d'ouverture :</FormLabel>
                <Input type="number" ref={openingDate} placeholder="2000" />
              </Stack>
              <Input display={"none"} type="submit" ref={submitBtn} />
            </form>
          </DrawerBody>
          {(previousHeight === null || previousHeight < height) && (
            <DrawerFooter width={"100%"}>
              <Button width={"50%"} variant={"solid"} maxWidth={"250px"} onClick={onClose}>
                Annuler
              </Button>
              <Button
                marginLeft={2}
                width={"50%"}
                colorScheme={"blue"}
                maxW={"250px"}
                onClick={() => submitBtn.current.click()}
                isLoading={isLoading}
              >
                Enregistrer
              </Button>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
