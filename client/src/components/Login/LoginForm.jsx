import { React, useState } from "react";
import {
  Button,
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

function LoginForm({ onSubmit, loading = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ email, password });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box
        gap={2}
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          variant="outlined"
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="off"
          margin="normal"
          fullWidth
          InputProps={{
            style: {
              borderRadius: "12px",
            },
          }}
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="off"
          margin="normal"
          fullWidth
          InputProps={{
            style: {
              borderRadius: "12px",
            },
          }}
        />

        <Grid container spacing={2} sx={{ maxWidth: "100%" }}>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={<Typography variant="body2">Keep me logged in</Typography>}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link
              href="/users/reset_password"
              variant="body2"
              sx={{ fontWeight: "bold", textDecoration: "none" }}
            >
              Forgot your password?
            </Link>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "black",
            borderRadius: "8px",
            padding: "8px",
            width: "100%",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "black",
              opacity: 0.8,
            },
          }}
        >
          {loading ? <CircularProgress size={24} /> : "Log In →"}
        </Button>
      </Box>
    </form>
  );
}

export default LoginForm;
