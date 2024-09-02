import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsMenuAvatar from "../SettingsMenuAvatar/SettingsMenuAvatar";

function DefaultLayout({ currentUser, loaded, children }) {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(100deg, rgba(135,206,235,0.1), rgba(75,0,130,0.1), rgba(255,192,203,0.1))",
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(255,255,255,1) 75%, rgba(255,255,255,0))",
      }}
    >
      <Toolbar>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <IconButton size="small">
              <SearchIcon />
            </IconButton>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }} />
          <Grid item>
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Typography variant="h6" sx={{ ml: 1 }}>
                Kataing In React
              </Typography>
            </Box>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }} />

          <Grid item>
            <SettingsMenuAvatar user={currentUser} loaded={loaded} />
          </Grid>
        </Grid>
      </Toolbar>
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Box>
  );
}

export default DefaultLayout;
