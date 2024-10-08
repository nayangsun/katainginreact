import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link, Box, Typography, Container } from "@mui/material";
import { useSnackbar } from "notistack";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { login } from "../../lib/auth";
import { QUERY_KEY } from "../../lib/constants";
import { formatSentence } from "../../lib/utils";

function Login() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  function handleSubmit({ email, password }) {
    setLoading(true);

    login({ email, password }).then(({ status, data }) => {
      setLoading(false);

      if (status === "ok") {
        queryClient.invalidateQueries(QUERY_KEY.user);
        navigate("/");
      } else {
        enqueueSnackbar(formatSentence(data.errors.message), {
          variant: "error",
        });
      }
    });
  }

  return (
    <Container
      component="main"
      sx={{
        mx: "auto",
        maxWidth: "1920px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          mx: "auto",
          width: "100%",
          maxWidth: "384px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography component="h1" variant="h6" sx={{ fontWeight: "bold" }}>
            Log in to account
          </Typography>

          <Typography variant="body2">
            {"Don't have an account? "}
            <Link
              component={RouterLink}
              to="/users/register"
              variant="body2"
              sx={{ fontWeight: "bold", textDecoration: "none" }}
            >
              {"Sign up"}
            </Link>
            {" for an account now."}
          </Typography>
        </Box>

        <LoginForm onSubmit={handleSubmit} loading={loading} />
      </Box>
    </Container>
  );
}

export default Login;
