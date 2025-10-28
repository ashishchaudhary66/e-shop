import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import icon from "../images/shopify.png";
import "./Header.css";
import CartTable from "./CartTable";
import { useSelector } from "react-redux";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Header() {
  const [visible, setVisible] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  return (
    <header className="Header">
      <div className="header-icon">
        <img src={icon} alt="Logo" width={30} height={30} />
        <h1 className="header-text">E-shop</h1>
      </div>

      <div className="header-cart">
        <div style={{ position: "relative", cursor: "pointer"}} onClick={() => setVisible(true)}>
          {cartItems.length > 0 && (
            <span className="cart-counter">{cartItems.length}</span>
          )}
          <ShoppingCartIcon fontSize="large"/>
        </div>
        <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setVisible(true)}>
          {wishlistItems.length > 0 && (
            <span className="cart-counter">{wishlistItems.length}</span>
          )}
          <FavoriteIcon fontSize="large" />
        </div>
      </div>

      <Dialog
        header={
          <div className="dialog-header">
            <h3>Your Cart</h3>
          </div>
        }
        visible={visible}
        style={{
          width: "85vw",
          borderRadius: "12px",
          padding: "0",
          height: "80vh",
        }}
        contentStyle={{ backgroundColor: "#f9f9f9" }}
        onHide={() => setVisible(false)}
        draggable={false}
        resizable={false}
        blockScroll={true}
      >
        <CartTable />
      </Dialog>
    </header>
  );
}

export default Header;
