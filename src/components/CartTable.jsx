import React, { useState } from "react";
import "./CartTable.css";
import TableRow from "./TableRow";

function CartTable() {
  const [cartProducts, setCartProducts] = useState([
    { id: 1, item: "item1", quantity: 1, itemPrice: 20 },
    { id: 2, item: "item2", quantity: 1, itemPrice: 30 },
    { id: 3, item: "item3", quantity: 2, itemPrice: 15 },
    { id: 4, item: "item4", quantity: 1, itemPrice: 40 },
  ]);

  const incrementQty = (id) => {
    setCartProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decrementQty = (id) => {
    setCartProducts((prev) =>
      prev.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const grandTotal = cartProducts.reduce(
    (sum, item) => sum + item.itemPrice * item.quantity,
    0
  );

  return (
    <div className="CartTable" style={{ padding: "10px" }}>
      <table
        border="1"
        cellPadding="8"
        style={{ borderCollapse: "collapse", width: "100%", textAlign: "center" }}
      >
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Item Price ($)</th>
            <th>Total Price ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map((product) => (
            <TableRow product={product} incrementQty={incrementQty} decrementQty={decrementQty} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold", paddingRight: "1rem" }}>
              Grand Total
            </td>
            <td style={{ fontWeight: "bold" }}>${grandTotal}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default CartTable;
