import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={product.imageUrl || "/placeholder.png"}
        alt={product.name}
        sx={{
          objectFit: "cover",
        }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" noWrap>
          {product.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          SKU: {product.sku}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Category: {product.category}
        </Typography>

        <Typography variant="h6" sx={{ mt: 1 }}>
          ${product.price?.toFixed(2)}
        </Typography>

        <Typography variant="body2">Stock: {product.stock}</Typography>
      </CardContent>

      <CardActions>
        <Button
          component={RouterLink}
          to={`/products/${product._id}`}
          variant="outlined"
          fullWidth
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
