import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { ConfirmProvider } from "material-ui-confirm";
import CssBaseline from "@mui/material/CssBaseline";
import Navigation from "../Navigation/Navigation";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <StyledEngineProvider injectFirst>
          <SnackbarProvider
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <ConfirmProvider>
              <CssBaseline />
              <Navigation />
            </ConfirmProvider>
          </SnackbarProvider>
        </StyledEngineProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
