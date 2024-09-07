import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Link as RouterLink } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import { register } from "../../lib/auth";
import { QUERY_KEY } from "../../lib/constants";
import { formatSentence } from "../../lib/utils";
import { errorToMessage } from "../../lib/errors";

function Register() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  function handleSubmit({ email, password }) {
    setLoading(true);

    register({ email, password }).then(({ status, data }) => {
      setLoading(false);

      if (status === "ok") {
        queryClient.invalidateQueries(QUERY_KEY.user);
        navigate("/");
      } else {
        const message = errorToMessage(data);
        enqueueSnackbar(formatSentence(message), { variant: "error" });
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
            Register for an account
          </Typography>

          <Typography variant="body2">
            {"Already registered? "}
            <Link
              component={RouterLink}
              to="/login"
              variant="body2"
              sx={{ fontWeight: "bold", textDecoration: "none" }}
            >
              {"Log in"}
            </Link>
            {" to your account now."}
          </Typography>
        </Box>

        <RegisterForm onSubmit={handleSubmit} loading={loading} />
      </Box>
    </Container>
  );
}

export default Register;
