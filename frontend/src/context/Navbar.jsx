import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/products" sx={{ color: "inherit", textDecoration: "none", flexGrow: 1 }}>
          Convenience Store
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button component={RouterLink} to="/products" color="inherit">Products</Button>
          {user && <Button component={RouterLink} to="/orders" color="inherit">My Orders</Button>}
          {user?.role === "Admin" && <Button component={RouterLink} to="/admin/products/create" color="inherit">Manage</Button>}
          {user ? (
            <Button color="inherit" onClick={logout}>Logout</Button>
          ) : (
            <>
              <Button component={RouterLink} to="/login" color="inherit">Login</Button>
              <Button component={RouterLink} to="/register" color="inherit">Register</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
