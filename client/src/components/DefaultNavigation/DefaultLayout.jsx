import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import UserMenuAvatar from "../UserMenuAvatar/UserMenuAvatar";

function DefaultLayout({ currentUser, loaded, children }) {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar>
        <Grid container spacing={2} alignItems="center">
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
          {loaded &&
            (currentUser ? (
              <Grid item>
                <UserMenuAvatar user={currentUser} />
              </Grid>
            ) : (
              <Grid item>
                <Button
                  variant="outlined"
                  size="small"
                  color="inherit"
                  component={RouterLink}
                  to="/login"
                >
                  Login
                </Button>
              </Grid>
            ))}
        </Grid>
      </Toolbar>
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Box>
  );
}

export default DefaultLayout;
