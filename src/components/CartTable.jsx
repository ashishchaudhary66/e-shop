import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./CartTable.css";
import TableRow from "./TableRow";
import { removeFromCart, updateQty } from "../redux/actions/cartActions";

function CartTable() {
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

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

  return (
    <div className="CartTable">
      {cartProducts.length > 0 ? (
        <>
          <div className="table-container">
            <table
              border="1"
              cellPadding="8"
              style={{
                borderRadius: "10px",
                borderCollapse: "collapse",
                width: "100%",
                textAlign: "center",
              }}
            >
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Item Price ($)</th>
                  <th>Total Price ($)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    product={product}
                    incrementQty={() =>
                      incrementQty(product.id, product.qty)
                    }
                    decrementQty={() =>
                      decrementQty(product.id, product.qty)
                    }
                    removeItem={() => handleRemove(product.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-footer">
            <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
          </div>
        </>
      ) : (
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
        </div>
      )}
    </div>
  );
}

export default CartTable;
