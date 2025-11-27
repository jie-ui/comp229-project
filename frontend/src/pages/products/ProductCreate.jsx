import React, { useState } from "react";
import { createProduct } from "../../api/productApi";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function ProductCreate() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", sku: "", price: 0, stock: 0, category: "General", imageUrl: "" });
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await createProduct(form);
      nav("/products");
    } catch (e) {
      setErr(e?.response?.data?.message || "Create failed");
    }
  };

  return (
    <Box maxWidth={720} mx="auto">
      <Typography variant="h5" gutterBottom>Create Product</Typography>
      {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}
      <form onSubmit={submit}>
        <TextField label="Name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} fullWidth margin="normal" required />
        <TextField label="SKU" value={form.sku} onChange={(e)=>setForm({...form, sku:e.target.value})} fullWidth margin="normal" required />
        <TextField label="Price" type="number" value={form.price} onChange={(e)=>setForm({...form, price: Number(e.target.value)})} fullWidth margin="normal" required />
        <TextField label="Stock" type="number" value={form.stock} onChange={(e)=>setForm({...form, stock: Number(e.target.value)})} fullWidth margin="normal" required />
        <TextField label="Category" value={form.category} onChange={(e)=>setForm({...form, category: e.target.value})} fullWidth margin="normal" />
        <TextField label="Image URL" value={form.imageUrl} onChange={(e)=>setForm({...form, imageUrl: e.target.value})} fullWidth margin="normal" />
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>Create</Button>
      </form>
    </Box>
  );
}
