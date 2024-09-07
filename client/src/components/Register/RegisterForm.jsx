import React, { useState } from "react";
import { Button, Box, CircularProgress, TextField } from "@mui/material";

function RegisterForm({ onSubmit, loading = false }) {
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
          {loading ? <CircularProgress size={24} /> : "Create an account"}
        </Button>
      </Box>
    </form>
  );
}

export default RegisterForm;
