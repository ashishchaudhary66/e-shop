import React from 'react'
import './Card.css'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';

function Card({product}) {
    const cartItems = useSelector(state => state.cart.cartItems)
    const isItemAvailable = cartItems.find((item) => item.id === product.id)
    const dispatch = useDispatch();

  return (
    <div className="Card">
      <img src={product.image} alt={product.title} className="card-image" />
      <h3 className="card-title">{product.title}</h3>
      <p className="card-category">{product.category}</p>
      <p className="card-price">${product.price}</p>
      {
        isItemAvailable?
        <div className='card-remove-cart' onClick={()=>dispatch(removeFromCart(product.id))}>
          Remove From Cart
        </div> :
        <div className='card-add-cart' onClick={()=>dispatch(addToCart(product))}>
          Add To Cart
        </div>
      }
    </div>
  )
}

export default Card