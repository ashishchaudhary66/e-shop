import React from "react";
import "./WishlistTable.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import { removeFromWishlist } from "../redux/actions/wishlistActions";

function WishlistTable() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems || []);

  const handleRemove = (id) => {
    if (window.confirm("Remove this item from wishlist?")) {
      dispatch(removeFromWishlist(id));
    }
  };

  const handleMoveToCart = (product) => {
    if (window.confirm("Add this item to cart?")) {
      dispatch(addToCart(product));
      if (product && product.id) dispatch(removeFromWishlist(product.id));
    }
  };

  return (
    <div className="wishlist-table-wrapper">
      {wishlistItems.length === 0 ? (
        <div className="wishlist-empty">
          <p>Your wishlist is empty.</p>
        </div>
      ) : (
        <>
          <table className="wishlist-table">
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Product</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {wishlistItems.map((item) => (
                <tr key={item.id} className="wishlist-row">
                  <td className="product-cell">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="product-image"
                      />
                    )}
                    <div className="product-info">
                      <div className="product-name">{item.name}</div>
                      {item.variant && (
                        <div className="product-variant">{item.variant}</div>
                      )}
                    </div>
                  </td>

                  <td className="price-cell">
                    {typeof item.price === "number"
                      ? `$${item.price.toFixed(2)}`
                      : item.price}
                  </td>

                  <td className="actions-cell">
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleMoveToCart(item)}
                    >
                      Move to cart
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default WishlistTable;