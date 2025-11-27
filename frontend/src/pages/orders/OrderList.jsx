import React, { useEffect, useState } from "react";
import { listMyOrders } from "../../api/orderApi";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Chip,
  Box,
  Divider,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    listMyOrders()
      .then((data) => setOrders(data || []))
      .catch((e) =>
        setErr(e?.response?.data?.message || "Failed to load orders")
      );
  }, []);

  return (
    <Box maxWidth="800px" mx="auto" mt={3}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>

      {err && <Typography color="error">{err}</Typography>}

      <List>
        {orders.map((order) => (
          <React.Fragment key={order._id}>
            <ListItem
              alignItems="flex-start"
              secondaryAction={
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to={`/orders/${order._id}`}
                >
                  View
                </Button>
              }
            >
              <ListItemText
                primary={
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="h6">
                      Order #{order._id}
                    </Typography>

                  
                  </Box>
                }
                secondary={
                  <Box mt={1}>
                    <Typography variant="body2">
                      <strong>Total:</strong> ${order.total}
                    </Typography>

                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Items:</strong>
                    </Typography>

                    {order.items.map((it, idx) => {
                      const name =
                        it.product?.name ||
                        it.product?.sku ||
                        it.product ||
                        "Unknown product";
                      return (
                        <Typography key={idx} variant="body2" sx={{ ml: 2 }}>
                          • {name} × {it.qty}
                        </Typography>
                      );
                    })}
                  </Box>
                }
              />
            </ListItem>

            <Divider sx={{ my: 1 }} />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

