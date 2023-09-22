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
import { mapContext } from "./Home";
import { useWindowSize } from "@uidotdev/usehooks";

export default function Location() {
  const google = window.google;
  const { selected, setSelected, markerClusterRef, setAddInterface } = useContext(mapContext);
  const map = useGoogleMap();
  const [keyword, setKeyword] = useState("");
  const nameRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const openingDate = useRef();
  const markerRef = useRef();
  const positionRef = useRef();
  const submitBtn = useRef();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { onOpen: autocompleteOpen, isOpen: autocompleteOpened, onClose: autocompleteClose } = useDisclosure();
  const toast = useToast();
  const { height } = useWindowSize();

  const { data, isSuccess: autocompleteSuccess } = useQuery({
    queryKey: [keyword],
    queryFn: async () => {
      const { data } = await apiCall.get("job/autocomplete?query=" + keyword);
      return data;
    },
    enabled: keyword.length > 2,
    staleTime: 300000, //5min
    refetchOnWindowFocus: false,
  });

  const handleRegister = async () => {
    apiCall.post("job", {
      name: nameRef.current.value,
      category: categoryRef.current.value,
      description: descriptionRef.current.value,
      opening: openingDate.current.value,
      lat: positionRef.current.lat(),
      lng: positionRef.current.lng(),
    });
  };
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: handleRegister,
  });

  const handleClear = () => {
    setSelected(false);
    markerRef.current.setMap(null);
    markerRef.current = undefined;
  };

  useEffect(() => {
    if (markerClusterRef.current) markerClusterRef.current.clearMarkers();
    if (!toast.isActive("tips"))
      toast({ id: "tips", status: "info", description: "Cliquer sur l'endroit précis que vous voulez marquer" });
  }, []);

  useEffect(() => {
    if (data?.length > 0) autocompleteOpen();
  }, [autocompleteSuccess]);

  useEffect(() => {
    if (!map) return;
    map.addListener("click", (event) => {
      if (map.getZoom() < 17) return map.setZoom(17);
      setSelected(true);
      positionRef.current = event.latLng;

      map.panTo(event.latLng);

      if (!markerRef.current)
        markerRef.current = new google.maps.Marker({
          map,
        });
      markerRef.current.setPosition(event.latLng);
    });
  }, [map]);

  useEffect(() => {
    if (isSuccess) {
      onClose();
      setAddInterface(false);
      setSelected(false);
    }
  }, [isSuccess]);

  if (selected)
    return (
      <>
        <HStack bgColor={"white"} position={"absolute"} bottom={10} width={"100%"} justify={"center"} padding={2}>
          <Button width={"50%"} variant={"solid"} maxWidth={"250px"} onClick={handleClear}>
            Effacer
          </Button>
          <Button width={"50%"} maxW={"250px"} onClick={onOpen} colorScheme="blue">
            Choisir
          </Button>
        </HStack>
        <Drawer isOpen={isOpen} onClose={onClose} onOpen={onOpen} placement="right" size="full">
          <DrawerOverlay />
          <DrawerContent height={height}>
            <DrawerHeader>Ajouter votre emplacement</DrawerHeader>
            <DrawerBody>
              <form onSubmit={mutate}>
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
                        value={keyword}
                        isRequired
                        ref={categoryRef}
                        onBlur={autocompleteClose}
                        placeholder="gargotte, poissonerie, cyber, ..."
                        onChange={({ target }) => setKeyword(target.value)}
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
                                  setKeyword(word);
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
          </DrawerContent>
        </Drawer>
      </>
    );
}
