import React from "react";

function TableRow({ product, incrementQty, decrementQty }) {

  return (
    <tr>
      <td>{product.item}</td>
      <td>
        <button
          onClick={() => decrementQty(product.id)}
          disabled={product.quantity === 1}
        >
          −
        </button>
        <span style={{ margin: "0 10px" }}>{product.quantity}</span>
        <button onClick={() => incrementQty(product.id)}>+</button>
      </td>
      <td>{product.itemPrice}</td>
      <td>{product.quantity * product.itemPrice}</td>
      <td><span style={{color: '#f00', cursor: 'pointer'}}>X</span></td>
    </tr>
  );
}

export default TableRow;
