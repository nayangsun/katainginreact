import React from "react";
import { MenuItem, ListItemIcon } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { removeStoredUser } from "../AuthProvider/userStorage";
import { logout } from "../../lib/auth";

function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    logout().then(() => {
      removeStoredUser();
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
