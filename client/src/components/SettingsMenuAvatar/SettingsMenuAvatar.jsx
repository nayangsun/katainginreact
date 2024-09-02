import React, { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import LogoutMenuItem from "./LogoutMenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

function SettingsMenuAvatar({ user, loaded }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorEl = useRef();

  return (
    <>
      <IconButton ref={anchorEl} onClick={() => setMenuOpen(true)} size="small">
        <SettingsIcon />
      </IconButton>
      <Menu
        open={menuOpen}
        onClick={() => setMenuOpen(false)}
        onClose={() => setMenuOpen(false)}
        anchorEl={anchorEl.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ minWidth: 200 }}
      >
        {loaded &&
          (user ? (
            <MenuItem component={RouterLink} to="/about">
              <ListItemIcon>
                <Avatar
                  alt={user.id}
                  src={"#"}
                  sx={{ width: 24, height: 24 }}
                />
              </ListItemIcon>
              About
            </MenuItem>
          ) : null)}

        <MenuItem component={RouterLink} to="/">
          <ListItemIcon>
            <AssignmentIndIcon />
          </ListItemIcon>
          Menu 2
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <LogoutMenuItem />
      </Menu>
    </>
  );
}

export default SettingsMenuAvatar;
