import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Badge,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

import { useSelector } from "react-redux";
import CartTable from "./CartTable";
import WishlistTable from "./WishlistTable";
import icon from "../images/e_shop.png";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const navigate = useNavigate();

  return (
    <header className="Header">
      <div className="header-icon" onClick={() => navigate("/")}>
        <img src={icon} alt="Logo" width={40} height={40} />
        <h1 className="header-text">shop</h1>
      </div>

      <div className="header-cart">
        <IconButton
          className="hamburger-menu"
          color="inherit"
          onClick={() => setOpenDrawer(true)}
        >
          <MenuIcon fontSize="large" />
        </IconButton>

        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography variant="h6" component="span" color="#fff">
            Home
          </Typography>
        </Link>

        <Link to="/orders" style={{ textDecoration: "none" }}>
          <Typography variant="h6" component="span" color="#fff">
            Orders
          </Typography>
        </Link>

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

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <div
          style={{
            backgroundColor: "#1976d2",
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px",
          }}
        >
          <IconButton onClick={() => setOpenDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </div>

        <List sx={{ width: 250 }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/");
                setOpenDrawer(false);
              }}
            >
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/orders");
                setOpenDrawer(false);
              }}
            >
              <ListItemText primary="Orders" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setOpenCart(true);
                setOpenDrawer(false);
              }}
            >
              <ListItemText primary={`Cart (${cartItems.length})`} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setOpenWishlist(true);
                setOpenDrawer(false);
              }}
            >
              <ListItemText primary={`Wishlist (${wishlistItems.length})`} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

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
          <Typography variant="h6" component="span" fontWeight="bold">
            Your Cart
          </Typography>
          <IconButton onClick={() => setOpenCart(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <CartTable setOpenCart={setOpenCart} />
        </DialogContent>
      </Dialog>

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
          <Typography variant="h6" component="span" fontWeight="bold">
            Your Wishlist
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
