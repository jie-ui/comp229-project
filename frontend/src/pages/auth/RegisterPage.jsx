import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../../api/authApi";
import { AuthContext } from "../../context/AuthContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

export default function RegisterPage() {
  const nav = useNavigate();
  const { loginLocal } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const data = await registerApi({ name, email, password });
      loginLocal(data.token, data.user);
      nav("/products");
    } catch (error) {
      setErr(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box maxWidth={480} mx="auto">
      <Typography variant="h5" gutterBottom>Register</Typography>
      {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}
      <form onSubmit={submit}>
        <TextField label="Name" value={name} onChange={(e)=>setName(e.target.value)} fullWidth margin="normal" required />
        <TextField label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} fullWidth margin="normal" required />
        <TextField label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} fullWidth margin="normal" required />
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>Register</Button>
      </form>
    </Box>
  );
}
