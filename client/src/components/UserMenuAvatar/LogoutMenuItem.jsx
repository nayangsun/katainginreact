import React from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { MenuItem, ListItemIcon } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { logout } from "../../lib/auth";
import { QUERY_KEY } from "../../lib/query_key";

function LogoutButton() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  function handleLogout() {
    logout().then(() => {
      queryClient.invalidateQueries(QUERY_KEY.user);
      navigate("/login");
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
