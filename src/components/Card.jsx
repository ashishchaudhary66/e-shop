import React from "react";
import "./Card.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addToWishlist, removeFromWishlist } from "../redux/actions/wishlistActions";

function Card({ product }) {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const isCartItemAvailable = cartItems.find((item) => item.id === product.id);
  const isWishlistItemAvailable = wishlistItems.find((item) => item.id === product.id);
  const dispatch = useDispatch();
  return (
    <div className="Card">
      <div>
        {
          isWishlistItemAvailable?
            <FavoriteIcon 
              sx={{ color: "#FF0000" }} 
              fontSize="medium" 
              style={{position: "absolute", top: "5px", right: "10px", cursor: 'pointer'}} 
              onClick={()=>dispatch(removeFromWishlist(product.id))} 
            /> : 
            <FavoriteIcon 
              sx={{ color: "#D3D0C7FF" }} 
              fontSize="medium" 
              style={{position: "absolute", top: "5px", right: "10px", cursor: 'pointer'}} 
              onClick={()=>dispatch(addToWishlist(product))} 
            />
        }
        <img src={product.image} alt={product.title} className="card-image" />
        <h3 className="card-title">{product.title}</h3>
        <p className="card-category">{product.category}</p>
        <p className="card-price">${product.price}</p>
      </div>
      <div>
        {isCartItemAvailable ? (
          <div
            className="card-remove-cart"
            onClick={() => dispatch(removeFromCart(product.id))}
          >
            Remove From Cart
          </div>
        ) : (
          <div
            className="card-add-cart"
            onClick={() => dispatch(addToCart(product))}
          >
            Add To Cart
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
