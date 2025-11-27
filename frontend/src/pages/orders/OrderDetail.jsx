import React, { useEffect, useState } from "react";
import { getMyOrder, updateMyOrder, deleteMyOrder } from "../../api/orderApi";
import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  Alert,
  Card,
  CardContent,
  Divider,
  Paper,
  Chip,
  TextField,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";

export default function OrderDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [order, setOrder] = useState(null);
  const [err, setErr] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedItems, setEditedItems] = useState([]);

  useEffect(() => {
    getMyOrder(id)
      .then((data) => setOrder(data))
      .catch((e) =>
        setErr(e?.response?.data?.message || "Failed to load order")
      );
  }, [id]);

  const startEdit = () => {
    setEditMode(true);
 
    setEditedItems(order.items.map(it => ({ ...it })));
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditedItems([]);
    setErr("");
  };

  const saveEdit = async () => {
    setErr("");
    try {
      
      const updatedItems = editedItems.map(it => ({
        product: it.product._id,
        qty: parseInt(it.qty),
      }));

      const updated = await updateMyOrder(id, { items: updatedItems });
      setOrder(updated);
      setEditMode(false);
      setEditedItems([]);
    } catch (e) {
      setErr(e?.response?.data?.message || "Update failed");
    }
  };

  const updateQty = (index, newQty) => {
    const qty = Math.max(1, parseInt(newQty) || 1);
    const updated = [...editedItems];
    updated[index].qty = qty;
    setEditedItems(updated);
  };

  const removeItem = (index) => {
    if (editedItems.length <= 1) {
      setErr("Order must have at least one item");
      return;
    }
    const updated = editedItems.filter((_, i) => i !== index);
    setEditedItems(updated);
    setErr("");
  };

  const remove = async () => {
    if (!window.confirm("Delete this order?")) return;
    setErr("");
    try {
      await deleteMyOrder(id);
      nav("/orders");
    } catch (e) {
      setErr(e?.response?.data?.message || "Delete failed");
    }
  };

  if (err && !editMode) return <Alert severity="error">{err}</Alert>;
  if (!order) return <div>Loading...</div>;

  const displayItems = editMode ? editedItems : order.items;

  return (
    <Box maxWidth="700px" mx="auto" mt={4}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Order Details
          </Typography>

          {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="subtitle1">
              <strong>Order ID:</strong> {order._id}
            </Typography>

            <Chip
              label={order.status}
              color={
                order.status === "pending"
                  ? "warning"
                  : order.status === "confirmed"
                    ? "success"
                    : "default"
              }
              sx={{ textTransform: "capitalize" }}
            />
          </Box>

          <Typography variant="subtitle1">
            <strong>Total:</strong> $
            {editMode
              ? editedItems
                  .reduce((s, it) => s + it.qty * it.priceAtPurchase, 0)
                  .toFixed(2)
              : order.total.toFixed(2)}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Items</Typography>
            {!editMode && order.status === "pending" && (
              <Button
                startIcon={<EditIcon />}
                variant="outlined"
                size="small"
                onClick={startEdit}
              >
                Edit Order
              </Button>
            )}
          </Box>

          <Box mt={2}>
            {displayItems.map((it, index) => (
              <Paper
                key={index}
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                  backgroundColor: editMode ? "#fff3e0" : "#fafafa",
                  border: editMode ? "2px solid #ff9800" : "none",
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="start">
                  <Box flex={1}>
                    <Typography component="div">
                      <strong>Product:</strong> {it.product?.name || "Unknown"}
                    </Typography>

                    {editMode ? (
                      <Box display="flex" alignItems="center" gap={1} mt={1}>
                        <Typography component="div">
                          <strong>Qty:</strong>
                        </Typography>
                        <TextField
                          type="number"
                          size="small"
                          value={it.qty}
                          onChange={(e) => updateQty(index, e.target.value)}
                          inputProps={{ min: 1, style: { width: "60px" } }}
                        />
                      </Box>
                    ) : (
                      <Typography component="div">
                        <strong>Qty:</strong> {it.qty}
                      </Typography>
                    )}

                    <Typography component="div">
                      <strong>Price Paid:</strong> ${it.priceAtPurchase}
                    </Typography>

                    <Typography component="div">
                      <strong>Line Total:</strong> $
                      {(it.qty * it.priceAtPurchase).toFixed(2)}
                    </Typography>
                  </Box>

                  {editMode && (
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => removeItem(index)}
                      disabled={displayItems.length <= 1}
                      title={displayItems.length <= 1 ? "Cannot remove last item" : "Remove item"}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              </Paper>
            ))}
          </Box>

          {editMode ? (
            <Box display="flex" gap={2} mt={3}>
              <Button
                variant="contained"
                color="success"
                startIcon={<SaveIcon />}
                onClick={saveEdit}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={cancelEdit}
              >
                Cancel
              </Button>
            </Box>
          ) : (
            order.status === "pending" && (
              <Box display="flex" gap={2} mt={3}>
                <Button color="error" variant="outlined" onClick={remove}>
                  Delete Order
                </Button>
              </Box>
            )
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
