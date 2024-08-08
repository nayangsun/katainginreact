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
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Log in to account
          </Typography>

          <LoginForm onSubmit={handleSubmit} loading={loading} />
          <Grid container>
            <Grid item xs>
              <Link href="/users/reset_password" variant="body2">
                Forgot your password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/users/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default Login;
