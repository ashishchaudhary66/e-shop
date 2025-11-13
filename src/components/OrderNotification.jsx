import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Button,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/actions/cartActions";

function OrderNotification({ open, onClose, setOpenCart }) {
    const dispatch = useDispatch();
    const handleContinueOrder = () => {
        dispatch(clearCart());
        onClose(); 
        setOpenCart(false);
    };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 2,
          textAlign: "center",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
        Order Confirmation
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box
            className="success-circle"
            sx={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              backgroundColor: "#E8F5E9",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              animation: "pop 0.6s ease-out",
            }}
          >
            <CheckCircleOutlineIcon
              sx={{
                fontSize: 60,
                color: "#4CAF50",
                animation: "fadeIn 1s ease-in",
              }}
            />
          </Box>
        </Box>

        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "text.primary", mb: 1 }}
        >
          Order Placed Successfully!
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
          Thank you for shopping with us. We’ll notify you once your order ships.
        </Typography>

        <Button
          variant="contained"
          onClick={handleContinueOrder}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            backgroundColor: "#4CAF50",
            "&:hover": { backgroundColor: "#43A047" },
          }}
        >
          Continue Shopping
        </Button>
      </DialogContent>

      <style>
        {`
          @keyframes pop {
            0% { transform: scale(0); opacity: 0; }
            80% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </Dialog>
  );
}

export default OrderNotification;
