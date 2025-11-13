import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Box,
  Divider,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { removeFromCart, updateQty } from "../redux/actions/cartActions";
import OrderNotification from "./OrderNotification";
import { addToOrderHistory } from "../redux/actions/orderHistoryActions";

function CartTable({setOpenCart}) {
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handlePlaceOrder = () => {
    setOpen(true);
    dispatch(addToOrderHistory({items:cartProducts}));
  };

  const incrementQty = (id, qty) => {
    dispatch(updateQty(id, qty + 1));
  };

  const decrementQty = (id, qty) => {
    if (qty > 1) {
      dispatch(updateQty(id, qty - 1));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const grandTotal = cartProducts.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cartProducts.length === 0) {
    return (
      <Box textAlign="center" py={5}>
        <Typography variant="h5" color="text.secondary">
           Your Cart is Empty
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <TableContainer component={Paper} sx={{ borderRadius: "12px" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><b>Item</b></TableCell>
              <TableCell><b>Description</b></TableCell>
              <TableCell align="center"><b>Quantity</b></TableCell>
              <TableCell align="center"><b>Item Price ($)</b></TableCell>
              <TableCell align="center"><b>Total ($)</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cartProducts.map((product) => (
              <TableRow key={product.id} hover>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                    <Typography variant="body1" fontWeight="bold">
                      {product.title}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell sx={{ maxWidth: "35vw" }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {product.description}
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => decrementQty(product.id, product.qty)}
                      disabled={product.qty === 1}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1">{product.qty}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => incrementQty(product.id, product.qty)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </TableCell>

                <TableCell align="center">${product.price.toFixed(2)}</TableCell>
                <TableCell align="center">
                  ${(product.price * product.qty).toFixed(2)}
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    color="error"
                    onClick={() => handleRemove(product.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 3 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          pr: 2,
          gap: 3,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Grand Total: ${grandTotal.toFixed(2)}
        </Typography>
        <Button variant="contained" color="success"  onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </Box>
      <OrderNotification open={open} onClose={() => setOpen(false)} setOpenCart={setOpenCart} />
    </Box>
  );
}

export default CartTable;
