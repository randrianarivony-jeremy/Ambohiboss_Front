import { Box, Input, InputGroup, InputRightElement, List, ListItem, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import React, { useContext } from "react";
import { apiCall } from "..";
import { mapContext } from "./Home";

export default function JobSearch({ onClose }) {
  const { inputRef, keyword, setKeyword, clusterDisplay } = useContext(mapContext);
useLockBodyScroll();

  const handleQuery = async () => {
    const { data } = await apiCall.get("job/search?query=" + keyword);
    return data;
  };

  const { isSuccess, isFetching, data, isError, error } = useQuery({
    queryKey: [keyword],
    queryFn: handleQuery,
    enabled: keyword.length > 2,
    staleTime: 300000, //5min
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <InputGroup>
        <Input
          type="text"
          ref={inputRef}
          autoFocus
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Activité, profession, job, ..."
        />
        {isFetching && (
          <InputRightElement>
            <Spinner />
          </InputRightElement>
        )}
      </InputGroup>

      {isSuccess ? (
        data.length === 0 ? (
          <Box marginTop={3}>Aucun résultat trouvé</Box>
        ) : (
          data.length > 0 && (
            <List spacing={4} bgColor={"gray.200"} padding={3} borderBottomRadius={10}>
              {data.map((jobs, key) => (
                <ListItem
                  key={key}
                  onClick={() => {
                    clusterDisplay.current(jobs);
                    setKeyword(jobs[0].name);
                    onClose();
                  }}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <span>{jobs[0].name}</span>
                  <span>{jobs.length} résultats</span>
                </ListItem>
              ))}
            </List>
          )
        )
      ) : (
        isError && <Box marginTop={3}>{error.message}</Box>
      )}
    </>
  );
}
