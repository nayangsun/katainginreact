import { Box, Grid, Typography, IconButton } from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
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
