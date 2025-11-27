import React, { useEffect, useState } from "react";
import { getProduct, updateProduct, deleteProduct } from "../../api/productApi";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductEdit() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    getProduct(id).then(p => setForm(p)).catch(e => setErr(e?.response?.data?.message || "Load failed"));
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await updateProduct(id, form);
      nav("/products");
    } catch (e) {
      setErr(e?.response?.data?.message || "Update failed");
    }
  };

  const doDelete = async () => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      nav("/products");
    } catch (e) {
      setErr(e?.response?.data?.message || "Delete failed");
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <Box maxWidth={720} mx="auto">
      <Typography variant="h5" gutterBottom>Edit Product</Typography>
      {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}
      <form onSubmit={submit}>
        <TextField label="Name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} fullWidth margin="normal" required />
        <TextField label="SKU" value={form.sku} onChange={(e)=>setForm({...form, sku:e.target.value})} fullWidth margin="normal" required />
        <TextField label="Price" type="number" value={form.price} onChange={(e)=>setForm({...form, price: Number(e.target.value)})} fullWidth margin="normal" required />
        <TextField label="Stock" type="number" value={form.stock} onChange={(e)=>setForm({...form, stock: Number(e.target.value)})} fullWidth margin="normal" required />
        <TextField label="Category" value={form.category} onChange={(e)=>setForm({...form, category: e.target.value})} fullWidth margin="normal" />
        <TextField label="Image URL" value={form.imageUrl} onChange={(e)=>setForm({...form, imageUrl: e.target.value})} fullWidth margin="normal" />
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button variant="contained" type="submit">Save</Button>
          <Button color="error" onClick={doDelete}>Delete</Button>
        </Box>
      </form>
    </Box>
  );
}
