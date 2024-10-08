import React from "react";
import { Box, Button, Grid, Typography, IconButton } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import { toolbarHeight } from "../../lib/constants";
import { isUnauthorizedError } from "../../lib/errors";

function Error({ error = null }) {
  const isUnauthorized = isUnauthorizedError(error);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: `calc(100vh - ${toolbarHeight})`,
        backgroundColor: "white",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
      }}
    >
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid item>
          <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item>
              <ErrorOutlineIcon sx={{ fontSize: 50, color: "#721c24" }} />
            </Grid>
            <Grid item>
              <Typography variant="h5" sx={{ color: "#721c24" }}>
                Error!
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="body1" sx={{ color: "#721c24" }}>
            {isUnauthorized
              ? "You are not authorized to view this page. Please log in."
              : "Something went wrong. Please try again."}
          </Typography>
        </Grid>
        <Grid item>
          {!isUnauthorized ? (
            <Button
              href="/"
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "lightcoral",
                borderRadius: "8px",
                padding: "8px",
                width: "128px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "lightcoral",
                  opacity: 0.8,
                },
              }}
            >
              Log In →
            </Button>
          ) : (
            <IconButton sx={{ color: "#721c24" }}>
              <RefreshIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Error;
