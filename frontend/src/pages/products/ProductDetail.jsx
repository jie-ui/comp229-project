import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../../api/productApi";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createOrder } from "../../api/orderApi";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

export default function ProductDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  useEffect(() => {
    getProduct(id)
      .then(setProduct)
      .catch((e) =>
        setErr(e?.response?.data?.message || "Failed to load product")
      );
  }, [id]);

 const addToOrder = async () => {
  setErr("");
  setOk("");
  try {
    const payload = { items: [{ product: product._id, qty }] };
    const order = await createOrder(payload);

    
    setOk("Order created!");

    
    setTimeout(() => {
      nav(`/orders/${order._id}`);
    }, 1000);

  } catch (e) {
    setErr(e?.response?.data?.message || "Failed to create order");
  }
};


  if (err) return <Alert severity="error">{err}</Alert>;
  if (!product) return <div>Loading...</div>;

  return (
    <Box sx={{ maxWidth: "1000px", mx: "auto", p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={4}>
          {/* Left side - Image */}
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              height="400"
              image={product.imageUrl || "/placeholder.png"}
              alt={product.name}
              sx={{
                borderRadius: 2,
                objectFit: "cover",
                width: "100%",
              }}
            />
          </Grid>

          {/* Right side - Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              {product.name}
            </Typography>

            <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
              ${product.price?.toFixed(2)}
            </Typography>

            <Typography sx={{ mb: 1 }}>
              <strong>Category:</strong> {product.category}
            </Typography>

            <Typography sx={{ mb: 1 }}>
              <strong>SKU:</strong> {product.sku}
            </Typography>

            <Typography sx={{ mb: 3 }}>
              <strong>Stock:</strong>{" "}
              {product.stock > 0 ? product.stock : "Out of stock"}
            </Typography>

            {/* Quantity + Button */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                mt: 2,
              }}
            >
              <TextField
                label="Quantity"
                type="number"
                value={qty}
                onChange={(e) =>
                  setQty(Math.max(1, Number(e.target.value)))
                }
                sx={{ width: 120 }}
                size="small"
              />

              <Button
                variant="contained"
                size="large"
                onClick={addToOrder}
                disabled={product.stock <= 0}
              >
                Add to Order
              </Button>
            </Box>

            {ok && (
              <Alert severity="success" sx={{ mt: 3 }}>
                {ok}
              </Alert>
            )}
            {err && (
              <Alert severity="error" sx={{ mt: 3 }}>
                {err}
              </Alert>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
