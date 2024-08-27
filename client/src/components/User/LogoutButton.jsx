import React from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "../../lib/auth";
import { QUERY_KEY } from "../../lib/query_key";

export default function LogoutButton() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function handleLogout() {
    logout().then(() => {
      queryClient.invalidateQueries(QUERY_KEY.user);
      navigate("/login");
    });
  }

  return <button onClick={handleLogout}>log out</button>;
}
