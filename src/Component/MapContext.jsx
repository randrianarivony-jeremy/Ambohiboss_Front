import React, { createContext, useRef, useState } from "react";

export const mapContext = createContext();

export default function MapContext({ children }) {
  const [selected, setSelected] = useState(false);
  const [dataAvailable, setDataAvailable] = useState(false);
  const searchDefaultTab = useRef("place");
  const markerClusterRef = useRef();
  const clusterDisplay = useRef();
  const [addInterface, setAddInterface] = useState(false);
  const [keyword, setKeyword] = useState("gargotte");
  const infoWindowRef = useRef();
  return (
    <mapContext.Provider
      value={{
        selected,
        setSelected,
        addInterface,
        setAddInterface,
        searchDefaultTab,
        keyword,
        setKeyword,
        dataAvailable,
        setDataAvailable,
        markerClusterRef,
        clusterDisplay,
        infoWindowRef,
      }}
    >
      {children}
    </mapContext.Provider>
  );
}
