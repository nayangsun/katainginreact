import React, { useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import Grid3x3OutlinedIcon from "@mui/icons-material/Grid3x3Outlined";
import useInterests2Pane from "../Interests2PaneProvider/useInterests2Pane";
import SettingsMenuAvatar from "../SettingsMenuAvatar/SettingsMenuAvatar";

const titles = ["Kataing In React", "Saved", "Interests"];

function getIndexFromPath(path) {
  if (path === "/") return 0;
  if (path === "/saved") return 1;
  if (path.startsWith("/interests")) return 2;
  return 0;
}

function DefaultLayout({ currentUser, loaded, children }) {
  const location = useLocation();
  const initialPathIndex = getIndexFromPath(location.pathname);
  const [value, setValue] = React.useState(initialPathIndex);
  const { paneRole } = useInterests2Pane();
  const navigate = useNavigate();

  function handleInterestsClick() {
    const detail = paneRole.match(/^detail:(\d+)$/);
    if (detail) {
      const topicId = detail[1];
      navigate(`/interests/${topicId}`);
    } else {
      navigate("/interests");
    }
  }

  useEffect(() => {
    const index = getIndexFromPath(location.pathname);
    setValue(index);
  }, [location.pathname]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(100deg, rgba(135,206,235,0.1), rgba(75,0,130,0.1), rgba(255,192,203,0.1))",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(255,255,255,1) 75%, rgba(255,255,255,0))",
          zIndex: 0,
        }}
      />
      <Toolbar
        sx={{ zIndex: 2, position: "sticky", top: 0, background: "white" }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <IconButton size="small">
              <SearchIcon />
            </IconButton>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }} />
          <Grid item>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Typography variant="h6" sx={{ ml: 1 }}>
                {titles[value]}
              </Typography>
            </Box>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }} />
          <Grid item>
            <SettingsMenuAvatar user={currentUser} loaded={loaded} />
          </Grid>
        </Grid>
      </Toolbar>
      <Box
        sx={{
          flexGrow: 1,
          zIndex: 1,
          overflowY: "auto",
        }}
      >
        {children}
      </Box>
      <BottomNavigation
        value={value}
        sx={{ width: "100%", position: "sticky", bottom: 0, zIndex: 1 }}
      >
        <BottomNavigationAction
          label="For you"
          icon={<UpcomingIcon />}
          component={RouterLink}
          to="/"
        />
        <BottomNavigationAction
          label="Saved"
          icon={<BookmarksIcon />}
          component={RouterLink}
          to="/saved"
        />
        <BottomNavigationAction
          label="Interests"
          icon={<Grid3x3OutlinedIcon />}
          onClick={handleInterestsClick}
        />
      </BottomNavigation>
    </Box>
  );
}

export default DefaultLayout;
