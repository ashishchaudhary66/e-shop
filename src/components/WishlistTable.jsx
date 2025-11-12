import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import { removeFromWishlist } from "../redux/actions/wishlistActions";

function WishlistTable() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(
    (state) => state.wishlist.wishlistItems || []
  );

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const openConfirmDialog = (actionType, item) => {
    setSelectedItem(item);
    setConfirmAction(actionType);
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (confirmAction === "remove" && selectedItem?.id) {
      dispatch(removeFromWishlist(selectedItem.id));
    } else if (confirmAction === "moveToCart" && selectedItem) {
      dispatch(addToCart(selectedItem));
      if (selectedItem.id) dispatch(removeFromWishlist(selectedItem.id));
    }
    setConfirmOpen(false);
  };

  if (wishlistItems.length === 0) {
    return (
      <Box textAlign="center" py={5}>
        <Typography variant="h5" color="text.secondary">
          ❤️ Your Wishlist is Empty
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
              <TableCell>
                <b>Product</b>
              </TableCell>
              <TableCell align="center">
                <b>Price ($)</b>
              </TableCell>
              <TableCell align="center">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {wishlistItems.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: "8px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <Box>
                      <Typography variant="body1" fontWeight="bold">
                        {item.title}
                      </Typography>
                      {item.description && (
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
                          {item.description}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </TableCell>

                <TableCell align="center">
                  {typeof item.price === "number"
                    ? `$${item.price.toFixed(2)}`
                    : item.price}
                </TableCell>

                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 2,
                      width: "100%",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<ShoppingCartIcon />}
                      sx={{
                        textTransform: "none",
                        borderRadius: "8px",
                        minWidth: "150px",
                      }}
                      onClick={() => openConfirmDialog("moveToCart", item)}
                    >
                      Move to Cart
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      sx={{
                        textTransform: "none",
                        borderRadius: "8px",
                        minWidth: "110px",
                      }}
                      onClick={() => openConfirmDialog("remove", item)}
                    >
                      Remove
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">
            {confirmAction === "remove" ? "Remove Item" : "Move to Cart"}
          </Typography>
          <IconButton onClick={() => setConfirmOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mt: 1 }}>
            {confirmAction === "remove"
              ? "Are you sure you want to remove this item from your wishlist?"
              : "Add this item to your cart and remove it from your wishlist?"}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button
            onClick={() => setConfirmOpen(false)}
            variant="outlined"
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            color={confirmAction === "remove" ? "error" : "primary"}
          >
            {confirmAction === "remove" ? "Remove" : "Move"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default WishlistTable;
