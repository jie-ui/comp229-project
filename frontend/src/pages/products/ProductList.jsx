import React, { useEffect, useState, useContext } from "react";
import { listProducts } from "../../api/productApi";
import { AuthContext } from "../../context/AuthContext";
import {
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
  Typography,
  Pagination,
  Paper
} from "@mui/material";
import ProductCard from "../../components/ProductCard";

export default function ProductList() {
  const { user } = useContext(AuthContext);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const categories = ["", "Snacks", "Drinks", "Candy", "General"];

  const load = async () => {
    setLoading(true);
    try {
      const res = await listProducts({ q, category, page, limit });
      if (Array.isArray(res)) {
        setProducts(res);
        setTotal(res.length);
      } else {
        setProducts(res.data || []);
        setTotal(res.total || (res.data?.length || 0));
      }
    } catch (err) {
      console.error("Load products error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [q, category, page]);

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", p: 2 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Products
      </Typography>

      {/* Filter Section */}
      <Paper sx={{ p: 2, mb: 3, display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          label="Search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          size="small"
          sx={{ width: "250px" }}
        />

        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          size="small"
          sx={{ width: "200px" }}
        >
          {categories.map((c) => (
            <MenuItem key={c} value={c}>
              {c || "All"}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ flexGrow: 1 }} />

        {user?.role === "Admin" && (
          <Button variant="contained" href="/products/create">
            Create Product
          </Button>
        )}
      </Paper>

      {/* Product Grid */}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {products.map((p) => (
              <Grid item xs={12} sm={6} md={3} key={p._id}>
                <ProductCard product={p} />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={Math.max(1, Math.ceil(total / limit))}
              page={page}
              onChange={(e, v) => setPage(v)}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
