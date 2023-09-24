import { useQuery } from "@tanstack/react-query";
import React from "react";
import { apiCall } from "../..";
import { Divider, Heading, List, ListItem, Text } from "@chakra-ui/react";

export default function Recent() {
  const { isSuccess, isFetching, data } = useQuery({
    queryKey: ["recent"],
    queryFn: async () => {
      const { data } = await apiCall.get("job/recents");
      return data;
    },
    staleTime: 300000, //5min
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Heading size={"sm"} marginTop={10}>
        Ajoutés récemment :
      </Heading>
      {isSuccess && (
        <List spacing={4} bgColor={"gray.200"} padding={3} borderBottomRadius={10}>
          {data.map((job) => (
            <>
              <ListItem key={job?._id}>
                <Text fontWeight={"bold"}>{job?.name}</Text>
                <Text fontStyle={"italic"}>{job?.category}</Text>
              </ListItem>
            </>
          ))}
        </List>
      )}
      {isFetching && <Text>Chargement ...</Text>}
    </>
  );
}
