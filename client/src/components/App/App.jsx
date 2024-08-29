import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { ConfirmProvider } from "material-ui-confirm";
import { queryClient } from "./reactQuery";
import AuthProvider from "../AuthProvider/AuthProvider";
import CssBaseline from "@mui/material/CssBaseline";
import Navigation from "../Navigation/Navigation";

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <StyledEngineProvider injectFirst>
          <AuthProvider>
            <SnackbarProvider
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <ConfirmProvider>
                <CssBaseline />
                <Navigation />
              </ConfirmProvider>
            </SnackbarProvider>
          </AuthProvider>
        </StyledEngineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
