import React from "react";

function TableRow({ product, incrementQty, decrementQty, removeItem }) {
    const totalPrice = (product.qty * product.price).toFixed(2);
  return (
    <tr>
      <td>{product.title}</td>
      <td>
        <button
          onClick={() => decrementQty(product.id)}
          disabled={product.qty === 1}
        >
          −
        </button>
        <span style={{ margin: "0 10px" }}>{product.qty}</span>
        <button onClick={() => incrementQty(product.id)}>+</button>
      </td>
      <td>{product.price}</td>
      <td>{totalPrice}</td>
      <td><span style={{color: '#f00', cursor: 'pointer'}} onClick={()=>removeItem(product.id)}>X</span></td>
    </tr>
  );
}

export default TableRow;
