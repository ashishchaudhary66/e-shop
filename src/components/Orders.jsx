import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import OrderStatus from "./OrderStatus";

export default function Orders() {
  const navigate = useNavigate();
  const orders = useSelector((state) => state.order.orders);

  if (!orders || orders.length === 0) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="60vh"
        flexDirection="column"
      >
        <Typography variant="h5" color="text.secondary">
          You have no orders yet
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        My Orders
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: 5,
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Total Amount</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.sort((a, b) => new Date(b.date) - new Date(a.date)).map((order, index) => (
              <TableRow
                key={index}
                hover
                onClick={() => navigate(`/orders/${order.orderId}`)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f0f7ff",
                  },
                }}
              >
                <TableCell>{order.orderId}</TableCell>
                <TableCell>
                  {new Date(order.date).toLocaleString()}
                </TableCell>
                <TableCell>
                  <OrderStatus status={order.status} />
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  ${order.totalAmount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
