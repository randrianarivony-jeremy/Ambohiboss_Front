import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const { ToastContainer } = createStandaloneToast();
const queryClient =
  process.env.NODE_ENV === "production"
    ? new QueryClient()
    : new QueryClient({
        defaultOptions: {
          queries: {
            networkMode: "always",
          },
        },
      });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <App />
        <ToastContainer />
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>
);

export const apiCall = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api/",
  withCredentials: true,
});
