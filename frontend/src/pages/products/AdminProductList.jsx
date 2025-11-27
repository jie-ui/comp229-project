import React, { useEffect, useState } from "react";
import { listProducts } from "../../api/productApi";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@mui/material";

export default function AdminProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    listProducts().then(res => setProducts(res.data || res || []));
  }, []);

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 3 }}>
      <Typography variant="h4" gutterBottom>Manage Products</Typography>

    
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(p => (
            <TableRow key={p._id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.sku}</TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell>${p.price}</TableCell>
              <TableCell>{p.stock}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to={`/admin/products/${p._id}/edit`}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
