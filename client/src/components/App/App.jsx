import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { ConfirmProvider } from 'material-ui-confirm';
import CssBaseline from '@mui/material/CssBaseline';
import Navigation from './Navigation';
import client from './apolloClient'; // Remove this line if you don't need Apollo anymore

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider>
            <SnackbarProvider
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <ConfirmProvider>
                <CssBaseline />
                <Navigation />
              </ConfirmProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;