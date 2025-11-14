import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Box,
  Rating,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OrderStatus from "./OrderStatus";

export default function OrderSummary() {
  const { orderId } = useParams();
  const order = useSelector((state) =>
    state.order.orders.find((o) => o.orderId === orderId)
  );

  if (!order) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2> Order not found</h2>
      </div>
    );
  }

  const totalAmount = order.items.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0
  );

  return (
    <Card
      sx={{
        maxWidth: 600,
        m: "auto",
        mt: 4,
        borderRadius: 3,
        boxShadow: 5,
        p: 2,
      }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
          Order Summary
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Order ID: {order.orderId}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Date: {new Date(order.date).toLocaleString()}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" sx={{ mb: 1 }}>
          Ordered Items
        </Typography>

        <List>
          {order.items.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    src={item.image}
                    alt={item.title}
                    sx={{ width: 60, height: 60, mr: 2 }}
                  />
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 500 }}
                      component="div"
                    >
                      {item.title}
                    </Typography>
                  }
                  secondary={
                    <Box component="div">
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        sx={{ mb: 0.5 }}
                        component="span"
                      >
                        {item.category}
                      </Typography>

                      <Box>
                        <Rating
                          name="rating"
                          value={item.rating.rate}
                          precision={0.1}
                          size="small"
                          readOnly
                        />
                      </Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        component="div"
                        sx={{ mt: 0.5 }}
                      >
                        Quantity: <strong>{item.qty || 1}</strong>
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ mt: 0.5, fontWeight: "bold" }}
                        component="div"
                      >
                        ${item.price} * {item.qty || 1} = ${(item.price * (item.qty || 1)).toFixed(2)}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Typography variant="h6">Total:</Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            ${totalAmount.toFixed(2)}
          </Typography>
        </Box>

        <Box mt={3} textAlign="center">
          <OrderStatus status={order.status} />
        </Box>
      </CardContent>
    </Card>
  );
}
