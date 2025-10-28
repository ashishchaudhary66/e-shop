import React from "react";
import "./TableRow.css";

function TableRow({ product, incrementQty, decrementQty, removeItem }) {
  const totalPrice = (product.qty * product.price).toFixed(2);
  return (
    <tr>
      <td style={{ display: "flex", gap: "1rem", maxWidth: "20vw" }}>
        <div>
          <img src={product.image} alt="item" height="70px" width="60px" />
        </div>
        <div style={{ textAlign: "left" }}>{product.title}</div>
      </td>
      <td style={{ textAlign: "left", maxWidth: "50vw" }}>
        {product.description}
      </td>
      <td className="quantity-cell">
        <button
          onClick={() => decrementQty(product.id)}
          disabled={product.qty === 1}
        >
          −
        </button>
        <span>{product.qty}</span>
        <button onClick={() => incrementQty(product.id)}>+</button>
      </td>
      <td>{product.price}</td>
      <td>{totalPrice}</td>
      <td>
        <span
          style={{ color: "#f00", cursor: "pointer" }}
          onClick={() => removeItem(product.id)}
        >
          X
        </span>
      </td>
    </tr>
  );
}

export default TableRow;
