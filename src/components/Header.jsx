import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import icon from "../images/shopify.png";
import cart from "../images/cart.png";
import "./Header.css";
import CartTable from "./CartTable";

function Header() {
  const [visible, setVisible] = useState(false);

  return (
    <header className="Header">
      <div className="header-icon">
        <img src={icon} alt="Logo" width={30} height={30} />
        <h1 className="header-text">E-shop</h1>
      </div>

      <div className="header-cart" onClick={() => setVisible(true)}>
        <span className="cart-counter">{10}</span>
        <img src={cart} alt="Cart" width={30} height={30} />
      </div>

      <Dialog
        header={
          <div className="dialog-header">
            <h3>Your Cart</h3>
          </div>
        }
        visible={visible}
        style={{ width: "50vw", borderRadius: "12px", padding: "0" }}
        contentStyle={{ padding: "20px", backgroundColor: "#f9f9f9" }}
        onHide={() => setVisible(false)}
        draggable={false}
        resizable={false}
      >
        <CartTable />
      </Dialog>
    </header>
  );
}

export default Header;
