import { Box, Input, InputGroup, InputRightElement, List, ListItem, Spinner } from "@chakra-ui/react";
import { useAutocompleteService, useGoogleMap, usePlacesService } from "@ubilabs/google-maps-react-hooks";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import React, { useRef, useState } from "react";

export default function PlaceSearch({ onClose }) {
  const google = window.google;
  const inputRef = useRef(null);
  const [emptyResult, setEmptyResult] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [preductionResultStatus, setPredictionResultStatus] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsAreVisible, setSuggestionsAreVisible] = useState(false);

  const map = useGoogleMap();
  const autocompleteService = useAutocompleteService();
  const placesService = usePlacesService();
  useLockBodyScroll();

  const handleSearch = (query) => {
    setFetching(true);
    autocompleteService?.getPlacePredictions(
      {
        input: query,
        types: [
          "administrative_area_level_1",
          "administrative_area_level_2",
          "administrative_area_level_3",
          "locality",
          "neighborhood",
        ],
        componentRestrictions: { country: "mg" },
      },
      (predictions, status) => {
        setFetching(false);
        if (status === "OK") {
          setSuggestionsAreVisible(true);
          setEmptyResult(false);
          setPredictionResultStatus();
          const autocompleteSuggestions = predictions.map((prediction) => ({
            id: prediction.place_id,
            label: prediction.description,
          }));

          // Update suggestions for dropdown suggestions list
          setSuggestions(autocompleteSuggestions);
        } else {
          setSuggestionsAreVisible(false);
          if (status === "ZERO_RESULTS") return setEmptyResult(true);
          setPredictionResultStatus(status);
        }
      }
    );
  };

  const selectSuggestion = (suggestion) => {
    console.log("first");
    placesService?.getDetails(
      { placeId: suggestion.id, fields: ["geometry.location", "types"] },
      (placeResult, status) => {
        if (status !== "OK") {
          return;
        }
        onClose();
        new google.maps.Marker({
          map,
          position: placeResult.geometry.location,
        });
        if (
          placeResult.types.includes("administrative_area_level_1") ||
          placeResult.types.includes("administrative_area_level_2")
        )
          map.setZoom(8);
        else map.setZoom(15);
        map.panTo(placeResult.geometry.location);
      }
    );

    inputRef.current.value = suggestion.label;
    setSuggestionsAreVisible(false);
  };

  return (
    <>
      <InputGroup>
        <Input
          autoFocus
          type="text"
          ref={inputRef}
          onChange={(e) => (e.target.value.length > 1 ? handleSearch(e.target.value) : null)}
          //   onChange={(e) => setInputValue(e.target.value)}
          placeholder="Lieu, ville, quartier, ..."
        />
        {fetching && (
          <InputRightElement>
            <Spinner />
          </InputRightElement>
        )}
      </InputGroup>

      {suggestionsAreVisible && (
        <List spacing={4} bgColor={"gray.200"} padding={3} borderBottomRadius={10}>
          {suggestions.map((suggestion) => (
            <ListItem key={suggestion.id} onClick={() => selectSuggestion(suggestion)} id={suggestion.id} role="option">
              {/* <IonIcon icon={location} /> */}
              <span>{suggestion.label}</span>
            </ListItem>
          ))}
        </List>
      )}

      {emptyResult && <Box marginTop={3}>Aucun résultat trouvé</Box>}
      {preductionResultStatus && <Box marginTop={3}>{preductionResultStatus}</Box>}
    </>
  );
}
