import React from "react";
import { Box, Grid, Typography } from "@mui/material";

function About() {
  return (
    <Box
      sx={{
        py: { xs: 2, md: 3 },
        px: { xs: 1, md: 3 },
      }}
    >
      <Grid container spacing={2} direction="column">
        <Grid item sx={{ textAlign: "center" }}></Grid>
        <Grid item>
          <Typography variant="h5" gutterBottom>
            About
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default About;
