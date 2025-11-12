import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Badge,
  Box,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import CartTable from "./CartTable";
import WishlistTable from "./WishlistTable";
import icon from "../images/e_shop.png";
import "./Header.css";

function Header() {
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  return (
    <header className="Header">
      {/* Logo */}
      <div className="header-icon">
        <img src={icon} alt="Logo" width={40} height={40} />
        <h1 className="header-text">shop</h1>
      </div>

      {/* Cart + Wishlist Icons */}
      <div className="header-cart">
        <IconButton color="inherit" onClick={() => setOpenCart(true)}>
          <Badge badgeContent={cartItems.length} color="error">
            <ShoppingCartIcon fontSize="large" />
          </Badge>
        </IconButton>

        <IconButton color="inherit" onClick={() => setOpenWishlist(true)}>
          <Badge badgeContent={wishlistItems.length} color="error">
            <FavoriteIcon fontSize="large" />
          </Badge>
        </IconButton>
      </div>

      {/* CART DIALOG */}
      <Dialog
        open={openCart}
        onClose={() => setOpenCart(false)}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          sx: { borderRadius: "16px", backgroundColor: "#fafafa" },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">
            🛒 Your Cart
          </Typography>
          <IconButton onClick={() => setOpenCart(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <CartTable />
        </DialogContent>
      </Dialog>

      {/* WISHLIST DIALOG */}
      <Dialog
        open={openWishlist}
        onClose={() => setOpenWishlist(false)}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          sx: { borderRadius: "16px", backgroundColor: "#fafafa" },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">
            ❤️ Your Wishlist
          </Typography>
          <IconButton onClick={() => setOpenWishlist(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <WishlistTable />
        </DialogContent>
      </Dialog>
    </header>
  );
}

export default Header;
