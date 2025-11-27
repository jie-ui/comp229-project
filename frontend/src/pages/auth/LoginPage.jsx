import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../api/authApi";
import { AuthContext } from "../../context/AuthContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

export default function LoginPage() {
  const nav = useNavigate();
  const { loginLocal } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const data = await loginApi({ email, password }); // returns { token, user }
      loginLocal(data.token, data.user);
      nav("/products");
    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box maxWidth={480} mx="auto">
      <Typography variant="h5" gutterBottom>Login</Typography>
      {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}
      <form onSubmit={submit}>
        <TextField label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} fullWidth margin="normal" required />
        <TextField label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} fullWidth margin="normal" required />
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>Login</Button>
      </form>
    </Box>
  );
}
