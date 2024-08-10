import { useState } from "react";
import { Avatar, Link, Grid, Box, Typography, Container } from "@mui/material";
import { useSnackbar } from "notistack";
import LoginForm from "./LoginForm";
import { login } from "../../lib/auth";

function Login() {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);

  function handleSubmit({ email, password }) {
    setLoading(true);

    login({ email, password }).then(({ status, response }) => {
      setLoading(false);

      if (status === "ok") {
        enqueueSnackbar("Login successful", { variant: "success" });
      } else if (status === "invalid") {
        enqueueSnackbar("Invalid email or password", { variant: "error" });
      } else {
        enqueueSnackbar("An error occurred", { variant: "error" });
      }
    });
  }

  return (
    <>
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
                href="/users/register"
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
    </>
  );
}

export default Login;
