import { useState } from "react";
import {
  Button,
  Checkbox,
  CircularProgress,
  TextField,
  FormControlLabel,
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
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email"
        name="email"
        autoFocus
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Keep me logged in"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {loading ? <CircularProgress size={24} /> : "Log In"}
      </Button>
    </form>
  );
}

export default LoginForm;
