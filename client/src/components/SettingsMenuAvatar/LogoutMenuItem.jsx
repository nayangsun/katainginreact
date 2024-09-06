import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { MenuItem, ListItemIcon } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { removeStoredUser } from "../AuthProvider/userStorage";
import { logout } from "../../lib/auth";
import { QUERY_KEY } from "../../lib/constants";

function LogoutButton() {
  const queryClient = useQueryClient();
  function handleLogout() {
    logout().then(() => {
      queryClient.invalidateQueries(QUERY_KEY.user);
      removeStoredUser();
    });
  }

  return (
    <MenuItem onClick={handleLogout}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      Logout
    </MenuItem>
  );
}

export default LogoutButton;
