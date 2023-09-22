import { Box, Radio, RadioGroup, Square, Text } from "@chakra-ui/react";
import { useGoogleMap } from "@ubilabs/google-maps-react-hooks";
import React, { useState } from "react";
import { minifiedStyle } from "./Home";
import { IonIcon } from "@ionic/react";
import { informationCircleOutline, informationOutline } from "ionicons/icons";

export default function MapStyle() {
  const map = useGoogleMap();
  const [detailed, setDetailed] = useState(false);

  const handleDetail = () => {
    if (detailed) {
      setDetailed(false);
      map.setOptions({ styles: minifiedStyle });
    } else {
      setDetailed(true);
      map.setOptions({
        styles: [
          {
            featureType: "road",
            elementType: "labels",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
        ],
      });
    }
  };

  return (
    <Square size={20} onClick={handleDetail} bgColor={detailed && "blue.500"}>
      <Box>
        <Square size={"40px"} margin={"auto"}>
          <IonIcon icon={informationCircleOutline} style={{ fontSize: "32px" }} />
        </Square>
        <Text fontSize={"xs"} textAlign={"center"}>
          Détails
        </Text>
      </Box>
    </Square>
  );
}
