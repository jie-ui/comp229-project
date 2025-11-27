import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Convenience Store
        </Typography>

        {/* Public link */}
        <Button color="inherit" component={Link} to="/products">
          Products
        </Button>

        {/* Authenticated user links */}
        {user && user.role === "User" && (
          <Button color="inherit" component={Link} to="/orders">
            My Orders
          </Button>
        )}

        {/* Admin links */}
        {user && user.role === "Admin" && (
          <>


            <Button color="inherit" component={Link} to="/admin/products">
              Manage Products
            </Button>

          </>
        )}

        {/* Login / Logout */}
        {!user ? (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        ) : (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}

      </Toolbar>
    </AppBar>
  );
}
